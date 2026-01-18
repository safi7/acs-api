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

  @Column({ type: 'text', nullable: true })
  shortDescription: string;

  @Column({ nullable: true })
  manufacturer: string;

  @Column({ nullable: true })
  certifications: string;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToOne(() => ProductCategoryEntity, (category) => category.products)
  @JoinColumn({ name: 'categorySlug', referencedColumnName: 'slug' })
  @Column()
  categorySlug: string;

  @Column({ type: 'json', nullable: true })
  specifications: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
