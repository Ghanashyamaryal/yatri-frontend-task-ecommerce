import { Suspense } from "react";
import { fetchProducts } from "@/services/products";
import ProductCard from "@/components/ui/molecules/ProductCard";
import SkeletonCard from "@/components/ui/molecules/Skeleton";
import Button from "@/components/ui/atoms/Button";
import type { Product } from "@/services/products";
import Link from "next/link";

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
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

export default async function Home() {
  const perPage = 8;

  try {
    const products = await fetchProducts();

    if (!products || products.length === 0) {
      return (
        <main className="mx-auto max-w-[1520px] px-6 py-8">
          <div className="text-center">
            <h1 className="text-xl font-semibold text-gray-900">
              No Products Found
            </h1>
            <p className="mt-2 text-base  text-gray-600">
              Unable to load products at this time.
            </p>
            <Button
              text="Try Again"
              theme="primary"
              size="md"
              className="mt-4"
            />
          </div>
        </main>
      );
    }

    return (
      <main className="mx-auto max-w-[1400px]">
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold text-gray-900 mb-2 xl:mb-4">
            Welcome to Aryal Store
          </h1>
          <p className="text-base xl:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing products at unbeatable prices
          </p>
        </div>
        <Suspense fallback={<LoadingSkeleton />}>
          <ProductGrid products={products} />
        </Suspense>
      </main>
    );
  } catch (error) {
    console.error("Error loading products:", error);
    return (
      <main className="mx-auto max-w-[1520px] px-6 py-3 xl:py-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Failed to Load Products
          </h1>
          <p className="mt-2 text-red-600">
            Something went wrong while loading the products.
          </p>
          <Button text="Try Again" theme="primary" size="md" className="mt-4" />
        </div>
      </main>
    );
  }
}
