import { Variants } from 'framer-motion';

export const heightVariants: Variants = {
    hidden: {
        opacity: 0,
        height: 0
    },
    visible: {
        opacity: 1,
        height: 'auto',
        transition: {
            duration: 0.25
        }
    },
    exit: {
        opacity: 0,
        height: 0,
        transition: {
            duration: 0.15
        }
    }
};
