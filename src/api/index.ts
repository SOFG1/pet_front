const PORT = 8000;

const isLocal = !!window.location.href.match("localhost")

export const baseUrl = isLocal ? `http://localhost:${PORT}/v1` : `https://pet-back-o9nr.onrender.com/v1`



export const handle = async (request: Promise<any>) => {
  try {
    const res = await request
    return Promise.resolve([res.data, null]);
  } catch (e: any) {
    return Promise.resolve([null, e?.response?.data]);
  }
};
