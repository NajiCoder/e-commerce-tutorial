"use client";

import { ShoppingCart } from "@/libs/db/carts";
import formatPrice from "@/libs/formatPrice";
import Link from "next/link";

import { AiOutlineShoppingCart } from "react-icons/ai";

interface ShoppingCardButtonProps {
  cart: ShoppingCart | null;
}

export default function ShoppingCardButton({ cart }: ShoppingCardButtonProps) {
  function closeDropDown() {
    const dropdownElement = document.activeElement as HTMLElement;
    if (dropdownElement) {
      dropdownElement.blur();
    }
  }

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <AiOutlineShoppingCart size={24} />
          <span className="badge badge-sm indicator-item">
            {cart?.size || 0}
          </span>
        </div>
      </label>
      <div
        tabIndex={0}
        className="card dropdown-content card-compact mt-3 w-52 bg-base-200 shadow z-30"
      >
        <div className="card-body">
          <span className="text-lg font-bold">{cart?.size || 0} items</span>
          <span className="text-info">
            subTotal: {formatPrice(cart?.subtotal || 0)}
          </span>
          <div className="card-actions">
            <Link
              href="/cart"
              className="btn btn-primary btn-block"
              onClick={closeDropDown}
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
