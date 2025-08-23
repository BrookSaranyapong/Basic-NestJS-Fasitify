// src/products/types.ts
export interface ProductDesc {
  model: string;
  battery: string;
}

export interface Product {
  id: number;
  name: string;
  description?: ProductDesc[];
  price: number;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CreateProduct = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateProduct = Partial<CreateProduct>;
