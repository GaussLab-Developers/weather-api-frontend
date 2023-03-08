import { Variants } from 'framer-motion';

export const pageVariants: Variants = {
    hidden: {
        // x: '150%',
        opacity: 0,
        transition: { type: 'tween' }
    },
    visible: {
        // x: 0,
        opacity: 1,
        transition: { type: 'tween', duration: 0.2 }
    },
    exit: {
        x: '-150%',
        opacity: 0,
        transition: { type: 'tween', duration: 0.1 }
    }
};
