export type WeatherData = {
    id?: number;
    generatorId: number;
    timestamp: number;
    timestampUtc: string;
    timestampLocal: string;
    partOfDay: string;

    precipitation: string;
    cloudCoverage: string;
    snow: string;
    visibility: string;
    temperature: string;
    apparentTemperature: string;
    relativeHumidity: string;
    dewPoint: string;
    windSpeed: string;
    windDirection: string;
    pressure: string;
    seaLevelPressure: string;
    uvIndex: string;
    solarElevationAngle: string;
    solarRadiation: string;
    solarAzimuthAngle: string;
    globalHorizontalSolarIrradiance: string;
    directHorizontalSolarIrradiance: string;
    directNormalSolarIrradiance: string;
};
