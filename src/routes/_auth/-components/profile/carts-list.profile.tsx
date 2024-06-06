import { IShopCartItem } from "@/types/shop-cart.interface.ts";
import AppCard from "@/components/app-card.tsx";
import { currency } from "@/lib/utils.ts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { Link } from "@tanstack/react-router";

interface CartsListProfileProps {
  carts?: IShopCartItem[];
}

const ContentCart = ({ products }: { products: IShopCartItem["products"] }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px] p-1">Preview</TableHead>
        <TableHead className="p-1">Title</TableHead>
        <TableHead className="p-1 text-center">Qty</TableHead>
        <TableHead className="p-1 text-right">Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {products.map((product) => (
        <TableRow key={product.id} className="group">
          <TableCell className="p-1">
            <Link
              className="inline-block h-10 w-10 overflow-hidden rounded-md border md:h-12 md:w-14"
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
          </TableCell>
          <TableCell className="break-words p-1">
            <Link
              to="/products/$productId"
              params={{
                productId: `${product.id}`,
              }}
              className="transition-all group-hover:opacity-75"
            >
              {product.title}
            </Link>
          </TableCell>
          <TableCell className="p-1 text-center">{product.quantity}</TableCell>
          <TableCell className="p-1 text-right font-semibold">
            {currency.format(product.quantity * product.price)}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const CartsListProfile = ({ carts }: CartsListProfileProps) => {
  if (!carts) {
    return null;
  }

  const Title = ({ cart }: { cart: Omit<IShopCartItem, "products"> }) => (
    <div className="flex flex-col gap-2 hover:!no-underline sm:flex-row">
      <p className="font-semibold">#{cart.id}</p>
      <p>
        <span className="text-muted-foreground">Products</span> {cart.totalProducts}
      </p>
      <p>
        <span className="text-muted-foreground">Qty:</span> {cart.totalQuantity}
      </p>
      <p>
        <span className="text-muted-foreground">Discount:</span> {currency.format(cart.discountedTotal)}
      </p>
      <p>
        <span className="text-muted-foreground">Subtotal:</span> {currency.format(cart.total)}
      </p>
    </div>
  );

  return (
    <div className="flex flex-col gap-2 md:gap-4">
      {carts.map((cart) => (
        <AppCard
          key={cart.id}
          type="accordion"
          title={<Title cart={cart} />}
          content={<ContentCart products={cart.products} />}
        />
      ))}
    </div>
  );
};

export default CartsListProfile;
