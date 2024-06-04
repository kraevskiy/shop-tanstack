import { Fragment } from "react";

import { IProductReviews } from "@/types/product.interface.ts";
import Page from "@/components/page.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import Rating from "@/components/rating.tsx";
import { format } from "date-fns";

const Reviews = ({ reviews }: { reviews?: IProductReviews[] }) => {
  if (!reviews) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <Page.H2>Reviews</Page.H2>
      {reviews.map((review, idx) => (
        <Fragment key={review.comment + idx}>
          {idx > 0 && <Separator className="my-3" />}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-8 xl:grid-cols-10">
            <div className="col-span-1 flex flex-row justify-between gap-4 sm:col-span-2 sm:flex-col sm:justify-start">
              <Rating rating={review.rating} disabled hideNumber />
              <p className="!m-0 text-muted-foreground">{format(new Date(review.date), "dd MMMM yyyy")}</p>
            </div>
            <div className="col-span-1 flex flex-col gap-4 sm:col-span-6 xl:col-span-8">
              <p className="font-semibold">{review.reviewerName}</p>
              <p>{review.comment}</p>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default Reviews;
