export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: 2;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: IProductReviews[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

export interface IProductReviews {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

type IProductsListKey =
  | "id"
  | "title"
  | "price"
  | "description"
  | "thumbnail"
  | "category"
  | "sku"
  | "availabilityStatus";

export interface IProductsItem extends Pick<IProduct, IProductsListKey> {}

export interface IProductsList {
  products: IProductsItem[];
  total: number;
  skip: number;
  limit: number;
}
