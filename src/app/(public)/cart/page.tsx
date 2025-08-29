"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import Image from "next/image";
import { removeItem, updateQuantity } from "@/store/cartSlice";
import { useAppDispatch } from "@/store";
import Button from "@/components/ui/atoms/Button";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useSession } from "next-auth/react";
import OrderSummary from "./_components/OrderSummary";
import CartItemCard from "./_components/CartItemCard";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const items = useSelector((s: RootState) => s.cart.items);
  const list = Object.values(items);

  const totalItems = list.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = list.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (list.length === 0) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[--color-brand-100] shadow-sm">
            <ShoppingBag className="h-12 w-12 text-[--color-grayscale-800]" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-[--color-grayscale-850]">
            Your cart is empty
          </h2>
          <p className="mb-8 text-base text-grayscale-700">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button
            text="Start Shopping"
            size="lg"
            theme="primary"
            leftIcon={<ShoppingBag className="h-5 w-5" />}
            onClick={() => (window.location.href = "/")}
          />
        </div>
      </main>
    );
  }

  return (
    <div className="w-full py-8 px-4">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mb-8 flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-[grayscale-850">
            Shopping Cart
          </h1>
          <p className=" text-base text-grayscale-700">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <div className="space-y-4">
            {list.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onUpdateQuantity={(quantity) =>
                  dispatch(updateQuantity({ id: item.id, quantity }))
                }
                onRemove={() => dispatch(removeItem({ id: item.id }))}
              />
            ))}
          </div>
          <div className="h-fit">
            <OrderSummary
              subtotal={subtotal}
              totalItems={totalItems}
              tax={tax}
              total={total}
              isAuthenticated={!!session}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
