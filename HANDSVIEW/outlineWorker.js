// js/outlineWorker.js

self.onmessage = function (e) {
    const { outlinePoints, canvasWidth, canvasHeight } = e.data;

    let outlineWidth = 0;
    let scaleFactor = 1;
    let offsetX = 0;
    let offsetY = 0;

    if (outlinePoints.length > 0) {
        // Calcular outlineWidth (máxX - minX)
        let minX = outlinePoints[0].x;
        let maxX = outlinePoints[0].x;
        let minY = outlinePoints[0].y;
        let maxY = outlinePoints[0].y;

        for (let p of outlinePoints) {
            if (p.x < minX) minX = p.x;
            if (p.x > maxX) maxX = p.x;
            if (p.y < minY) minY = p.y;
            if (p.y > maxY) maxY = p.y;
        }

        outlineWidth = maxX - minX;

        const contWidth = maxX - minX;
        const contHeight = maxY - minY;
        const margen = 20;

        const factorX = (canvasWidth - 2 * margen) / contWidth;
        const factorY = (canvasHeight - 2 * margen) / contHeight;

        scaleFactor = Math.min(factorX, factorY);
        offsetX = margen - minX * scaleFactor + (canvasWidth - 2 * margen - contWidth * scaleFactor) / 2;
        offsetY = margen - minY * scaleFactor + (canvasHeight - 2 * margen - contHeight * scaleFactor) / 2;
    }

    self.postMessage({
        outlineWidth,
        scaleFactor,
        offsetX,
        offsetY
    });
};
