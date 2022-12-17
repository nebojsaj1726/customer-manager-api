import { ApiProperty } from '@nestjs/swagger';
import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsString()
  @MaxLength(40)
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  company: string;
}
