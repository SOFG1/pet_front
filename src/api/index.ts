const PORT = 8000;

export const baseUrl = `http://localhost:${PORT}/v1`;

export const handle = async (request: Promise<any>) => {
  try {
    const res = await request
    return Promise.resolve([res.data, null]);
  } catch (e: any) {
    return Promise.resolve([null, e?.response?.data]);
  }
};
