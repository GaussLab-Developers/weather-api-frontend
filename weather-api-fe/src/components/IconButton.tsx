import React, { ReactNode } from 'react';

type IconButtonProps = {
    icon: ReactNode;
    onClick: () => void;
};
export const IconButton = ({ icon, onClick }: IconButtonProps) => {
    return (
        <div
            className="icon-button-animated"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClick();
            }}
        >
            {icon}
        </div>
    );
};
