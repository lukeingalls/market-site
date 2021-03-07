const fetcher = async (url: string, token: string, method: string = "GET") => {
  const res = await fetch(url, {
    method,
    headers: new Headers({ "Content-Type": "application/json", token }),
    credentials: "same-origin",
  });

  return res.json();
};

export default fetcher;
