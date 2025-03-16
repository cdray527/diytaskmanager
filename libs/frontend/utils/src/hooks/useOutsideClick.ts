import { useEffect } from 'react';

const useOutsideClick = (ref: any, callback: () => void) => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('touchstart', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('touchstart', handleClick);
        };
    }, [ref, callback]);
};

export default useOutsideClick;
