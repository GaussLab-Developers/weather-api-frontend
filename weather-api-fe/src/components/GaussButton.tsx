import React from 'react';

type GaussButtonProps = {
    className?: string;
    text: string;
    enabled?: boolean;
    onClick: () => void;
};
export const GaussButton = ({
    className,
    text,
    enabled = true,
    onClick
}: GaussButtonProps) => {
    return (
        <>
            {enabled && (
                <div
                    className={`${className} gauss-button`}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onClick();
                    }}
                >
                    {text}
                </div>
            )}
            {!enabled && <div className={`gauss-button-disabled`}>{text}</div>}
        </>
    );
};
