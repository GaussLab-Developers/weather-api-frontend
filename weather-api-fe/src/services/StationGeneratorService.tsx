import { baseUrl } from '../Constants';
import axios from 'axios';
import { Generator } from '../model/Generator';

const stationGeneratorUrl = baseUrl + '/generator';

const stationGeneratorApi = axios.create({ baseURL: stationGeneratorUrl });

export const useStationGeneratorService = () => {
    const getGeneratorById = async (
        generatorId: number,
        abortController: AbortController
    ) => {
        const response = await stationGeneratorApi.get(`/${generatorId}`, {
            signal: abortController.signal
        });
        return response.data as Generator;
    };
    const getAllGenerators = async (abortController: AbortController) => {
        const response = await stationGeneratorApi.get('', {
            signal: abortController.signal
        });
        return response.data as Generator[];
    };

    return { getGeneratorById, getAllGenerators };
};
