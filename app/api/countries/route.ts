import axios from 'axios';

export async function GET(request: Request) {
  try {
    const { data } = await axios.get('https://restcountries.com/v3.1/all');
    
    return new Response(data);
  } catch (error: any) {
    return new Response(error.message);
  }
}
