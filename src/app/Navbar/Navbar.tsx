import Link from "next/link";
import { redirect } from "next/navigation";
import { BiLogoMediumOld } from "react-icons/bi";

import { getCart } from "@/libs/db/carts";
import ShoppingCardButton from "./ShoppingCartButton";

async function searchProducts(formData: FormData) {
  "use server";
  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect(`/search?query=${searchQuery}`);
  }
}

export default async function Navbar() {
  const cart = await getCart();

  return (
    <div className="bg-base-200">
      <div className="navbar flex-col sm:flex-row gap-2 max-w-7xl mx-auto ">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            <BiLogoMediumOld className="w-10 h-10" />
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form action={searchProducts}>
            <div className="form-control">
              <input
                name="searchQuery"
                type="text"
                placeholder="Search"
                className="input input-bordered w-full"
              />
            </div>
          </form>
          <ShoppingCardButton cart={cart} />
        </div>
      </div>
    </div>
  );
}