import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import PriceTag from "./PriceTag";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;

  return (
    <Link
      href={`/product/${product.id}`}
      className="card w-full bg-base-100 hover:shadow-lg transition"
    >
      <figure className="card-image">
        <Image
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
          width={800}
          height={400}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        {isNew && <span className="badge badge-secondary ml-2">New</span>}
        <p className="card-text">{product.description}</p>
        <PriceTag price={product.price} className="mt-2" />
      </div>
    </Link>
  );
}
