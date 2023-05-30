import { useEffect, useRef } from 'react';

function useEventListener<T extends Event>(
    eventName: string,
    handler: (event: T) => void,
    element: HTMLElement | Window = window
): void {
    const savedHandler = useRef<(event: T) => void>();

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const isSupported = element && element.addEventListener;
        if (!isSupported) return;

        const eventListener: EventListener = (event) => {
            if (savedHandler.current) savedHandler.current(event as T);
        };

        element.addEventListener(eventName, eventListener);

        return () => {
            element.removeEventListener(eventName, eventListener);
        };
    }, [eventName, element]);
}

export default useEventListener;

