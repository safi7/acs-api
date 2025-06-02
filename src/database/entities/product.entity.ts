import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { ProductCategoryEntity } from './product-category.entity';

@Entity('products')
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => ProductCategoryEntity, (category) => category.products)
  @JoinColumn({ name: 'categorySlug', referencedColumnName: 'slug' })
  categorySlug: string;

  @Column()
  shortDescription: string;

  @Column()
  fullDescription: string;

  @Column()
  manufacturer: string;

  @Column()
  certifications: string;

  @Column()
  specifications: string;

  @Column()
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
