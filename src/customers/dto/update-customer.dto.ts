import { MaxLength, IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateCustomerDto {
  @IsString()
  @MaxLength(30)
  @IsOptional()
  firstName: string;

  @IsString()
  @MaxLength(30)
  @IsOptional()
  lastName: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @MaxLength(30)
  @IsOptional()
  phone: string;

  @IsString()
  @MaxLength(40)
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  description: string;

  @IsString()
  @IsOptional()
  company: string;
}
