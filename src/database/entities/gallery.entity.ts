import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

@Entity('gallery')
export class GalleryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imagePath: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}


