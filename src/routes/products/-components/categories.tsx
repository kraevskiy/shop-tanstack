import {
  Armchair,
  Backpack,
  Bike,
  Car,
  CookingPot,
  Focus,
  Footprints,
  Gem,
  Glasses,
  HandHeart,
  Headset,
  HeartPulse,
  LampDesk,
  Laptop,
  PersonStanding,
  Shirt,
  Smartphone,
  SprayCan,
  Squirrel,
  TabletSmartphone,
  Utensils,
  Watch,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

import { useCategoriesListQuery } from "@/lib/queries.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import Page from "@/components/page.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area.tsx";
import { cn } from "@/lib/utils.ts";

const iconMap = {
  beauty: HeartPulse,
  fragrances: SprayCan,
  furniture: Armchair,
  groceries: Utensils,
  "home-decoration": LampDesk,
  "kitchen-accessories": CookingPot,
  laptops: Laptop,
  "mens-shirts": Shirt,
  "mens-shoes": Footprints,
  "mens-watches": Watch,
  "mobile-accessories": Headset,
  motorcycle: Bike,
  "skin-care": HandHeart,
  smartphones: Smartphone,
  "sports-accessories": PersonStanding,
  sunglasses: Glasses,
  tablets: TabletSmartphone,
  tops: Squirrel,
  vehicle: Car,
  "womens-bags": Backpack,
  "womens-dresses": Shirt,
  "womens-jewellery": Gem,
  "womens-shoes": Footprints,
  "womens-watches": Watch,
  focus: Focus,
};

const Categories = ({ activeSlug }: { activeSlug?: string }) => {
  const { data, isLoading } = useCategoriesListQuery();

  return (
    <div>
      {isLoading && <Skeleton className="h-4 w-[200px]" />}
      {data && (
        <div className="relative pt-3">
          <Page.H3 className="absolute left-2 top-0 z-[1] bg-background px-1">Categories</Page.H3>
          <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <div className="flex w-max space-x-2 p-2 pb-4 pt-4 sm:space-x-3">
              {data.map((category) => {
                const Icon =
                  category.slug in iconMap ? iconMap[category.slug as keyof typeof iconMap] : iconMap["focus"];
                const isDisabled = activeSlug === category.slug;
                return (
                  <Button disabled={isDisabled} key={category.url} variant={isDisabled ? "default" : "outline"} asChild>
                    <Link
                      to="/products/category/$categorySlug"
                      params={{
                        categorySlug: category.slug,
                      }}
                      disabled={isDisabled}
                      className={cn(isDisabled && "cursor-not-allowed")}
                    >
                      <Icon className="h-[1.2rem] w-[1.2rem]" />
                      <span className="ml-2 hidden sm:block">{category.name}</span>
                    </Link>
                  </Button>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default Categories;
