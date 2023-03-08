import React, { useContext } from 'react';
import { DateParser } from '../../util/DateParser';
import { IconButton } from '../IconButton';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import { DatePicker, DateTimePicker } from './DateTimePicker';
import { ModalControllerContext } from '../../contexts/ModalControllerContext';

type DateTimeDisplayButtonProps = {
    className?: string;
    labelText: string;
    dateTime: Date;
    onDateTimeChange: (date: Date) => void;
};

export const DateTimeDisplayButton = ({
    className,
    labelText,
    dateTime,
    onDateTimeChange
}: DateTimeDisplayButtonProps) => {
    const modalController = useContext(ModalControllerContext);
    return (
        <div
            className={`${className} flex flex-col min-w-fit gap-1 flex-nowrap`}
        >
            <label className="text-sm font-semibold text-tertiary-standard">
                {labelText}
            </label>
            <div className="w-full flex py-2 px-4 rounded shadow border border-primary-standard gap-10 items-center justify-center min-w-fit whitespace-nowrap bg-white">
                <div className="flex flex-col items-end justify-center min-w-fit flex-nowrap">
                    <p>{`(${DateParser.getKoreanDay(
                        dateTime.getDay()
                    )}) ${dateTime.getFullYear()}-${
                        dateTime.getMonth() + 1
                    }-${dateTime.getDate()}`}</p>
                    <p>{`${dateTime.getHours()}시 ${dateTime.getMinutes()}분`}</p>
                </div>
                <IconButton
                    icon={<CalendarDaysIcon />}
                    onClick={() => {
                        modalController.showModal(
                            <DateTimePicker
                                title={labelText}
                                initValue={dateTime}
                                onDateTimeSelect={(date) => {
                                    onDateTimeChange(date);
                                    modalController.hideModal();
                                }}
                                onCancel={modalController.hideModal}
                            />,
                            true
                        );
                    }}
                />
            </div>
        </div>
    );
};

type DateDisplayButtonProps = {
    className?: string;
    labelText: string;
    date: Date;
    onDateChange: (date: Date) => void;
};

export const DateDisplayButton = ({
    className,
    labelText,
    date,
    onDateChange
}: DateDisplayButtonProps) => {
    const modalController = useContext(ModalControllerContext);
    return (
        <div className={`${className} flex flex-col min-w-fit flex-nowrap`}>
            <label className="label">{labelText}</label>
            <div className="w-full flex py-2 px-4 rounded shadow border border-primary-standard gap-10 items-center justify-center min-w-fit whitespace-nowrap bg-white">
                <div className="flex flex-col items-end justify-center min-w-fit flex-nowrap">
                    <p>{`(${DateParser.getKoreanDay(
                        date.getDay()
                    )}) ${date.getFullYear()}-${
                        date.getMonth() + 1
                    }-${date.getDate()}`}</p>
                </div>
                <IconButton
                    icon={<CalendarDaysIcon />}
                    onClick={() => {
                        modalController.showModal(
                            <DatePicker
                                title={labelText}
                                initValue={date}
                                onDateSelect={(date) => {
                                    onDateChange(date);
                                    modalController.hideModal();
                                }}
                                onCancel={modalController.hideModal}
                            />,
                            true
                        );
                    }}
                />
            </div>
        </div>
    );
};
