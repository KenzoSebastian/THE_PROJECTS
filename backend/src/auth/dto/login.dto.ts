import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Format email tidak valid.' })
  @IsNotEmpty({ message: 'Email tidak boleh kosong.' })
  email: string;

  @IsNotEmpty({ message: 'Password tidak boleh kosong.' })
  @MinLength(4, { message: 'Password minimal 4 karakter.' })
  password: string;
}
