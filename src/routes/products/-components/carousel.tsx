import {
  Carousel as SCarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card.tsx";

const Carousel = ({ images }: { images: string[] }) => {
  return (
    <SCarousel className="w-full max-w-[250px]">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={image + index} className="w-full">
            <Card className="bg-white dark:bg-zinc-200">
              <img src={image} alt="" />
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </SCarousel>
  );
};

export default Carousel;
