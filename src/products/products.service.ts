import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './types';

@Injectable()
export class ProductsService {
  private seq = 1;
  private items: Product[] = [];

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const item: Product = {
      id: this.seq++,
      ...createProductDto,
    };
    this.items.push(item);
    return item;
  }

  async findAll(): Product[] {
    return this.items;
  }

  async findOne(id: number): Product {
    const found = this.items.find((i) => i.id === id);
    if (!found) throw new NotFoundException('Product not found');
    return found;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Product {
    const idx = this.items.findIndex((i) => i.id === id);
    if (idx < 0) throw new NotFoundException(`Product not found`);
    this.items[idx] = { ...this.items[idx], ...updateProductDto };
    console.log(this.items[idx]);
    return this.items[idx];
  }

  async remove(id: number): void {
    const before = this.items.length;
    this.items = this.items.filter((i) => i.id !== id);
    if (this.items.length === before)
      throw new NotFoundException('Product not found');
  }
}
