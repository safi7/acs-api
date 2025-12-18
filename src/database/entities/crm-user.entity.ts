import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

@Entity('crm_users')
export class CrmUserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string; // encrypted password

  @Column({ type: 'varchar', nullable: true })
  token: string; // authentication token

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

