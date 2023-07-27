import formatPrice from "@/libs/formatPrice";

interface PriceTagProps {
  price: number;
  className?: string;
}

export default function PriceTag({ price, className }: PriceTagProps) {
  return (
    <span className={`badge badge-outline ${className}`}>
      {formatPrice(price)}
    </span>
  );
}
