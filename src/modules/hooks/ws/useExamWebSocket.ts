import { useEffect, useRef } from 'react';

export function useExamWebSocket(wsUrl?: string) {
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (!wsUrl) return;

        const ws = new WebSocket(wsUrl);
        socketRef.current = ws;

        ws.onopen = () => {
            console.log('[WS] Connected');
        };

        ws.onclose = () => {
            console.log('[WS] Disconnected');
        };

        ws.onerror = err => {
            console.error('[WS] Error', err);
        };

        ws.onmessage = msg => {
            console.log('[WS] Message:', msg.data);
        };

        return () => {
            ws.close();
            socketRef.current = null;
        };
    }, [wsUrl]);
    return {};
}
