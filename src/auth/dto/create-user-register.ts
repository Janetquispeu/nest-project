import { applyIsOptionalDecorator } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserRegisterDto {
  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly isAdmin: boolean;

  @ApiProperty()
  readonly password: string;
}
