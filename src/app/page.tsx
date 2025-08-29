"use client";

import { useEffect, useState, useMemo } from "react";
import { fetchProducts } from "@/services/products";
import ProductCard from "@/components/ui/molecules/ProductCard";
import SkeletonCard from "@/components/ui/molecules/Skeleton";
import Button from "@/components/ui/atoms/Button";
import Pagination from "@/components/ui/molecules/Pagination"; // Import your new pagination
import type { Product } from "@/services/products";

const PRODUCTS_PER_PAGE = 8;

function ProductGrid({ products }: { products: Product[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return products.slice(startIndex, endIndex);
  }, [products, currentPage]);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        if (!data || data.length === 0) {
          setError("No Products Found");
        } else {
          setProducts(data);
        }
      } catch (err) {
        console.error("Error loading products:", err);
        setError("Something went wrong while loading the products.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <main className="mx-auto max-w-[1400px] px-6 py-8">
        <LoadingSkeleton />
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-[1520px] px-6 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">{error}</h1>
          <p className="mt-2 text-gray-600">
            {error === "No Products Found"
              ? "Unable to load products at this time."
              : "Please try again later."}
          </p>
          <Button text="Try Again" theme="primary" size="md" className="mt-4" />
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1400px] px-6 py-8">
      <div className="text-center mb-12">
        <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold text-gray-900 mb-2 xl:mb-4">
          Welcome to Aryal Store
        </h1>
        <p className="text-base xl:text-xl text-gray-600 max-w-2xl mx-auto">
          Discover amazing products at unbeatable prices
        </p>
      </div>
      <ProductGrid products={products} />
    </main>
  );
}
