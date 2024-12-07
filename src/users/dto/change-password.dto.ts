import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'User’s old password',
    example: 'oldPassword',
  })
  oldPassword: string;

  @ApiProperty({
    description: 'User’s new password',
    example: 'newPassword',
  })
  newPassword: string;
}
