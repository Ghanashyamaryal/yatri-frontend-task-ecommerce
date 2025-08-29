"use client";

import toast from "react-hot-toast";
import { addItem } from "@/store/cartSlice";
import { useAppDispatch } from "@/store";
import Button from "@/components/ui/atoms/Button";
import { ShoppingCart } from "lucide-react";

type Props = {
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
  };
};

export default function AddToCartButton({ product }: Props) {
  const dispatch = useAppDispatch();

  return (
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
            image: product.image,
            category: product.category,
          })
        );
        toast.success("Added to cart");
      }}
    />
  );
}
