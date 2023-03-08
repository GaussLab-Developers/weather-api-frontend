import { useWeatherDataService } from './services/WeatherDataService';
import { useStationGeneratorService } from './services/StationGeneratorService';
import React, { useEffect, useRef, useState } from 'react';
import { Generator } from './model/Generator';
import { TopBar } from './components/TopBar';
import { ModalState, useModalController } from './hooks/useModalController';
import { ModalControllerContext } from './contexts/ModalControllerContext';
import { DateTimeDisplayButton } from './components/DateTimePicker/DateTimeDisplayButton';
import { ModalWindow } from './components/ModalWindow';
import { GaussButton } from './components/GaussButton';
import { LoadingSpinner } from './components/LoadingSpinner';

export const App = () => {
    const stationGeneratorService = useStationGeneratorService();
    const weatherDataService = useWeatherDataService();
    const abortController = new AbortController();
    const [generatorList, setGeneratorList] = useState<Generator[] | undefined>(
        undefined
    );
    const mapElement = useRef(null);
    const [map, setMap] = useState<naver.maps.Map>();

    const [selectedGenerator, setSelectedGenerator] = useState<
        Generator | undefined
    >(undefined);
    const [selectedMarker, setSelectedMarker] = useState<
        naver.maps.Marker | undefined
    >(undefined);

    const [modalState, setModalState] = useState<ModalState>({
        isShowing: false,
        content: null,
        isCancellable: false
    });
    const modalController = useModalController(modalState, setModalState);

    //Load Map
    useEffect(() => {
        if (!mapElement.current) return;
        const location = new naver.maps.LatLng(37.5656, 126.9769);
        const mapOptions: naver.maps.MapOptions = {
            center: location,
            zoom: 8,
            zoomControl: true
        };
        setMap(new naver.maps.Map(mapElement.current, mapOptions));
        stationGeneratorService
            .getAllGenerators(abortController)
            .then((result) => {
                setGeneratorList(result);
            });
    }, []);

    //Load Markers
    useEffect(() => {
        if (!map || !generatorList || generatorList.length <= 0) return;
        generatorList.forEach((generator) => {
            const marker = new naver.maps.Marker({
                title: generator.generatorName,
                clickable: true,
                position: new naver.maps.LatLng(
                    Number.parseFloat(generator.latitude),
                    Number.parseFloat(generator.longitude)
                ),
                map: map
            });
            marker.addListener('click', () => {
                setSelectedGenerator(generator);
                setSelectedMarker((prev) => {
                    // @ts-ignore
                    prev?.setIcon(null);
                    // @ts-ignore
                    prev?.setAnimation(null);
                    marker.setIcon('./map_icon_selected.png');
                    marker.setAnimation(naver.maps.Animation.BOUNCE);
                    return marker;
                });
                map.panTo(marker.getPosition(), {
                    duration: 250,
                    easing: 'easeInCubic'
                });
            });
        });
        map?.refresh(true);
    }, [generatorList, map]);

    return (
        <ModalControllerContext.Provider value={modalController}>
            <ModalWindow
                isShowing={modalState.isShowing}
                cancellable={modalState.isCancellable}
                onDismiss={modalController.hideModal}
            >
                {modalState.content}
            </ModalWindow>
            <TopBar />
            <div className="page-content">
                <div className="flex flex-row justify-start items-start gap-16">
                    <div ref={mapElement} className="aspect-square flex-1" />
                    <div className="flex flex-col flex-1">
                        <GeneratorDetailsPane generator={selectedGenerator} />
                    </div>
                </div>
            </div>
        </ModalControllerContext.Provider>
    );
};

type GeneratorDetailsPaneProps = {
    generator?: Generator;
};
export const GeneratorDetailsPane = ({
    generator
}: GeneratorDetailsPaneProps) => {
    const [startDateTime, setStartDateTime] = useState(new Date('2022-03-08'));
    const [endDateTime, setEndDateTime] = useState(new Date('2022-03-10'));
    const weatherDataService = useWeatherDataService();
    const [weatherData, setWeatherData] = useState<string | undefined>(
        undefined
    );
    const [isRequestRunning, setIsRequestRunning] = useState(false);
    useEffect(() => {
        setWeatherData(undefined);
    }, [generator]);

    return (
        <>
            {generator && (
                <div className="flex flex-col p-5 gap-5">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            {generator.generatorName}
                        </h1>
                        <h3>{`${generator.stationAddress}`}</h3>
                    </div>
                    <div className="flex w-full gap-5">
                        <DateTimeDisplayButton
                            className="w-full"
                            labelText="시작시간"
                            dateTime={startDateTime}
                            onDateTimeChange={setStartDateTime}
                        />
                        <DateTimeDisplayButton
                            className="w-full"
                            labelText="종료시간"
                            dateTime={endDateTime}
                            onDateTimeChange={setEndDateTime}
                        />
                    </div>
                    <div className="flex w-full justify-center gap-5">
                        <GaussButton
                            text="JSON으로 받기"
                            enabled={!isRequestRunning}
                            onClick={() => {
                                setIsRequestRunning(true);
                                weatherDataService
                                    .getWeatherDataJson(
                                        generator.id!!.toString(),
                                        startDateTime,
                                        endDateTime,
                                        new AbortController()
                                    )
                                    .then((result) => {
                                        const resultString = JSON.stringify(
                                            result,
                                            null,
                                            '\t'
                                        );
                                        setWeatherData(resultString);
                                    })
                                    .finally(() => {
                                        setIsRequestRunning(false);
                                    });
                            }}
                        />
                        <GaussButton
                            text="CSV로 받기"
                            enabled={!isRequestRunning}
                            onClick={() => {
                                setIsRequestRunning(true);
                                weatherDataService
                                    .getWeatherDataCsv(
                                        generator.id!!.toString(),
                                        startDateTime,
                                        endDateTime,
                                        new AbortController()
                                    )
                                    .then((result) => {
                                        const resultString = JSON.stringify(
                                            result,
                                            null,
                                            '\t'
                                        );
                                        setWeatherData(
                                            resultString.replace('"', '')
                                        );
                                    })
                                    .finally(() => {
                                        setIsRequestRunning(false);
                                    });
                            }}
                        />
                    </div>
                    {isRequestRunning && (
                        <div className="w-full h-72 flex justify-center items-center">
                            <LoadingSpinner />
                        </div>
                    )}
                    {weatherData && !isRequestRunning && (
                        <div>
                            <textarea
                                className="w-full h-72 resize-none"
                                value={weatherData}
                                readOnly
                            />
                        </div>
                    )}
                </div>
            )}
        </>
    );
};
