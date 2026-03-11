export type Product = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  images: string[];
  colors: string[];
  sizes: string[];
  featured?: boolean;
  trending?: boolean;
};
