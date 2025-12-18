import { BaseEntity } from 'typeorm';
export declare class CrmUserEntity extends BaseEntity {
    id: number;
    username: string;
    password: string;
    token: string;
    createdAt: Date;
    updatedAt: Date;
}
