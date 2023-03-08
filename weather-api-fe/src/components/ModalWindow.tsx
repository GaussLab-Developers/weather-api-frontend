import React, { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeVariants } from '../animations/fadeVariants';
import { scaleVariants } from '../animations/scaleVariants';

type ModalWindowProps = {
    isShowing: boolean;
    cancellable: boolean;
    onDismiss?: () => void;
    children: ReactNode;
};
export const ModalWindow = ({
    isShowing,
    cancellable,
    onDismiss,
    children
}: ModalWindowProps) => {
    return (
        <AnimatePresence>
            {isShowing && (
                <div>
                    <motion.div
                        key="backdrop"
                        variants={fadeVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="backdrop"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (cancellable) onDismiss?.();
                        }}
                    >
                        <motion.div
                            key="modal"
                            variants={scaleVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="modal"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                        >
                            {children}
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
