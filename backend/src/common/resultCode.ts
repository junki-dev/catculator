export interface IResponse {
  status: number;
  code: string;
  message?: string;
}

const resultCode: Record<string, IResponse> = {
  SUCCESS: { status: 200, code: 'OK', message: 'success' },
  INVALID_PARAM: { status: 400, code: 'INVALID_PARAMETER', message: 'invalid parameter' },
  NOT_FOUND: { status: 404, code: 'NOT_FOUND', message: 'not found data' },
  CALC_RER_ERROR: { status: 500, code: 'CALC_RER_ERROR', message: 'failed to calculate RER' },
  DB_ERROR: { status: 500, code: 'DATABASE_ERROR', message: 'database error occurred' },
  UNKNOWN: { status: 500, code: 'UNKNOWN', message: 'unknown error occurred' },
};

export default resultCode;
