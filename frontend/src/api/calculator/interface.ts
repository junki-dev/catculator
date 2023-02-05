export interface IGetFeedAmountReq {
  weight: number;
  birthday: Date;
  energyRequirements: number;
  kcal?: number;
  feedId?: number;
}

export interface IGetFeedAmountResp {
  rer: number;
  der: number;
  amount: number;
}
