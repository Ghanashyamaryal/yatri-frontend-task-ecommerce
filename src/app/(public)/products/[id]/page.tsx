"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ShoppingCart, CreditCard, Star } from "lucide-react";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/store";
import { addItem } from "@/store/cartSlice";
import { fetchProductById } from "@/services/products";
import Button from "@/components/ui/atoms/Button";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
        setActiveImage(data?.images?.[0] ?? null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12 grid gap-10 md:grid-cols-2 animate-pulse">
        <div className="aspect-square w-full bg-gray-200 rounded-lg" />
        <div className="space-y-6">
          <div className="h-8 w-2/3 bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 rounded" />
          <div className="h-8 w-32 bg-gray-200 rounded" />
          <div className="h-12 w-full bg-gray-200 rounded" />
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Product not found
          </h1>
          <p className="mt-2 text-gray-600">
            The product you're looking for doesn’t exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 grid gap-10 md:grid-cols-2">
      <div>
        <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-md bg-white">
          <Image
            src={
              activeImage ??
              product?.image ??
              product?.thumbnail ??
              "/EmptyImage.png"
            }
            alt={product.title}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Thumbnails */}
        {product.images?.length > 1 && (
          <div className="flex gap-3 mt-4">
            {product.images.map((img: string, idx: number) => (
              <div
                key={idx}
                className={`relative w-20 h-20 rounded-md border cursor-pointer overflow-hidden ${
                  activeImage === img
                    ? "ring-2 ring-indigo-500"
                    : "hover:opacity-80"
                }`}
                onClick={() => setActiveImage(img)}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right side - Info */}
      <div className="flex flex-col justify-between space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <div className="flex items-center mt-2 text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.round(product.rating)
                    ? "fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-gray-600 text-sm">
              {product.rating.toFixed(1)} / 5
            </span>
          </div>

          <p className="mt-4 text-gray-700 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-6">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.discountPercentage && (
              <span className="ml-2 text-green-600 font-semibold">
                -{product.discountPercentage}%
              </span>
            )}
          </div>

          <p className="mt-2 text-sm">
            <span
              className={`font-semibold ${
                product.availabilityStatus === "In Stock"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {product.availabilityStatus}
            </span>{" "}
            • {product.stock} available
          </p>

          <div className="mt-6 space-y-2 text-sm text-gray-600">
            <p>
              <span className="font-semibold">Brand:</span> {product.brand}
            </p>
            <p>
              <span className="font-semibold">SKU:</span> {product.sku}
            </p>
            <p>
              <span className="font-semibold">Weight:</span> {product.weight}g
            </p>
            <p>
              <span className="font-semibold">Dimensions:</span>{" "}
              {product.dimensions?.width} × {product.dimensions?.height} ×{" "}
              {product.dimensions?.depth} cm
            </p>
            <p>
              <span className="font-semibold">Warranty:</span>{" "}
              {product.warrantyInformation}
            </p>
            <p>
              <span className="font-semibold">Return Policy:</span>{" "}
              {product.returnPolicy}
            </p>
            <p>
              <span className="font-semibold">Shipping:</span>{" "}
              {product.shippingInformation}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            text="Add to Cart"
            size="lg"
            theme="primary"
            leftIcon={<ShoppingCart className="h-5 w-5" />}
            onClick={() => {
              dispatch(
                addItem({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  image: product.thumbnail,
                })
              );
              toast.success("Added to cart");
            }}
          />
          <Button
            text="Buy Now"
            size="lg"
            theme="secondary"
            leftIcon={<CreditCard className="h-5 w-5" />}
            onClick={() => {
              dispatch(
                addItem({
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  image: product.thumbnail,
                })
              );
              router.push("/checkout");
            }}
          />
        </div>
      </div>
    </main>
  );
}
