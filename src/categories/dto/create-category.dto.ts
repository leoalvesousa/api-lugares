import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({
    message: 'Informe um nome',
  })
  name: string;
}
