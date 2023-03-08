import React, { ReactNode } from 'react';

export type ModalState = {
    isShowing: boolean;
    isCancellable: boolean;
    content?: ReactNode;
};

export type ModalController = {
    showModal: (element: ReactNode, cancellable: boolean) => void;
    hideModal: () => void;
};
export const useModalController = (
    modalState: ModalState,
    setModalState: React.Dispatch<React.SetStateAction<ModalState>>
) => {
    const showModal = (element: ReactNode, cancellable: boolean) => {
        setModalState({
            isShowing: true,
            isCancellable: cancellable,
            content: element
        });
    };
    const hideModal = () => {
        setModalState({
            isShowing: false,
            isCancellable: true,
            content: undefined
        });
    };
    return { showModal, hideModal };
};
