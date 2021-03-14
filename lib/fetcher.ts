const fetcher = async (
  route: string,
  method: string = "GET",
  body?: BodyInit
) => {
  const res = await fetch(route, {
    method,
    body,
  });

  return res;
};

export default fetcher;
