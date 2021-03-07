const fetcher = async (
  url: string,
  token: string,
  method: string = "GET",
  body?: BodyInit
) => {
  const res = await fetch(url, {
    method,
    headers: new Headers({ "Content-Type": "application/json", token }),
    credentials: "same-origin",
    body,
  });

  return res.json();
};

export default fetcher;
