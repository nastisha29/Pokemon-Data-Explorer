const get = async (url: string): Promise<Response> => {
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const apiInstance = {
  get,
};
