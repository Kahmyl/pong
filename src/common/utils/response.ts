export const successResponse = <T>({
  message,
  code = 200,
  data,
  status = "success",
}: {
  status?: string;
  message: string;
  code?: number;
  data?: T;
}) => {
  return { status, message, data, code };
};
