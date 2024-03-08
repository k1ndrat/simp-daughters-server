import { IsBoolean, IsOptional } from 'class-validator';

export class StateDto {
  @IsOptional()
  @IsBoolean()
  isLiked: boolean;

  @IsOptional()
  @IsBoolean()
  isWatched: boolean;

  @IsOptional()
  @IsBoolean()
  isForLater: boolean;
}
