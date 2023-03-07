import { baseUrl } from '../Constants';
import axios from 'axios';
import { WeatherData } from '../model/WeatherData';

const weatherUrl = baseUrl + '/history';

const weatherApi = axios.create({ baseURL: weatherUrl });

export const useWeatherDataService = () => {
    const getWeatherData = async (
        generatorId: string,
        startDate: Date,
        endDate: Date,
        abortController: AbortController
    ) => {
        const params = {
            'generator-id': generatorId,
            'start-date': startDate,
            'end-date': endDate
        };
        const response = await weatherApi.get('', {
            params: params,
            signal: abortController.signal
        });
        return response.data as WeatherData[];
    };

    return { getWeatherData };
};
