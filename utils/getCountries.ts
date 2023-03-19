import axios from 'axios';
import { Countries } from './interfaces';

export default async function getCountries() {
  try {
    const { data } = await axios.get('https://restcountries.com/v3.1/all');

    return data;
  } catch (error: any) {
    return error?.message;
  }
}
