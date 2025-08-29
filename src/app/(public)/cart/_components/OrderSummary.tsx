"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/atoms/Button";

interface OrderSummaryProps {
  subtotal: number;
  totalItems: number;
  tax: number;
  total: number;
  isAuthenticated?: boolean;
}

function OrderSummary({
  subtotal,
  totalItems,
  tax,
  total,
  isAuthenticated,
}: OrderSummaryProps) {
  const router = useRouter();

  function renderAuthButton() {
    return isAuthenticated ? (
      <div className="space-y-3">
        <Button
          text="Checkout"
          size="lg"
          theme="primary"
          fullWidth
          onClick={() => router.push("/checkout")}
        />
      </div>
    ) : (
      <div className="space-y-3">
        <Button
          text="Sign In to Checkout"
          size="lg"
          theme="primary"
          fullWidth
          onClick={() => router.push("/login")}
        />
        <p className="text-sm text-grayscale-700 text-center">
          Sign in to complete your purchase
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg p-6 shadow-sm border border-brand-400 bg-brand-50 flex flex-col gap-6">
      <h2 className="text-xl font-bold text-grayscale-850">Order Summary</h2>
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-grayscale-700">
          <span>
            Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
          </span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-grayscale-700">
          <span>Shipping</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>

        <div className="flex justify-between text-grayscale-700">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t border-brand-200 pt-4">
        <div className="flex justify-between">
          <span className="text-lg font-bold text-brand-850">Total</span>
          <span className="text-lg font-bold text-brand-500">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      {renderAuthButton()}

      <div>
        <Button
          text="Continue Shopping"
          size="lg"
          theme="secondary"
          fullWidth
          onClick={() => router.push("/")}
        />
      </div>
    </div>
  );
}

export default OrderSummary;
