// JS/parserWorker.js

self.onmessage = function (e) {
    const fileContent = e.data;
    const parts = [];
    const outlinePoints = [];
    let imageUrl = null;


    function manhattanDistance(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    let i = 0;
    while (i < fileContent.length) {
        let line = fileContent[i].trim();
        if (line.startsWith("IMAGE_URL")) {
            imageUrl = line.split(/\s+/)[1];
            i++;
            continue;
        }

        if (line.startsWith("PART_NAME")) {
            let tokens = line.split(/\s+/);
            let partName = tokens[1];
            // Inicializamos outline en el objeto part
            let part = {
                name: partName,
                pins: [],
                side: "T",
                nets: new Set(),
                outline: []
            };

            i++;
            while (i < fileContent.length && !fileContent[i].trim().startsWith("PART_END")) {
                let innerLine = fileContent[i].trim();

                if (innerLine.startsWith("PART_SIDE")) {
                    let tokensSide = innerLine.split(/\s+/);
                    part.side = tokensSide[1];
                }

                // Capturamos el PART_OUTLINE_RELATIVE
                if (innerLine.startsWith("PART_OUTLINE_RELATIVE")) {
                    const coords = innerLine
                        .replace('PART_OUTLINE_RELATIVE', '')
                        .trim()
                        .split(/\s+/)
                        .map(parseFloat);
                    for (let k = 0; k < coords.length; k += 2) {
                        part.outline.push({ x: coords[k], y: coords[k + 1] });
                    }
                }

                if (innerLine.startsWith("PIN_ID")) {
                    let pin = { outline: [] };
                    i++;
                    while (i < fileContent.length && !fileContent[i].trim().startsWith("PIN_END")) {
                        let pinLine = fileContent[i].trim();
                        let tokensPin = pinLine.split(/\s+/);

                        switch (tokensPin[0]) {
                            case "PIN_ORIGIN":
                                pin.x = parseFloat(tokensPin[1]);
                                pin.y = parseFloat(tokensPin[2]);
                                break;
                            case "PIN_RADIUS":
                                pin.radius = parseFloat(tokensPin[1]);
                                break;
                            case "PIN_NET":
                                pin.net = tokensPin.slice(1).join(" ");
                                part.nets.add(pin.net);
                                break;
                            case "PIN_NAME":
                                pin.name = tokensPin.slice(1).join(" ");
                                break;
                            case "PIN_TYPE":
                                pin.type = tokensPin.slice(1).join(" ");
                                break;
                            case "PIN_COMMENT":
                                pin.comment = tokensPin.slice(1).join(" ");
                                break;
                            case "PIN_OUTLINE_RELATIVE":
                                const pcoords = tokensPin.slice(1).map(parseFloat);
                                for (let k = 0; k < pcoords.length; k += 2) {
                                    pin.outline.push({ x: pcoords[k], y: pcoords[k + 1] });
                                }
                                break;
                            case "PIN_NUMBER":
                                pin.number = tokensPin[1];
                                break;
                        }

                        i++;
                    }

                    part.pins.push(pin);
                } else {
                    i++;
                }
            }

            part.nets = Array.from(part.nets);
            parts.push(part);

        } else if (line.startsWith("OUTLINE_SEGMENTED")) {
            let tokens = line.split(/\s+/).slice(1).map(parseFloat);
            let segments = [];

            for (let j = 0; j < tokens.length; j += 4) {
                segments.push({
                    start: { x: tokens[j], y: tokens[j + 1] },
                    end: { x: tokens[j + 2], y: tokens[j + 3] }
                });
            }

            let format = [];
            if (segments.length > 0) {
                let first = segments.shift();
                format.push(first.start, first.end);
                let startPoint = first.start;
                let endPoint = first.end;

                while (startPoint.x !== endPoint.x || startPoint.y !== endPoint.y) {
                    if (segments.length === 0) break;

                    let idx = segments.findIndex(seg =>
                        (seg.start.x === endPoint.x && seg.start.y === endPoint.y) ||
                        (seg.end.x === endPoint.x && seg.end.y === endPoint.y)
                    );

                    if (idx !== -1) {
                        let next = segments.splice(idx, 1)[0];
                        if (next.start.x === endPoint.x && next.start.y === endPoint.y) {
                            format.push(next.end);
                            endPoint = next.end;
                        } else {
                            format.push(next.start);
                            endPoint = next.start;
                        }
                        continue;
                    }

                    let closestIdx = 0;
                    let minDist = Infinity;
                    segments.forEach((seg, idx) => {
                        let d1 = manhattanDistance(endPoint, seg.start);
                        let d2 = manhattanDistance(endPoint, seg.end);
                        let d = Math.min(d1, d2);
                        if (d < minDist) {
                            minDist = d;
                            closestIdx = idx;
                        }
                    });

                    let closest = segments.splice(closestIdx, 1)[0];
                    let dStart = manhattanDistance(endPoint, closest.start);
                    let dEnd = manhattanDistance(endPoint, closest.end);

                    if (manhattanDistance(startPoint, closest.start) <= dStart &&
                        manhattanDistance(startPoint, closest.start) <= dEnd) {
                        format.push(startPoint);
                        endPoint = startPoint;
                        break;
                    }

                    if (dStart <= dEnd) {
                        format.push(closest.start, closest.end);
                        endPoint = closest.end;
                    } else {
                        format.push(closest.end, closest.start);
                        endPoint = closest.start;
                    }
                }
            }

            outlinePoints.push(...format);
            i++;
        } else {
            i++;
        }
    }
    self.postMessage({ parts, outlinePoints, imageUrl });
    //self.postMessage({ parts, outlinePoints });
};
