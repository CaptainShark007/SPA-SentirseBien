interface ApiReponse {
  status: string;
  message: string;
}

export interface ApiDataResponse<T> extends ApiReponse {
  data: T;
}

export interface ApiParameters<T> {
  id: number;
  dataSend: T;
}
