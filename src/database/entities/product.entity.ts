import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { ProductCategoryEntity } from './product-category.entity';

@Entity('products')
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @ManyToOne(() => ProductCategoryEntity, (category) => category.products)
  @JoinColumn({ name: 'categorySlug', referencedColumnName: 'slug' })
  @Column()
  categorySlug: string;

  @Column({ nullable: true })
  type: string;

  @Column({ type: 'text', nullable: true })
  composition: string;

  @Column({ nullable: true })
  coating: string;

  @Column({ nullable: true })
  colour: string;

  @Column({ nullable: true })
  tissueReaction: string;

  @Column({ type: 'text', nullable: true })
  absorption: string;

  @Column({ type: 'text', nullable: true })
  presentation: string;

  @Column({ nullable: true })
  needleTypeUrl: string;

  @Column({ nullable: true })
  completeSheet: string;

  @Column({ type: 'text', nullable: true })
  indications: string;

  @Column({ type: 'text', nullable: true })
  benefits: string;

  @Column({ type: 'text', nullable: true })
  orderNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
