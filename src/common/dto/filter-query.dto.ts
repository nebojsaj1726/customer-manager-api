import { IsOptional } from 'class-validator';

export class FilterQueryDto {
  @IsOptional()
  company: string;
}
