"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  Home,
  ShoppingCart,
  CreditCard,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/cart", label: "Cart", icon: ShoppingCart },
  { href: "/checkout", label: "Checkout", icon: CreditCard },
  { href: "/login", label: "Profile", icon: User },
];

//dummy data will be replace later
const user = {
  name: "Ghanashyam Aryal",
  email: "ghanashyamaryal9@gmail.com",
};

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Get cart items from Redux store
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemCount = Object.values(cartItems).reduce(
    (total, item) => total + item.quantity,
    0
  );

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <aside
      className={`hidden md:block fixed left-0 top-14 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      } bg-white border-r border-gray-200 shadow-sm`}
    >
      <div className="p-4 border-b border-gray-200">
        <div
          className={`flex items-center gap-3 ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col overflow-hidden">
                <span className="text-gray-900 font-medium truncate">
                  {user.name}
                </span>
                <span className="text-gray-500 text-xs truncate">
                  {user.email}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-6 h-6 text-gray-600" />
            ) : (
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2">
        {links.map((l) => {
          const active = pathname === l.href;
          const IconComponent = l.icon;
          const isCart = l.href === "/cart";

          return (
            <Link
              key={l.href}
              href={l.href}
              className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ${
                active
                  ? "text-white bg-brand-500 shadow-md"
                  : "text-gray-700 hover:text-brand-700 hover:bg-brand-50"
              } ${isCollapsed ? "justify-center" : ""}`}
            >
              <IconComponent className="w-6 h-6 flex-shrink-0" />
              {!isCollapsed && (
                <div className="flex items-center justify-between flex-1">
                  <span className="truncate font-medium">{l.label}</span>
                  {isCart && cartItemCount > 0 && (
                    <span className="bg-brand-100 text-brand-700 text-xs rounded-full px-2 py-1 font-medium min-w-[20px] text-center">
                      {cartItemCount > 99 ? "99+" : cartItemCount}
                    </span>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
