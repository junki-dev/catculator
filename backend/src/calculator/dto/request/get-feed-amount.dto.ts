import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsNumber, IsOptional } from 'class-validator';

export class GetFeedAmountReqDto {
  @IsNumber()
  @Type(() => Number)
  weight: number;

  @IsDateString()
  birthday: string;

  @IsNumber({ maxDecimalPlaces: 1 })
  @Type(() => Number)
  energyRequirements: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  kcal: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  feedId: number;
}
