import { createFileRoute } from "@tanstack/react-router";

import Page from "@/components/page.tsx";
import { SearchProductParams } from "@/types/search-product-params.ts";
import { useProductsQuery } from "@/lib/queries.ts";
import Categories from "./-components/categories.tsx";
import ProductCard from "./-components/product-card.tsx";
import Pagination from "@/routes/products/-components/pagination.tsx";
import { IProductsItem } from "@/types/product.interface.ts";
import { useUserStore } from "@/hooks/use-user.store.ts";
import { useModal } from "@/hooks/use-modal.store.ts";
import { useShopCard } from "@/hooks/use-shop-card.store.ts";

export const Route = createFileRoute("/products/")({
  validateSearch: (search: Record<string, unknown>): SearchProductParams => ({
    limit: Number(search.limit ?? 30),
    skip: Number(search.skip ?? 0),
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const searchParams = Route.useSearch();
  const { data } = useProductsQuery(searchParams);
  const { user } = useUserStore();
  const { addProduct } = useShopCard();
  const { onOpen } = useModal();

  const onClickAddCard = async ({ id, title, thumbnail, price }: IProductsItem) => {
    if (!user) {
      return onOpen("login");
    }
    const productCard = {
      id,
      title,
      price,
      thumbnail,
      quantity: 1,
    };
    addProduct(productCard);
  };

  return (
    <Page>
      <Page.H1>Products</Page.H1>
      <div className="mb-2">
        <Categories />
      </div>
      {data && (
        <>
          <div className="mb-2 grid grid-cols-1 gap-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
            {data.products.map((product) => (
              <ProductCard product={product} key={product.id} onClickAddCard={onClickAddCard} />
            ))}
          </div>
          <Pagination total={data.total} limit={30} skip={data.skip} />
        </>
      )}
    </Page>
  );
}
