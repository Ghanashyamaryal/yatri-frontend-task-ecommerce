"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Menu, X, Home, ShoppingCart, CreditCard, User } from "lucide-react";
import Button from "../ui/atoms/Button";
import { useSession } from "next-auth/react";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/cart", label: "Cart", icon: ShoppingCart },
  { href: "/checkout", label: "Checkout", icon: CreditCard },
  { href: "/login", label: "Profile", icon: User },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const profileImage = session?.user?.image || null;

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemCount = Object.values(cartItems).reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="xl:hidden border-b border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between p-4">
        {/* Logo + profile */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center overflow-hidden">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-6 h-6 text-white" />
            )}
          </div>
          <span className="text-brand-600 font-bold text-lg">Aryal Store</span>
        </Link>

        <div className="flex items-center gap-3">
          {/* Cart icon with badge */}
          <Link
            href="/cart"
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-600 text-white text-xs rounded-full px-1.5 py-0.5 font-medium min-w-[20px] text-center">
                {cartItemCount > 99 ? "99+" : cartItemCount}
              </span>
            )}
          </Link>

          {/* Menu toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {open ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Slideout Nav */}
      {open && (
        <nav className="flex flex-col p-4 border-t border-gray-200 bg-gray-50">
          {links.map((l) => {
            const active = pathname === l.href;
            const IconComponent = l.icon;
            const isCart = l.href === "/cart";

            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-all duration-200 ${
                  active
                    ? "text-white bg-brand-600 shadow-md"
                    : "text-gray-700 hover:text-brand-700 hover:bg-brand-50"
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <div className="flex items-center justify-between flex-1">
                  <span className="font-medium">{l.label}</span>
                  {isCart && cartItemCount > 0 && (
                    <span className="bg-brand-100 text-brand-700 text-xs rounded-full px-2 py-1 font-medium min-w-[20px] text-center">
                      {cartItemCount > 99 ? "99+" : cartItemCount}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}

          <div className="mt-4 pt-4 border-t border-gray-200">
            <Button
              text="Sign In"
              onClick={() => router.push("/login")}
              className="w-full"
            />
          </div>
        </nav>
      )}
    </div>
  );
}
