import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  phone: string;

  @IsString()
  @MaxLength(40)
  @IsNotEmpty()
  address: string;

  @IsString()
  @MaxLength(50)
  description: string;

  @IsString()
  @IsOptional()
  company: string;
}
