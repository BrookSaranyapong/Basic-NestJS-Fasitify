/* eslint-disable @typescript-eslint/await-thenable */
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('create & findOne', async () => {
    const productsData = await service.create({
      name: 'iphone',
      description: [{ model: 'iphone 11', battery: '3000 mAh' }],
      price: 9900,
      stock: 10,
    });
    expect(productsData.id).toBeDefined();
    const found = await service.findOne(productsData.id);
    expect(found.name).toBe('iphone');

    // expect(found.name).toBe('iphone');
    // expect(productsData).toEqual(found); นำผลลัพธ์ กับ ของที่สร้างแล้วมีเปรียบเทียบกัน
  });

  it('update', async () => {
    const created = await service.create({
      name: 'iphone',
      description: [{ model: 'iphone 11', battery: '3000 mAh' }],
      price: 9900,
      stock: 10,
    });

    const updated = await service.update(created.id, { price: 13000 });
    expect(updated).toEqual({
      id: created.id,
      name: 'iphone',
      description: [{ model: 'iphone 11', battery: '3000 mAh' }],
      price: 13000,
      stock: 10,
    });

    // ยืนยันว่า state ใน service ถูกอัปเดตจริง
    const refetched = await service.findOne(created.id);
    expect(refetched.price).toBe(13000);
  });

  it('remove', async () => {
    const created = await service.create({
      name: 'iphone',
      description: [{ model: 'iphone 11', battery: '3000 mAh' }],
      price: 13000,
      stock: 10,
    });

    await service.remove(created.id);

    // ✅ ตรวจ error แบบ async
    await expect(service.findOne(created.id)).rejects.toThrow(
      NotFoundException,
    );

    // ตรวจว่าจำนวนเหลือ 0
    const all = await service.findAll();
    expect(all).toHaveLength(0);
  });
});
