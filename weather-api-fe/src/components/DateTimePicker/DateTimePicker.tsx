import React, { useState } from 'react';
import { GaussButton } from '../GaussButton';
import { DateTimeInputField } from './DateTimeInputField';

type DateTimePickerProps = {
    title: string;
    onDateTimeSelect: (date: Date) => void;
    onCancel: () => void;
    initValue?: Date;
    minYear?: number;
    maxYear?: number;
};

export const DateTimePicker = ({
    title,
    onDateTimeSelect,
    onCancel,
    initValue,
    minYear = 1900,
    maxYear = 2100
}: DateTimePickerProps) => {
    const initDate = initValue ? initValue : new Date(Date.now());
    if (!initValue) initDate.setHours(9, 30, 0, 0);

    const [selectedYear, setSelectedYear] = useState<string>(
        initDate.getFullYear().toString()
    );
    const [selectedMonth, setSelectedMonth] = useState<string>(
        (initDate.getMonth() + 1).toString()
    );
    const [selectedDay, setSelectedDay] = useState<string>(
        initDate.getDate().toString()
    );
    const [selectedHour, setSelectedHour] = useState<string>(
        initDate.getHours().toString()
    );
    const [selectedMinute, setSelectedMinute] = useState<string>(
        initDate.getMinutes().toString()
    );
    const isInputValid = () => {
        const year = Number.parseInt(selectedYear.trim());
        const month = Number.parseInt(selectedMonth.trim());
        const day = Number.parseInt(selectedDay.trim());
        const hour = Number.parseInt(selectedHour.trim());
        const minute = Number.parseInt(selectedMinute.trim());

        if (
            isNaN(year) ||
            isNaN(month) ||
            isNaN(day) ||
            isNaN(hour) ||
            isNaN(minute)
        )
            return false;
        if (year < minYear || year > maxYear) return false;
        if (month <= 0 || month > 12) return false;
        if (day <= 0 || day > 31) return false;
        if (hour < 0 || hour > 23) return false;
        if (minute < 0 || minute > 59) return false;
        return true;
    };

    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-xl">{title}</h1>
            <div className="flex flex-col gap-3 px-2">
                <div className="flex justify-end gap-5">
                    <DateTimeInputField
                        suffixLabelText="년"
                        value={selectedYear}
                        onChange={setSelectedYear}
                    />
                    <DateTimeInputField
                        suffixLabelText="월"
                        value={selectedMonth}
                        onChange={setSelectedMonth}
                    />
                    <DateTimeInputField
                        suffixLabelText="일"
                        value={selectedDay}
                        onChange={setSelectedDay}
                    />
                </div>
                <div className="flex justify-end gap-5">
                    <DateTimeInputField
                        suffixLabelText="시"
                        value={selectedHour}
                        onChange={setSelectedHour}
                    />
                    <DateTimeInputField
                        suffixLabelText="분"
                        value={selectedMinute}
                        onChange={setSelectedMinute}
                    />
                </div>
            </div>
            <div className="flex justify-evenly gap-5">
                <GaussButton
                    text="저장"
                    enabled={isInputValid()}
                    onClick={() => {
                        const year = Number.parseInt(selectedYear.trim());
                        const month = Number.parseInt(selectedMonth.trim()) - 1;
                        const day = Number.parseInt(selectedDay.trim());
                        const hour = Number.parseInt(selectedHour.trim());
                        const minute = Number.parseInt(selectedMinute.trim());
                        onDateTimeSelect(
                            new Date(year, month, day, hour, minute, 0, 0)
                        );
                    }}
                />
                <GaussButton text="취소" onClick={onCancel} />
            </div>
        </div>
    );
};

type DatePickerProps = {
    title: string;
    onDateSelect: (date: Date) => void;
    onCancel: () => void;
    initValue: Date;
    minYear?: number;
    maxYear?: number;
};
export const DatePicker = ({
    title,
    onDateSelect,
    onCancel,
    initValue,
    minYear = 1900,
    maxYear = 2100
}: DatePickerProps) => {
    const initDate = initValue ? initValue : new Date(Date.now());

    const [selectedYear, setSelectedYear] = useState<string>(
        initDate.getFullYear().toString()
    );
    const [selectedMonth, setSelectedMonth] = useState<string>(
        (initDate.getMonth() + 1).toString()
    );
    const [selectedDay, setSelectedDay] = useState<string>(
        initDate.getDate().toString()
    );
    const isInputValid = () => {
        const year = Number.parseInt(selectedYear.trim());
        const month = Number.parseInt(selectedMonth.trim());
        const day = Number.parseInt(selectedDay.trim());
        let toReturn = true;
        if (isNaN(year) || isNaN(month) || isNaN(day)) toReturn = false;
        if (year < minYear || year > maxYear) toReturn = false;
        if (month <= 0 || month > 12) toReturn = false;
        if (day <= 0 || day > 31) toReturn = false;
        return toReturn;
    };

    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-xl">{title}</h1>
            <div className="flex flex-col gap-4">
                <div className="flex justify-evenly gap-5">
                    <DateTimeInputField
                        suffixLabelText="년"
                        value={selectedYear}
                        onChange={setSelectedYear}
                    />
                    <DateTimeInputField
                        suffixLabelText="월"
                        value={selectedMonth}
                        onChange={setSelectedMonth}
                    />
                    <DateTimeInputField
                        suffixLabelText="일"
                        value={selectedDay}
                        onChange={setSelectedDay}
                    />
                </div>
            </div>
            <div className="flex justify-evenly gap-5">
                <GaussButton
                    text="저장"
                    enabled={isInputValid()}
                    onClick={() => {
                        const year = Number.parseInt(selectedYear.trim());
                        const month = Number.parseInt(selectedMonth.trim()) - 1;
                        const day = Number.parseInt(selectedDay.trim());
                        onDateSelect(new Date(year, month, day, 0, 0, 0, 0));
                    }}
                />
                <GaussButton text="취소" onClick={onCancel} />
            </div>
        </div>
    );
};
