export function successResponse(
  message = "Success",
  data = null,
  status = 200
) {
  return Response.json(
    {
      success: true,
      message,
      ...(data !== null && { data }),
    },
    { status }
  );
}

export function errorResponse(
  message = "Something went wrong",
  status = 500
) {
  return Response.json(
    {
      success: false,
      message,
    },
    { status }
  );
}