"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { searchProducts, type Product } from "@/services/products";
import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart } from "lucide-react";
import { RootState } from "@/store";
import Input from "@/components/ui/atoms/Input";
import Button from "../ui/atoms/Button";

export default function Header() {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 300);
  const [results, setResults] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemCount = Object.values(cartItems).reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    let ignore = false;
    (async () => {
      if (!debounced) {
        setResults([]);
        setOpen(false);
        return;
      }

      setIsSearching(true);
      try {
        const data = await searchProducts(debounced);
        if (!ignore) {
          setResults(data.slice(0, 6));
          setOpen(true);
        }
      } catch (error) {
        if (!ignore) {
          setResults([]);
          setOpen(false);
        }
      } finally {
        if (!ignore) {
          setIsSearching(false);
        }
      }
    })();
    return () => {
      ignore = true;
    };
  }, [debounced]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <header className="hidden xl:block sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm w-full ">
      <div className="w-full flex h-16 items-center justify-between gap-6 px-6 mx-auto max-w-[1400px]">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <span className="text-brand-600 font-bold text-xl">Anjan Store</span>
        </Link>

        <div className="flex-1 max-w-[400px] relative" ref={dropdownRef}>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            leftIcon={<Search className="w-5 h-5" />}
            rightIcon={
              isSearching ? (
                <div className="animate-spin w-4 h-4 border-2 border-brand-500 border-t-transparent rounded-full" />
              ) : undefined
            }
            className="w-full"
            fieldSize="md"
          />
          {open && results.length > 0 && (
            <div className="absolute left-0 right-0 mt-1 max-h-80 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg z-50">
              <ul>
                {results.map((p) => (
                  <li key={p.id}>
                    <button
                      onClick={() => {
                        setOpen(false);
                        setQuery("");
                        router.push(`/products/${p.id}`);
                      }}
                      className="flex w-full items-center gap-3 p-3 text-left hover:bg-brand-50 transition-colors"
                    >
                      <div className="relative h-12 w-12 overflow-hidden rounded bg-gray-50">
                        <Image
                          src={
                            p.image || p.thumbnail || "/placeholder-image.jpg"
                          }
                          alt={p.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="line-clamp-1 text-sm font-medium text-gray-900">
                          {p.title}
                        </p>
                        <p className="text-xs text-gray-600">
                          ${p.price.toFixed(2)}
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center gap-6 flex-shrink-0">
          <Link
            href="/cart"
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ShoppingCart className="w-6 h-6 text-gray-400" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount > 99 ? "99+" : cartItemCount}
              </span>
            )}
          </Link>
          <Button text="Sign In" onClick={() => router.push("/login")} />
        </div>
      </div>
    </header>
  );
}
