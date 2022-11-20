import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/my-app'),
    AuthModule,
    UserModule,
    CustomersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
