// js/netWorker.js

self.onmessage = function (e) {
    const { parts, selectedNet, displayMode, bottomOffset } = e.data;

    let connectedPins = [];

    for (let part of parts) {
        let groupOffset = (displayMode === "all" && part.side === "B") ? bottomOffset : 0;

        for (let pin of part.pins) {
            if (pin.net === selectedNet) {
                connectedPins.push({
                    x: pin.x + groupOffset,
                    y: pin.y
                });
            }
        }
    }

    // Ordenar por X, luego por Y
    connectedPins.sort((a, b) => a.x - b.x || a.y - b.y);

    let lines = [];

    for (let i = 0; i < connectedPins.length - 1; i++) {
        const a = connectedPins[i];
        const b = connectedPins[i + 1];

        // Líneas en forma de "L"
        lines.push({ x1: a.x, y1: a.y, x2: b.x, y2: a.y }); // horizontal
        lines.push({ x1: b.x, y1: a.y, x2: b.x, y2: b.y }); // vertical
        
    }

    self.postMessage({ lines });
};
