export interface IResponse {
  status: number;
  code: string;
  message?: string;
}

interface IResultCode {
  [key: string]: IResponse;
}

const resultCode: IResultCode = {
  SUCCESS: { status: 200, code: 'OK', message: 'success' },
  UNKNOWN: { status: 500, code: 'UNKNOWN', message: 'unknown error occurred' },
};

export default resultCode;
