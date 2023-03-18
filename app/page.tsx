import CountryCard from '@/components/CountryCard';
import getCountries from '@/utils/getCountries';
import { Countries } from '@/utils/interfaces';

export default async function Home() {
  const countries: Countries[] = await getCountries();

  return (
    <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-6 md:px-24 gap-24 my-24'>
      {countries.map((country) => (
        <CountryCard country={country} key={country.area} />
      ))}
    </section>
  );
}
