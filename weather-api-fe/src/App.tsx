import { useWeatherDataService } from './services/WeatherDataService';
import { useStationGeneratorService } from './services/StationGeneratorService';
import { useState } from 'react';
import { Generator } from './model/Generator';

export const App = () => {
    const stationGeneratorService = useStationGeneratorService();
    const weatherDataService = useWeatherDataService();
    const abortController = new AbortController();
    const [generatorList, setGeneratorList] = useState<Generator[] | undefined>(
        undefined
    );

    return (
        <div className="flex flex-col">
            <h1>Hello there</h1>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    stationGeneratorService
                        .getAllGenerators(abortController)
                        .then((result) => {
                            setGeneratorList(result);
                        });
                }}
            >
                Load all generators
            </button>

            {generatorList && (
                <ul>
                    {generatorList.map((generator: Generator) => {
                        return (
                            <li key={generator.id}>
                                <p>{`generator id = ${generator.id}, name= ${generator.generatorName}`}</p>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};
