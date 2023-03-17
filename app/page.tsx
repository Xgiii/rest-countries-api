import getCountries from '@/utils/getCountries';
import { Countries } from '@/utils/interfaces';

export default async function Home() {
  const countries: Countries[] = await getCountries();

  return (
    <section>
      {countries.map((country) => (
        <div key={country.name.common}>{country.name.common}</div>
      ))}
    </section>
  );
}
