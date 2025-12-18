import { Repository } from 'typeorm';
import { CrmUserEntity } from 'src/database/entities';
export declare class AuthService {
    private crmUserRepo;
    constructor(crmUserRepo: Repository<CrmUserEntity>);
    login(username: string, password: string): Promise<{
        token: string;
        username: string;
    }>;
    validateToken(token: string): Promise<CrmUserEntity | null>;
    logout(token: string): Promise<void>;
    private generateToken;
    hashPassword(password: string): Promise<string>;
}
