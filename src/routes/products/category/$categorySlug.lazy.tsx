import { createLazyFileRoute } from "@tanstack/react-router";

import Page from "@/components/page.tsx";
import { useCategoriesListQuery, useCategoriesProductsQuery } from "@/lib/queries.ts";
import { cn } from "@/lib/utils.ts";
import Spinner from "@/components/spinner.tsx";
import Categories from "@/routes/products/-components/categories.tsx";
import ProductCard from "@/routes/products/-components/product-card.tsx";
import { useShopCard } from "@/hooks/use-shop-card.store.ts";
import { useUserStore } from "@/hooks/use-user.store.ts";
import { IProductsItem } from "@/types/product.interface.ts";
import { useModal } from "@/hooks/use-modal.store.ts";

export const Route = createLazyFileRoute("/products/category/$categorySlug")({
  component: CategorySlugPage,
});

function CategorySlugPage() {
  const { categorySlug } = Route.useParams();
  const { data: categories } = useCategoriesListQuery();
  const { addProduct } = useShopCard();
  const { user } = useUserStore();
  const { onOpen } = useModal();
  const { data: products, isLoading, isPending, isFetching } = useCategoriesProductsQuery(categorySlug);
  const categoryName = categories?.find((c) => c.slug === categorySlug)?.name;

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
      <Page.H1>Products{categoryName && ` - ${categoryName}`}</Page.H1>
      <div className="mb-2">
        <Categories activeSlug={categorySlug} />
      </div>
      {(isFetching || isLoading || isPending) && (
        <div className="flex justify-center">
          <div className={cn("mx-auto flex justify-center rounded-2xl border bg-background p-2 transition-all")}>
            <Spinner show={true} />
          </div>
        </div>
      )}
      {products && (
        <>
          <div className="mb-2 grid grid-cols-1 gap-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
            {products.products.map((product) => (
              <ProductCard product={product} key={product.id} onClickAddCard={onClickAddCard} />
            ))}
          </div>
        </>
      )}
    </Page>
  );
}
