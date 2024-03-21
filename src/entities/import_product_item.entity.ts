// import_product_item.entity.ts
import { Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { ImportProduct } from './import_product.entity';
import { Product } from './product.entity';

@Entity()
export class ImportProductItem {
  @PrimaryKey()
  import_id!: string;

  @PrimaryKey()
  product_id!: string;

  @ManyToOne(() => ImportProduct)
  import!: ImportProduct;

  @ManyToOne(() => Product)
  product!: Product;
}
