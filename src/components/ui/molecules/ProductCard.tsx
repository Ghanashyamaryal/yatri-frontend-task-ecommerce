"use client";

import Image from "next/image";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/cartSlice";
import type { Product } from "@/services/products";
import Button from "@/components/ui/atoms/Button";
import toast from "react-hot-toast";
import { useState } from "react";
import Link from "next/link";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);

  const rating = product.rating || (Math.random() * 2 + 2).toFixed(1);

  const imageUrl =
    product.image || product.thumbnail || "/placeholder-image.svg";
  const category = product.category || "general";

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    dispatch(
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: imageUrl,
        quantity: 1,
      })
    );

    toast.success(`${product.title} added to cart!`, {
      duration: 2000,
      position: "top-right",
      style: {
        background: "#7f49c5",
        color: "#fff",
        borderRadius: "8px",
      },
    });
  };

  return (
    <Link
      key={product.id}
      href={`/products/${product.id}`}
      className="group flex flex-col gap-3 rounded-lg border border-purple-100 hover:shadow-lg transition-all duration-300 bg-white"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-brand-50">
        {imageUrl && imageUrl !== "/placeholder-image.svg" ? (
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
            onError={() => {
              console.warn(
                `Failed to load image for product: ${product.title}`
              );
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <Image
              src="/placeholder-image.svg"
              alt="Product placeholder"
              width={80}
              height={50}
              className="opacity-50"
            />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-row justify-between">
          <span className="self-start px-2 py-1 text-xs font-medium text-gray-700 bg-brand-100 rounded-lg capitalize">
            {category}
          </span>
          <button
            type="button"
            onClick={() => setLiked((prev) => !prev)}
            className="p-1 rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${
                liked ? "text-red-700 fill-red-700" : "text-gray-500"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm text-gray-700 font-medium">{rating}</span>
        </div>

        <h3 className="line-clamp-2 text-sm font-medium text-gray-900 leading-tight flex-1">
          {product.title}
        </h3>

        <div className="flex items-center gap-2">
          {product.discountPercentage ? (
            <>
              <span className="text-lg font-bold text-gray-900">
                $
                {(
                  product.price *
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}
              </span>

              <span className="text-sm text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm font-medium text-green-600">
                -{product.discountPercentage.toFixed(0)}%
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        <Button
          text="Add to Cart"
          theme="primary"
          size="sm"
          fullWidth
          onClick={handleAddToCart}
          className="shadow-md"
          leftIcon={<ShoppingCart className="w-4 h-4" />}
        />
      </div>
    </Link>
  );
}
