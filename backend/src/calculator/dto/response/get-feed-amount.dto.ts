import { IsInt } from 'class-validator';

export class GetFeedAmountResDto {
  @IsInt()
  rer: number;

  @IsInt()
  der: number;

  @IsInt()
  amount: number;
}
