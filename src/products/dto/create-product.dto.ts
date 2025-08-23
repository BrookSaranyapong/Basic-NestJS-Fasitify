/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

class ProductDescDTO {
  @IsString()
  model: string;

  @IsString()
  battery: string;
}

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsArray()
  @IsOptional()
  @Type(() => ProductDescDTO)
  description?: ProductDescDTO[];

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stock: number;
}
