import CityItem from "./CityItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContext";
function CountryList() {
  const { isLoading, cities } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message="Add you first city by clicking add city" />;

  // need to extract counrtries from cities;
  //   const countries = cities
  //     .map((c) => ({
  //       country: c.country,
  //       emoji: c.emoji,
  //     }))
  //     .filter(
  //       (city, idx, countries) =>
  //         countries.findIndex((c) => c.country === city.country) === idx,
  //     );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [
        ...arr,
        { country: city.country, emoji: city.emoji, id: city.id },
      ];
    else return arr;
  }, []);
  console.log(countries);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountryList;
