const PORT = 8000;

const isLocal = !!window.location.href.match("localhost")

export const hostUrl = isLocal ? `http://localhost:${PORT}` : `https://pet-back-o9nr.onrender.com`

export const apiUrl = `${hostUrl}/v1`



export const handle = async (request: Promise<any>) => {
  try {
    const res = await request
    return Promise.resolve([res.data, null]);
  } catch (e: any) {
    return Promise.resolve([null, e?.response?.data]);
  }
};
