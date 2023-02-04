import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let spyService: UserService;

  beforeEach(async () => {
    const ServiceProvider = {
      provide: UserService,
      useFactory: () => ({
        findById: jest.fn(() => {{}}),
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, ServiceProvider],
    }).compile();

    controller = module.get<UserController>(UserController);
    spyService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('calls findById method', () => {
    const id = '1';
    controller.getUser(id);
    expect(spyService.findById).toHaveBeenCalled();
  });
});
