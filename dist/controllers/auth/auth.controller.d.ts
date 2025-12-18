import { LoginDto } from 'src/common/dto/auth.dto';
import { LoginResponseInterface } from 'src/common/interfaces/auth.interface';
import { AuthService } from 'src/services/auth/auth.service';
export declare class AuthController {
    private authS;
    constructor(authS: AuthService);
    login(params: LoginDto): Promise<LoginResponseInterface>;
    logout(req: any): Promise<{
        status: string;
    }>;
}
