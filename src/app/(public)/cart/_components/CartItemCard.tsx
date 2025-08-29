import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

interface CartItemCardProps {
  item: {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
    category?: string;
  };
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

function CartItemCard({ item, onUpdateQuantity, onRemove }: CartItemCardProps) {
  const totalPrice = item.price * item.quantity;

  return (
    <div className="rounded-lg  p-6 shadow-sm border border-brand-400 bg-brand-50">
      <div className="flex gap-4">
        <div className="relative h-24 w-30 flex-shrink-0 overflow-hidden rounded-lg bg-white">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col gap-5 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-[--color-grayscale-850] line-clamp-2">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-grayscale-700 capitalize">
                {item.category || "men's clothing"}
              </p>
            </div>

            <button
              onClick={onRemove}
              className="ml-4 p-2 text-grayscale-900 rounded-md cursor-pointer bg-brand-100 hover:text-red-600 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className=" flex items-center gap-3">
            <div className="flex items-center border border-grayscale-300 rounded-xl">
              <button
                onClick={() => onUpdateQuantity(Math.max(1, item.quantity - 1))}
                className="p-2 hover:bg-grayscale-50 rounded-md cursor-pointer"
              >
                <Minus className="h-4 w-4 text-grayscale-700" />
              </button>
              <span className="px-4 py-2 text-grayscale-850 font-medium">
                {item.quantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(item.quantity + 1)}
                className="p-2 hover:bg-grayscale-50 rounded-md cursor-pointer"
              >
                <Plus className="h-4 w-4 text-grayscale-700" />
              </button>
            </div>
          </div>

          <div className="text-right ">
            <p className=" text-lg font-semibold text-grayscale-850">
              ${totalPrice.toFixed(2)}
            </p>
            <p className="text-sm text-grayscale-700">
              ${item.price.toFixed(2)} each
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItemCard;
