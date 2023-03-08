import React from 'react';

type DateTimeInputFieldProps = {
    className?: string;
    value: string;
    suffixLabelText?: string;
    onChange: (value: string) => void;
};

export const DateTimeInputField = ({
    className,
    value,
    suffixLabelText,
    onChange
}: DateTimeInputFieldProps) => {
    return (
        <div className={`${className} flex gap-0.5 items-baseline`}>
            <div className="bg-button-gradient rounded-lg transition-all p-[0.075rem]">
                <input
                    className="datetime-input-field"
                    draggable={false}
                    onDragStart={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    value={value}
                    onFocus={(e) => {
                        e.target.select();
                    }}
                    onChange={(e) => {
                        e.preventDefault();
                        onChange(e.target.value);
                    }}
                />
            </div>
            {suffixLabelText && (
                <label className="text-tertiary-light">{suffixLabelText}</label>
            )}
        </div>
    );
};
