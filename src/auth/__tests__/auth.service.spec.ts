import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../users/user.service';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
    let authService: AuthService;
    let userService: Partial<UserService>;
    let jwtService: Partial<JwtService>;

    beforeEach(async () => {
        userService = {
            findByEmail: jest.fn().mockResolvedValue({
                id: 1,
                email: 'test@example.com',
                password: await bcrypt.hash('password', 10),
            }),
        };

        jwtService = {
            sign: jest.fn().mockReturnValue('mocked-token'),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: UserService, useValue: userService },
                { provide: JwtService, useValue: jwtService },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
    });

    it('should validate a user with correct credentials', async () => {
        const user = await authService.validateUser('test@example.com', 'password');
        expect(user).toBeDefined();
        expect(user?.email).toBe('test@example.com');
    });

    it('should return null if password is incorrect', async () => {
        const user = await authService.validateUser('test@example.com', 'wrongpass');
        expect(user).toBeNull();
    });

    it('should return null if user is not found', async () => {
        (userService.findByEmail as jest.Mock).mockResolvedValue(null);
        const user = await authService.validateUser('notfound@example.com', 'password');
        expect(user).toBeNull();
    });
});
