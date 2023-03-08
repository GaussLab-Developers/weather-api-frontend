import { Variants } from 'framer-motion';

export const scaleVariants: Variants = {
    hidden: {
        scale: 0
    },
    visible: {
        scale: 1,
        transition: {
            duration: 0.2
        }
    },
    exit: {
        scale: 0,
        transition: {
            duration: 0.11
        }
    }
};
