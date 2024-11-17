type CountryCities = {
  [country: string]: string[];
};

interface CityCoordinates {
  latitude: number;
  longitude: number;
}

export { type CountryCities, type CityCoordinates };