import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Link } from "@tanstack/react-router";

import { IProductsItem } from "@/types/product.interface.ts";
import { cn, currency, truncate } from "@/lib/utils.ts";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button.tsx";

interface ProductCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: IProductsItem;
  onClickAddCard?: (product: IProductsItem) => Promise<void>;
}

const ProductCard: React.FC<ProductCardProps> = ({ className, product, onClickAddCard, ...props }) => {

  const onClick = async () => {
    if (onClickAddCard) {
      await onClickAddCard(product);
    }
  }

  return (
    <Card className={cn("group flex w-full flex-col", className)} {...props}>
      <div className="relative h-44 w-full overflow-hidden rounded-t-lg bg-white dark:bg-zinc-200">
        <Link
          to="/products/$productId"
          params={{
            productId: `${product.id}`,
          }}
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-[100%] w-[100%] object-contain transition-all group-hover:scale-105"
          />
        </Link>
        <Badge className="absolute right-1 top-1">#{product.sku}</Badge>
        <Badge
          variant={
            product.availabilityStatus.includes("Low", 0)
              ? "warning"
              : product.availabilityStatus.includes("Out", 0)
                ? "destructive"
                : "success"
          }
          className="absolute left-1 top-1"
        >
          {product.availabilityStatus}
        </Badge>
      </div>
      <CardHeader className="px-2 py-3">
        <Link
          to="/products/$productId"
          className="text-base font-semibold transition-all group-hover:opacity-75"
          params={{
            productId: `${product.id}`,
          }}
        >
          {product.title}
        </Link>
        <div className="flex justify-between">
          <p className="text-base font-bold">{currency.format(product.price)}</p>
          <p className="mt-0 text-xs text-muted-foreground">{product.category}</p>
        </div>
        <p className="mt-0 text-sm text-muted-foreground">{truncate(product.description)}</p>
      </CardHeader>
      <CardFooter className="mt-auto flex justify-end px-2 py-3">
        <Button onClick={onClick} className="w-full sm:w-auto">Add to card</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
