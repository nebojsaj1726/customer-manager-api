import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateCustomerDto {
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @IsOptional()
  firstName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @IsOptional()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(30)
  @IsOptional()
  phone: string;

  @ApiProperty()
  @IsString()
  @MaxLength(40)
  @IsOptional()
  address: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(50)
  description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  company: string;
}
