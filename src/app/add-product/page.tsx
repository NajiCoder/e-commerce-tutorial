import { prisma } from "@/libs/db/prisma";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import SubmitButton from "@/components/SubmitButton";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = { title: "Add Product - my-Zone" };

async function addProduct(formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw new Error("Missing required fields");
  }

  await prisma.product.create({
    data: {
      name,
      description,
      imageUrl,
      price,
    },
  });

  redirect("/");
}

export default async function AddProductPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Product Page</h1>
      <form action={addProduct}>
        <input
          type="text"
          required
          name="name"
          placeholder="Product Name"
          className="input input-bordered mb-3 w-full "
        />
        <textarea
          required
          name="description"
          placeholder="Product Description"
          className="textarea textarea-bordered mb-3 w-full"
        ></textarea>
        <input
          required
          name="imageUrl"
          placeholder="Product Image URL"
          type="url"
          className="input input-bordered mb-3 w-full "
        />
        <input
          required
          name="price"
          placeholder="Product Price"
          type="number"
          className="input input-bordered mb-3 w-full "
        />
        <SubmitButton className="btn-block">Add Product</SubmitButton>
      </form>
    </div>
  );
}
