"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "@/components/ui/atoms/Button";
import Input from "@/components/ui/atoms/Input";
import { CheckCircle, CreditCard, Package } from "lucide-react";
import RadioGroup from "@/components/ui/atoms/RadioGroup";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

interface FormValues {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  paymentMethod: string;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
}

export default function CheckoutPage() {
  const status = useProtectedRoute();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const items = useSelector((s: RootState) => s.cart.items);
  const list = useMemo(() => Object.values(items), [items]);
  const subtotal = list.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
      street: "",
      city: "",
      state: "",
      paymentMethod: "credit_card",
      cardNumber: "",
      expiry: "",
      cvv: "",
    },
  });

  if (status !== "authenticated") {
    return null;
  }

  const paymentMethod = watch("paymentMethod");

  const onSubmit = (data: FormValues) => {
    console.log("Order Data:", data);
    setShowSuccessModal(true);
    reset();
  };

  return (
    <main className="mx-auto max-w-[1400px]">
      <h1 className="text-3xl font-bold text-grayscale-850 mb-5">Checkout</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-8 lg:grid-cols-[2fr_1fr]"
      >
        <div className="space-y-6">
          <div className="rounded-lg p-4 shadow-sm border border-brand-400 bg-brand-50 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-grayscale-850">
              Contact Information
            </h2>
            <div className="flex flex-row gap-4">
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Email"
                    placeholder="you@example.com"
                    error={errors.email?.message}
                  />
                )}
              />
              <Controller
                name="phone"
                control={control}
                rules={{ required: "Phone number is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Phone Number"
                    placeholder="+977 9865457825"
                    error={errors.phone?.message}
                  />
                )}
              />
            </div>

            <h2 className="text-xl font-bold text-grayscale-850">
              Shipping Address
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="firstName"
                control={control}
                rules={{ required: "First name is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="First Name"
                    error={errors.firstName?.message}
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                rules={{ required: "Last name is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Last Name"
                    error={errors.lastName?.message}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Controller
                name="street"
                control={control}
                rules={{ required: "Street address is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Street Address"
                    error={errors.street?.message}
                  />
                )}
              />
              <Controller
                name="city"
                control={control}
                rules={{ required: "City is required" }}
                render={({ field }) => (
                  <Input {...field} label="City" error={errors.city?.message} />
                )}
              />
              <Controller
                name="state"
                control={control}
                rules={{ required: "State/Province is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="State/Province"
                    error={errors.state?.message}
                  />
                )}
              />
            </div>
          </div>

          <div className="rounded-lg p-4 shadow-sm border border-brand-400 bg-brand-50 flex flex-col gap-4">
            <h2 className="text-xl font-bold text-grayscale-850">
              Payment Method
            </h2>
            <Controller
              name="paymentMethod"
              control={control}
              rules={{ required: "Payment method is required" }}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  label="Select Payment"
                  options={[
                    { label: "Credit Card", value: "credit_card" },
                    { label: "Cash on Delivery", value: "cod" },
                  ]}
                  selected={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            {paymentMethod === "credit_card" && (
              <>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <Controller
                    name="cardNumber"
                    control={control}
                    rules={{ required: "Card number is required" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Card Number"
                        placeholder="1234 5678 9012 3456"
                        leftIcon={
                          <CreditCard className="h-5 w-5 text-gray-400" />
                        }
                        error={errors.cardNumber?.message}
                      />
                    )}
                  />
                  <Controller
                    name="expiry"
                    control={control}
                    rules={{ required: "Expiry is required" }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Expiry"
                        placeholder="MM/YY"
                        error={errors.expiry?.message}
                      />
                    )}
                  />
                </div>
                <Controller
                  name="cvv"
                  control={control}
                  rules={{ required: "CVV is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="CVV"
                      placeholder="123"
                      fieldSize="sm"
                      error={errors.cvv?.message}
                    />
                  )}
                />
              </>
            )}
          </div>

          <Button
            type="submit"
            text="Place Order"
            size="lg"
            theme="primary"
            fullWidth
            leftIcon={<CreditCard className="h-5 w-5" />}
          />
        </div>
        <div className="h-fit">
          <div className="rounded-lg p-6 shadow-sm border border-brand-400 bg-brand-50 flex flex-col gap-6">
            <h2 className="text-xl font-bold text-grayscale-850 flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Summary
            </h2>

            <div>
              {list.map((it) => (
                <div key={it.id} className="flex justify-between items-center">
                  <div className="flex-1 py-1 gap-1.5 min-w-0">
                    <p className="text-sm font-medium text-grayscale-850 truncate">
                      {it.title}
                    </p>
                    <p className="text-xs pt-1 text-[--color-grayscale-700]">
                      Qty: {it.quantity}
                    </p>
                  </div>
                  <span className="text-sm text-[--color-grayscale-700] ml-4">
                    ${(it.price * it.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-brand-300 pt-4 space-y-3">
              <div className="flex justify-between text-[--color-grayscale-700]">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[--color-grayscale-700]">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-[--color-grayscale-700]">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-brand-300">
                <span className="text-lg font-bold text-grayscale-850">
                  Total
                </span>
                <span className="text-lg font-bold text-[--color-brand-500]">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-8 w-96 flex flex-col items-center gap-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <h2 className="text-xl font-bold text-grayscale-850">
              Order Placed Successfully!
            </h2>
            <p className="text-center text-[--color-grayscale-700]">
              Thank you for your purchase. Your order is being processed.
            </p>
            <Button
              text="Close"
              size="md"
              theme="primary"
              fullWidth
              onClick={() => setShowSuccessModal(false)}
            />
          </div>
        </div>
      )}
    </main>
  );
}
