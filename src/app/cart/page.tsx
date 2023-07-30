import { getCart } from "@/libs/db/carts";
import { setProductQuantity } from "./actions";

import CartItem from "./CartItem";

import formatPrice from "@/libs/formatPrice";

export const metadata = {
  title: "Your Cart - my-Zone",
};

export default async function CartPage() {
  const cart = await getCart();

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold">Cart</h1>
      {cart?.items.map((cartItem) => (
        <CartItem
          key={cartItem.id}
          cartItem={cartItem}
          setProductQuantity={setProductQuantity} // we can't use server actions in a client component
        />
      ))}
      {!cart?.items.length && <p>Your cart is empty.</p>}
      <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold">
          Total : {formatPrice(cart?.subtotal || 0)}
        </p>
        <button className="btn btn-primary sm:w-[200px]">Checkout</button>
      </div>
    </div>
  );
}
