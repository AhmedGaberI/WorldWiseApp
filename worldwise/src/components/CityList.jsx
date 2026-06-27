import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
function CityList() {
  const { isLoading, cities } = useCities();

  //console.log(isLoading, cities);
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message="Add you first city by clicking add city" />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
