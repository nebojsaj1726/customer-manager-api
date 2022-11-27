import { IsNotEmpty } from 'class-validator';

export class FilterQueryDto {
  @IsNotEmpty()
  company: string;
}
