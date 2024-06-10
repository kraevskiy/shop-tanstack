import { createLazyFileRoute, Link } from "@tanstack/react-router";

import Page from "@/components/page.tsx";
import { useCategoriesListQuery, useProductQuery } from "@/lib/queries.ts";
import { cn, currency, size } from "@/lib/utils.ts";
import Spinner from "@/components/spinner.tsx";
import Carousel from "./-components/carousel.tsx";
import Reviews from "./-components/reviews.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useUserStore } from "@/hooks/use-user.store.ts";
import { useShopCard } from "@/hooks/use-shop-card.store.ts";
import { useModal } from "@/hooks/use-modal.store.ts";
import Rating from "@/components/rating.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table.tsx";

export const Route = createLazyFileRoute("/products/$productId")({
  component: ProductPage,
});

function ProductPage() {
  const { productId } = Route.useParams();
  const { data, isLoading } = useProductQuery(productId);
  const { user } = useUserStore();
  const { addProduct } = useShopCard();
  const { onOpen } = useModal();
  const { data: categories } = useCategoriesListQuery();
  const category = categories?.find((c) => c.slug === data?.category);

  const onClickAddCard = async () => {
    if (!user) {
      return onOpen("login");
    }
    if (!data) {
      return;
    }
    const { id, title, price, thumbnail } = data;
    const productCard = {
      id,
      title,
      price,
      thumbnail,
      quantity: 1,
    };
    addProduct(productCard);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <div className={cn("mx-auto flex justify-center rounded-2xl border bg-background p-5 transition-all")}>
          <Spinner show={true} />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <Page>
        <Page.H2>Product not found</Page.H2>
      </Page>
    );
  }

  return (
    <Page className="gap-12">
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex w-full justify-center sm:w-[345px]">
          <Carousel images={data.images} />
          <Badge
            variant={
              data.availabilityStatus.includes("Low", 0)
                ? "warning"
                : data.availabilityStatus.includes("Out", 0)
                  ? "destructive"
                  : "success"
            }
            className="absolute right-1 top-1"
          >
            {data.availabilityStatus}
          </Badge>
        </div>
        <div className="flex flex-1 flex-col sm:w-full">
          <Page.H1>{data.title}</Page.H1>
          <Page.P className="mb-3">{data.description}</Page.P>
          <div className="mb-1">
            Product: <span className="font-semibold">#{data.sku}</span>
          </div>
          <div className="mb-1 flex gap-1">
            Rating:{" "}
            <span>
              <Rating rating={data.rating} disabled={true} />
            </span>
          </div>
          {category && (
            <div className="mb-1">
              Category:{" "}
              <Link
                to="/products/category/$categorySlug"
                params={{
                  categorySlug: category.slug,
                }}
                className="font-semibold"
              >
                {category.name}
              </Link>
            </div>
          )}
          <div className="mb-2">
            Price: <span className="font-semibold">{currency.format(data.price)}</span>
          </div>
          <Button onClick={onClickAddCard} className="w-full sm:mr-auto sm:w-auto">
            Add to card
          </Button>
        </div>
      </div>
      <Card>
        <CardContent className="p-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Brand:</TableCell>
                <TableCell>{data.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tags:</TableCell>
                <TableCell className="flex gap-2">
                  {data.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Count in stock:</TableCell>
                <TableCell>{data.stock}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Size (height/width/depth):</TableCell>
                <TableCell>
                  {size.format(data.dimensions.height)} / {size.format(data.dimensions.width)} /{" "}
                  {size.format(data.dimensions.depth)}{" "}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Min order quantity:</TableCell>
                <TableCell>{data.minimumOrderQuantity} </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Return policy:</TableCell>
                <TableCell>{data.returnPolicy} </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Shipping information:</TableCell>
                <TableCell>{data.shippingInformation} </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Warranty:</TableCell>
                <TableCell>{data.warrantyInformation} </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Reviews reviews={data.reviews} />
    </Page>
  );
}
