import { ModalController } from '../hooks/useModalController';
import { createContext } from 'react';

export const ModalControllerContext = createContext<ModalController>(
    {} as ModalController
);
