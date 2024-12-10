import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsernameDto {
  @ApiProperty({
    description: 'Update username',
    example: 'username',
  })
  username: string;
}
