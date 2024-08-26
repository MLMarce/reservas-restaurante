import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAuthDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsOptional()
    @IsString()
    password: string;

    @IsOptional()
    @IsNumber()
    phone: number;

    @IsNotEmpty()
    @IsString()
    img: string;
}
