import type {Variants} from 'framer-motion';

// fadeIn function
export const fadeIn = (direction: string) => {
    return {
        hidden: {
            y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
            opacity: 0,
            x: direction === 'left' ? 80 : direction === 'right' ? -80 : 0,
        },
        show: {
            y: 0,
            x: 0,
            opacity: 1,
            transition: {
                type: 'tween',
                duration: 1.5,
                ease: [0.25, 0.25, 0.25, 0.75],
            },
        },
    };
};

export const getContainerVariants = (): Variants => ({
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.3,
        },
    },
});

export const getItemVariants = (): Variants => ({
    hidden: {
        opacity: 0,
        y: -50,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
});

export const slideVariants = {
    enter: (direction: number) => ({
        opacity: 0,
        x: direction > 0 ? 300 : -300, // New testimonial comes from the right on "next" or from the left on "prev"
    }),
    center: {
        opacity: 1,
        x: 0,
    },
    exit: (direction: number) => ({
        opacity: 0,
        x: direction > 0 ? -300 : 300, // Exiting testimonial leaves in opposite direction
    }),
};