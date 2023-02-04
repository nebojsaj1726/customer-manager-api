import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

class ServiceMock {
  getUser(user: any) {
    return user;
  }
  async findByEmail(email: string) {
    return email;
  }
  async findById(id: string) {
    return { id };
  }
  async create(firstName: string, email: string, hashedPassword: string) {
    return { firstName, email, hashedPassword };
  }
}

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserService,
          useClass: ServiceMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call getUser method with expected params', async () => {
    const getUserSpy = jest.spyOn(service, 'getUser');
    const user: any = {
      firstName: 'Joe',
      email: 'joe@joe.com',
      password: 'password',
    };
    service.getUser(user);
    expect(getUserSpy).toHaveBeenCalledWith(user);
  });

  it('should call findByEmail method with expected params', async () => {
    const findByEmailSpy = jest.spyOn(service, 'findByEmail');
    const email = 'email';
    service.findByEmail(email);
    expect(findByEmailSpy).toHaveBeenCalledWith(email);
  });

  it('should call findById method with expected params', async () => {
    const findByIdSpy = jest.spyOn(service, 'findById');
    const id = '1';
    service.findById(id);
    expect(findByIdSpy).toHaveBeenCalledWith(id);
  });

  it('should call create method with expected params', async () => {
    const createSpy = jest.spyOn(service, 'create');
    service.create('Joe', 'joe@joe.com', 'hash');
    expect(createSpy).toHaveBeenCalledWith('Joe', 'joe@joe.com', 'hash');
  });
});
