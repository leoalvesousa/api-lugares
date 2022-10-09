import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Informe um nome',
  })
  name: string;

  @IsEmail({
    message: 'Email inválido',
  })
  @IsNotEmpty({
    message: 'Email ou senha incorretos',
  })
  email: string;

  @IsNotEmpty({
    message: 'Email ou senha incorretos',
  })
  @Matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]))/, {
    message:
      'A senha deve conter uma letra maiúscula, uma letra minúscula, um número e um caracter especial.',
  })
  @MinLength(8, {
    message: 'A senha deve ter no mínimo oito caracteres ',
  })
  @IsNotEmpty({
    message: 'Email ou senha incorretos',
  })
  password: string;
}
