import { prisma } from "@/libs/db/prisma";

import { cache } from "react";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import PriceTag from "@/components/PriceTag";

import AddToCartButton from "./AddToCartButton";
import { incrementProductQuantity } from "./actions";

interface ProductPageProps {
  // params is a special property that is only available on file names that start with [ and end with ] that will contain the route parameters
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) notFound();
  return product;
});

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);

  return {
    title: product.name + "  - my-Zone",
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  };
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
      <Image
        src={product.imageUrl}
        alt={product.name}
        priority
        className="rounded-lg"
        width={500}
        height={500}
      />
      <div>
        <h1 className="text-4xl font-bold">{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-6">{product.description}</p>
        <AddToCartButton
          productId={product.id}
          incrementProductQuantity={incrementProductQuantity}
        />
      </div>
    </div>
  );
}
