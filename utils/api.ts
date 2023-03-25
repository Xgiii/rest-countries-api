import axios from 'axios';

export async function getCountries() {
  try {
    const { data } = await axios.get('https://restcountries.com/v3.1/all');

    return data;
  } catch (error: any) {
    return error?.message;
  }
}

export async function getCountry(country: string) {
  try {
    const { data } = await axios.get(
      `https://restcountries.com/v3.1/name/${country.toLowerCase()}?fullText=true`
    );

    return data;
  } catch (error: any) {
    return error?.message;
  }
}

export const fetcher = async (url: string) =>
  await axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      if (error.response.status !== 409) throw error;
    });
