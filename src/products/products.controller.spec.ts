/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductsController', () => {
  let productController: ProductsController;
  let productService: ProductsService;

  beforeEach(async () => {
    const mockProductService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    productController = module.get<ProductsController>(ProductsController);
    productService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(productController).toBeDefined();
  });

  it('POST /products', async () => {
    expect(ProductsController).toBeDefined();
    const dto: CreateProductDto = {
      name: 'iphone',
      description: [{ model: 'iphone 11', battery: '3000 mAh' }],
      price: 9900,
      stock: 10,
    };
    await productController.create(dto);
    expect(productService.create).toHaveBeenCalled();
    expect(productService.create).toHaveBeenCalledWith(dto);
  });
});
