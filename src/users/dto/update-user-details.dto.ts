import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDetailsDto {
  @ApiProperty({
    description: 'Update username',
    example: 'username',
  })
  username: string;

  @ApiProperty({
    description: 'Update email',
    example: 'email',
  })
  email: string;
}
