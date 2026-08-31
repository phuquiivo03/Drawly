export type AppResponse<T> = {
  status: number;
  success: boolean;
  data: T;
};
