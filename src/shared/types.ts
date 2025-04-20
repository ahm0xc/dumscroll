export type Schedule = {
  url: string;
  start: string;
  end: string;
  enabled: boolean;
};

export type WeatherDataType = {
  now: Now;
  location: Location;
  fetchUnit: string;
  provider: string;
  providerId: number;
};

export type Location = {
  locationId: string;
  locationName: string;
  locationExact: string;
  latitude: number;
  longitude: number;
  countryCode: string;
};

export type Now = {
  temperature: number;
  apparentTemperature: number;
  condition: string;
  cloudCover: number;
  windDirection: number;
  windSpeed: number;
  uvIndex: number;
  uvIndexText: string;
  code: string;
  humidity: number;
  dewPoint: number;
  windGust: number;
  pressure: string;
  pressureTendency: string;
  precipAmount: number;
  precipAmount12Hours: number;
  precipAmount6Hours: number;
  hasPrecipitation: boolean;
  precipitationType: string;
  visibility: number;
  visibilityText: string;
  high: number;
  low: number;
  precipitationProbability: number;
  rainProbability: number;
  snowProbability: number;
  iceProbability: number;
  link: string;
  precipitationProbabilityDay: number;
  precipitationProbabilityNight: number;
  rainProbabilityDay: number;
  rainProbabilityNight: number;
  snowProbabilityDay: number;
  snowProbabilityNight: number;
  iceProbabilityDay: number;
  iceProbabilityNight: number;
};
