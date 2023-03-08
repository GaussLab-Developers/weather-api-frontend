import React from 'react';
import logo from '../assets/logo.png';
import bannerText from '../assets/text_darkblue.png';

type TopBarProps = {};

export const TopBar = ({}: TopBarProps) => {
    return (
        <div className="w-full h-20 shadow py-3 px-6 flex justify-between items-center">
            <div className="flex h-full">
                <img src={logo} className="h-full py-1" alt="logo" />
                <img src={bannerText} className="h-full py-5 pl-3" />
                <h1 className="self-center ml-3 text-3xl font-semibold text-secondary-standard">
                    Weather
                </h1>
            </div>
            <NavLinks />
        </div>
    );
};

export const NavLinks = () => {
    return (
        <div className="flex justify-between items-center gap-6">
            <h3 className="text-lg font-semibold hover:text-secondary-standard hover:cursor-pointer">
                Map
            </h3>
            <h3
                className="text-lg font-semibold hover:text-secondary-standard hover:cursor-pointer"
                onClick={(e) => {
                    e.preventDefault();
                    alert('아직 없음');
                }}
            >
                API Docs
            </h3>
        </div>
    );
};
