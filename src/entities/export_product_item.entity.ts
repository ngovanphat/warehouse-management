// export_product_item.entity.ts
import { Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { ExportProduct } from './export_product.entity';
import { Product } from './product.entity';

@Entity()
export class ExportProductItem {
  @PrimaryKey()
  export_id!: string;

  @PrimaryKey()
  product_id!: string;

  @ManyToOne(() => ExportProduct)
  export!: ExportProduct;

  @ManyToOne(() => Product)
  product!: Product;
}
