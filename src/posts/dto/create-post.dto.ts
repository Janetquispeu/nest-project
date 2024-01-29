import { ApiProperty } from "@nestjs/swagger";

export class PostDto {
  @ApiProperty({ type: String })
  readonly _id: string;

  @ApiProperty({ type: String })
  readonly title: string;

  @ApiProperty({ type: String })
  readonly author: string;

  @ApiProperty({ type: String })
  readonly content: string;

  @ApiProperty({ type: [String] })
  readonly categories: Object[];

  @ApiProperty({ type: String })
  readonly username: string;

  @ApiProperty({ type: String })
  readonly userId: string;
}
