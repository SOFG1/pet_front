const PORT = 8000;

const isLocal = !!window.location.href.match("localhost")

export const baseUrl = isLocal ? `http://localhost:${PORT}/v1` : `http:52.41.36.82:${PORT}/v1`



export const handle = async (request: Promise<any>) => {
  try {
    const res = await request
    return Promise.resolve([res.data, null]);
  } catch (e: any) {
    return Promise.resolve([null, e?.response?.data]);
  }
};
