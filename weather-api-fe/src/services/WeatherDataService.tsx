import { baseUrl } from '../Constants';
import axios from 'axios';
import { WeatherData } from '../model/WeatherData';

const weatherApi = axios.create({ baseURL: baseUrl });

export const useWeatherDataService = () => {
    const getWeatherDataJson = async (
        generatorId: string,
        startDate: Date,
        endDate: Date,
        abortController: AbortController
    ) => {
        const params = {
            'generator-id': generatorId,
            'start-date': startDate.toISOString().slice(0, 16),
            'end-date': endDate.toISOString().slice(0, 16)
        };
        const response = await weatherApi.get('/history', {
            params: params,
            signal: abortController.signal
        });
        return response.data as WeatherData[];
    };

    const getWeatherDataCsv = async (
        generatorId: string,
        startDate: Date,
        endDate: Date,
        abortController: AbortController
    ) => {
        const params = {
            'generator-id': generatorId,
            'start-date': startDate.toISOString().slice(0, 16),
            'end-date': endDate.toISOString().slice(0, 16)
        };
        const response = await weatherApi.get('/csv/history', {
            params: params,
            signal: abortController.signal
        });
        return response.data;
    };

    return { getWeatherDataJson, getWeatherDataCsv };
};
