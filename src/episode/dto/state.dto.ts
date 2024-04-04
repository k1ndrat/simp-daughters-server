import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class StateDto {
  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isLiked: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isWatched: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isForLater: boolean;
}
