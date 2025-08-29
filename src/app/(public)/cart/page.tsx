"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import Image from "next/image";
import { removeItem, updateQuantity, clearCart } from "@/store/cartSlice";
import { useAppDispatch } from "@/store";
import Link from "next/link";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useSelector((s: RootState) => s.cart.items);
  const list = Object.values(items);

  const totalItems = list.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = list.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  if (list.length === 0) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8">
        <h2 className="text-2xl font-semibold">Your Cart</h2>
        <p className="mt-6 text-gray-600">Your cart is empty.</p>
        <Link
          href="/"
          className="mt-4 inline-block rounded bg-gray-900 px-4 py-2 text-white hover:bg-black"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your Cart</h1>
        <button
          onClick={() => dispatch(clearCart())}
          className="text-sm text-red-600 hover:underline"
        >
          Clear cart
        </button>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_22rem]">
        <ul className="space-y-4">
          {list.map((item) => (
            <li
              key={item.id}
              className="grid grid-cols-[5rem_1fr_auto] items-center gap-4 rounded border bg-white p-3"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded bg-gray-50">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-medium line-clamp-2">{item.title}</p>
                <p className="mt-1 text-sm text-gray-600">
                  ${item.price.toFixed(2)}
                </p>
                <div className="mt-2 inline-flex items-center gap-2">
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity - 1,
                        })
                      )
                    }
                    className="h-8 w-8 rounded border"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                    className="h-8 w-8 rounded border"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => dispatch(removeItem({ id: item.id }))}
                className="text-sm text-red-600 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <aside className="rounded border bg-white p-4 h-fit">
          <h2 className="text-lg font-semibold">Summary</h2>
          <div className="mt-3 text-sm text-gray-700">Items: {totalItems}</div>
          <div className="mt-1 text-base font-bold">
            Total: ${totalPrice.toFixed(2)}
          </div>
          <Link
            href="/checkout"
            className="mt-4 inline-flex w-full items-center justify-center rounded bg-gray-900 px-4 py-2 text-white hover:bg-black"
          >
            Go to Checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}
