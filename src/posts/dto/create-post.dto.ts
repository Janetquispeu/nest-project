export class PostDto {
  readonly _id: string;
  readonly title: string;
  readonly author: string;
  readonly content: string;
  readonly categories: Object[];
  readonly username: string;
  readonly userId: string;
}
