export type TProduct = {
  _id?: string;
  id?: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  price: number;
  image: string;
  stock: number;
  rating: number;
  featured: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  createdBy?: string;
};
