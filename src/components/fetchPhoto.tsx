import axios from "axios";
export const fetchPhoto = async <DataType>(
  query: string,
  page: number = 1,
  perPage: number = 12
): Promise<DataType> => {
  try {
    const responce = await axios.get<{ results: DataType }>(
      `https://api.unsplash.com/search/photos`,
      {
        headers: {
          Authorization: `Client-ID _M2rXGxlX9xDK1iu9GI31ka_JVewW7yHFos3Jc0kt_k`,
          "Accept-Version": "v1",
        },
        params: {
          query,
          page,
          per_page: perPage,
        },
      }
    );

    return responce.data.results;
  } catch (error) {
    console.log(error);
    return {} as DataType;
  }
};