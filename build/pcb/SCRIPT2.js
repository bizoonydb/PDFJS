// Variables globales
let fileContent;
let parts = [];
let outlinePoints = [];

// Variables para transformación global
let scaleFactor = 1;
let rotationAngle = Math.PI; // Inicialmente 180° (en radianes)
let offsetX = 0;
let offsetY = 0;
let pinScaleFactor = 1; // Ajusta según lo necesites

// Buffer para renderizar el contorno (elemento estático)
let buffer;

// Modo de visualización: "all", "top" o "bottom"
let displayMode = "all";

// Variables para interacción
let tooltip = null;       // Información detallada del pin (tooltip)
let selectedPin = null;   // Pin seleccionado

// Desplazamiento horizontal para separar componentes TOP y BOTTOM cuando se muestran juntos
let bottomOffset = 0;

//////////////////////////
// PRELOAD y SETUP
//////////////////////////

function preload() {
    // Obtenha parâmetros de URL
    let params = getURLParams();
    // Se o parâmetro fileLink existir, use o valor diretamente, caso contrário, use um valor padrão
    let fileURL = params.fileLink ? params.fileLink : 'https://raw.githubusercontent.com/bizoonydb/digital-board/main/a10-pcb.bvr';
    
    // Faça o upload do arquivo usando o URL diretamente (sem codificação)
    fileContent = loadStrings(fileURL);
}

function setup() {
    let canvasWidth = min(1600, windowWidth);
    let canvasHeight = min(800, windowHeight);
    createCanvas(canvasWidth, canvasHeight);
    parseFile();
    calcularTransformacion();
    buffer = createGraphics(width, height);
    renderBuffer();

    // Configurar botones
    select('#btnAll').mousePressed(() => {
        displayMode = "all";
    });
    select('#btnTop').mousePressed(() => {
        displayMode = "top";
    });
    select('#btnBottom').mousePressed(() => {
        displayMode = "bottom";
    });
    select('#btnNextNet').mousePressed(() => {
        moveToNextPinInNet();
    });
    // Botón para rotar 90° cada click
    select('#btnRotate').mousePressed(() => {
        rotationAngle += Math.PI / 2;
    });

    fillComponentDatalist();
    setupSearchListener();
}

//////////////////////////
// DIBUJO
//////////////////////////

function draw() {
    background(0);

    push();
    // T1: Rotación global centrada en el canvas
    translate(width / 2, height / 2);
    rotate(rotationAngle);
    translate(-width / 2, -height / 2);

    if (displayMode === "all") {
        bottomOffset = computeBottomOffset();
    }

    push();
    // T2: Traslación y escalado
    translate(offsetX, offsetY);
    scale(scaleFactor);

    // Dibujar el buffer (puedes agregar el contorno si lo deseas)
    image(buffer, 0, 0);

    // Dibujar pines
    for (let part of parts) {
        if (displayMode === "top" && part.side !== "T") continue;
        if (displayMode === "bottom" && part.side !== "B") continue;
        let groupOffset = (displayMode === "all" && part.side === "B") ? bottomOffset : 0;
        for (let pin of part.pins) {
            noStroke();
            if (selectedPin === pin) {
                fill(0, 0, 255);
            } else if (selectedPin && pin.net === selectedPin.net) {
                fill(0, 255, 0);
            } else if (pin.net === "GND") {
                fill(150, 150, 150);
            } else {
                fill(255, 0, 0);
            }
            ellipse(pin.x + groupOffset, pin.y, pin.radius, pin.radius);
        }
    }

    drawSelectedNetConnections();
    drawComponentBoundingBoxes();
    drawPartNames();

    pop(); // Fin T2
    pop(); // Fin T1

    // Dibujar el tooltip sin transformaciones para que el texto esté "derecho"
    drawTooltip();
}

//////////////////////////
// FUNCIONES DE CONVERSIÓN
//////////////////////////

// Convierte coordenadas de pantalla (mouse) a coordenadas del "mundo"
// Invirtiendo la transformación: T = T1 * T2, donde T1 es la rotación global y T2 la traslación+escala.
function screenToWorld(mx, my) {
    // Invertir T1:
    let cx = width / 2;
    let cy = height / 2;
    let p = createVector(mx, my);
    p.sub(createVector(cx, cy));
    let angle = -rotationAngle;
    let cosA = Math.cos(angle);
    let sinA = Math.sin(angle);
    let xRot = p.x * cosA - p.y * sinA;
    let yRot = p.x * sinA + p.y * cosA;
    p.set(xRot, yRot);
    p.add(createVector(cx, cy));
    // Invertir T2:
    p.x = (p.x - offsetX) / scaleFactor;
    p.y = (p.y - offsetY) / scaleFactor;
    return { x: p.x, y: p.y };
}

// Convierte coordenadas del mundo a pantalla aplicando T2 y T1
function worldToScreen(wx, wy) {
    let p = createVector(wx, wy);
    // Aplicar T2: Escalado y traslación
    p.x = p.x * scaleFactor + offsetX;
    p.y = p.y * scaleFactor + offsetY;
    // Aplicar T1: Rotación global
    let cx = width / 2;
    let cy = height / 2;
    p.sub(createVector(cx, cy));
    let cosA = Math.cos(rotationAngle);
    let sinA = Math.sin(rotationAngle);
    let xRot = p.x * cosA - p.y * sinA;
    let yRot = p.x * sinA + p.y * cosA;
    p.set(xRot, yRot);
    p.add(createVector(cx, cy));
    return { x: p.x, y: p.y };
}

//////////////////////////
// INTERACCIÓN
//////////////////////////

// Dibujar el tooltip "derecho" (sin rotación ni escala)
function drawTooltip() {
    if (tooltip) {
        let screenPos = worldToScreen(tooltip.x, tooltip.y);
        push();
        resetMatrix(); // Resetea las transformaciones para dibujar el texto sin afectar
        textAlign(LEFT, TOP);
        textSize(14);
        noStroke();
        let padding = 4;
        let txt = tooltip.text;
        let txtWidth = textWidth(txt);
        fill(255, 255, 220, 200);
        rect(screenPos.x, screenPos.y - 20, txtWidth + padding * 2, 40, 4);
        fill(0);
        text(txt, screenPos.x + padding, screenPos.y - 20 + padding);
        pop();
    }
}

// Detecta el click convirtiendo las coordenadas de pantalla a mundo
function mousePressed() {
    let worldPos = screenToWorld(mouseX, mouseY);
    let mx = worldPos.x;
    let my = worldPos.y;
    let found = false;
    for (let part of parts) {
        if (displayMode === "top" && part.side !== "T") continue;
        if (displayMode === "bottom" && part.side !== "B") continue;
        let groupOffset = (displayMode === "all" && part.side === "B") ? bottomOffset : 0;
        for (let pin of part.pins) {
            if (pin.net === "GND") continue;
            let d = dist(mx, my, pin.x + groupOffset, pin.y);
            if (d <= pin.radius) {
                tooltip = {
                    text: `Parte: ${part.name}\nNet: ${pin.net}`,
                    x: pin.x,
                    y: pin.y,
                    side: part.side
                };
                selectedPin = pin;
                found = true;
                return false;
            }
        }
    }
    if (!found) {
        tooltip = null;
    }
    return false;
}

// Arrastre (drag) basado en la diferencia en coordenadas "mundo"
// Se calcula la diferencia entre la posición actual y la anterior (convertidas a mundo)
function mouseDragged() {

    if (mouseButton === LEFT || mouseButton === RIGHT) {

        // Cambia el cursor a "grabbing" mientras se arrastra
        cursor('grabbing');
        let worldCurrent = screenToWorld(mouseX, mouseY);
        let worldPrev = screenToWorld(pmouseX, pmouseY);
        let dw = createVector(worldCurrent.x - worldPrev.x, worldCurrent.y - worldPrev.y);
        // Como offset se aplica después del escalado, se actualiza en coordenadas de pantalla
        offsetX += dw.x * scaleFactor;
        offsetY += dw.y * scaleFactor;
        renderBuffer();
        return false;
    }
}

function mouseReleased() {
    // Al soltar, se restaura el cursor por defecto
    cursor('default');
}

// Zoom centrado en el cursor
function mouseWheel(event) {
    // Obtener la posición del mouse en coordenadas del mundo antes del zoom
    let worldBefore = screenToWorld(mouseX, mouseY);

    // Determinar el factor de zoom (ajusta según tu preferencia)
    let zoomFactor = event.delta > 0 ? 0.9 : 1.1;
    scaleFactor *= zoomFactor;

    // Centro del canvas (usado en la rotación global)
    let cx = width / 2;
    let cy = height / 2;

    // Calcular el vector desde el centro hasta la posición del mouse en pantalla
    let vScreen = createVector(mouseX - cx, mouseY - cy);

    // Invertir la rotación global para obtener la posición "sin rotar"
    let cosA = Math.cos(-rotationAngle);
    let sinA = Math.sin(-rotationAngle);
    let vUnrotated = createVector(
        vScreen.x * cosA - vScreen.y * sinA,
        vScreen.x * sinA + vScreen.y * cosA
    );

    // Recalcular offset de modo que el punto worldBefore se mapee al mouse actual:
    offsetX = cx + vUnrotated.x - worldBefore.x * scaleFactor;
    offsetY = cy + vUnrotated.y - worldBefore.y * scaleFactor;

    return false;
}



//////////////////////////
// OTRAS FUNCIONES (Parseo, etc.)
//////////////////////////

// Renderiza el buffer; aquí puedes dibujar elementos estáticos como contornos.
function renderBuffer() {
    buffer.clear();
    buffer.push();
    buffer.translate(offsetX, offsetY);
    buffer.scale(scaleFactor);
    // Ejemplo: dibujar contorno (descomenta si lo necesitas)
    // buffer.stroke(139, 69, 19);
    // buffer.noFill();
    // buffer.beginShape();
    // for (let p of outlinePoints) {
    //   buffer.vertex(p.x, p.y);
    // }
    // buffer.endShape(CLOSE);
    buffer.pop();
}

// Calcula la transformación global basándose en outlinePoints
function calcularTransformacion() {
    if (outlinePoints.length === 0) return;
    let minX = outlinePoints[0].x, maxX = outlinePoints[0].x;
    let minY = outlinePoints[0].y, maxY = outlinePoints[0].y;
    for (let p of outlinePoints) {
        if (p.x < minX) minX = p.x;
        if (p.x > maxX) maxX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.y > maxY) maxY = p.y;
    }
    let contWidth = maxX - minX;
    let contHeight = maxY - minY;
    let margen = 20;
    let factorX = (width - 2 * margen) / contWidth;
    let factorY = (height - 2 * margen) / contHeight;
    scaleFactor = Math.min(factorX, factorY);
    offsetX = margen - minX * scaleFactor + (width - 2 * margen - contWidth * scaleFactor) / 2;
    offsetY = margen - minY * scaleFactor + (height - 2 * margen - contHeight * scaleFactor) / 2;
}

// Calcula el desplazamiento horizontal para componentes del lado inferior en modo "all"
function computeBottomOffset() {
    let topMinX = Infinity, topMaxX = -Infinity;
    for (let part of parts) {
        if (part.side === "T") {
            for (let pin of part.pins) {
                let r = pin.radius;
                if (pin.x - r < topMinX) topMinX = pin.x - r;
                if (pin.x + r > topMaxX) topMaxX = pin.x + r;
            }
        }
    }
    return (topMaxX - topMinX) + 50;
}

function drawSelectedNetConnections() {
    if (!selectedPin) return;
    push();
    strokeWeight(1);
    stroke(30, 30, 255);
    for (let part of parts) {
        let groupOffset = (displayMode === "all" && part.side === "B") ? bottomOffset : 0;
        for (let pin of part.pins) {
            if (pin !== selectedPin && pin.net === selectedPin.net) {
                line(selectedPin.x, selectedPin.y, pin.x + groupOffset, pin.y);
            }
        }
    }
    pop();
}

function drawComponentBoundingBoxes() {
    for (let part of parts) {
        if (displayMode === "top" && part.side !== "T") continue;
        if (displayMode === "bottom" && part.side !== "B") continue;
        let groupOffset = (displayMode === "all" && part.side === "B") ? bottomOffset : 0;
        if (part.pins.length > 0) {
            let minX = Infinity, minY = Infinity;
            let maxX = -Infinity, maxY = -Infinity;
            for (let pin of part.pins) {
                let r = pin.radius * 0.6;
                if (pin.x - r < minX) minX = pin.x - r;
                if (pin.x + r > maxX) maxX = pin.x + r;
                if (pin.y - r < minY) minY = pin.y - r;
                if (pin.y + r > maxY) maxY = pin.y + r;
            }
            noFill();
            stroke(0, 0, 255);
            rect(minX + groupOffset, minY, maxX - minX, maxY - minY);
        }
    }
}

function drawPartNames() {
    if (scaleFactor < 1.5) return;
    for (let part of parts) {
        if (displayMode === "top" && part.side !== "T") continue;
        if (displayMode === "bottom" && part.side !== "B") continue;
        if (part.pins.length > 0) {
            let groupOffset = (displayMode === "all" && part.side === "B") ? bottomOffset : 0;
            let sumX = 0, sumY = 0;
            for (let pin of part.pins) {
                sumX += pin.x;
                sumY += pin.y;
            }
            let centerX = sumX / part.pins.length + groupOffset;
            let centerY = sumY / part.pins.length;
            push();
            textAlign(CENTER, CENTER);
            textSize(8);
            fill(0);
            noStroke();
            text(part.name, centerX, centerY);
            pop();
        }
    }
}

function parseFile() {
    let i = 0;
    while (i < fileContent.length) {
        let line = fileContent[i].trim();
        if (line.startsWith("PART_NAME")) {
            let tokens = line.split(/\s+/);
            let partName = tokens[1];
            let part = { name: partName, pins: [] };
            i++;
            while (i < fileContent.length && !fileContent[i].trim().startsWith("PART_END")) {
                let innerLine = fileContent[i].trim();
                if (innerLine.startsWith("PART_SIDE")) {
                    let tokensSide = innerLine.split(/\s+/);
                    part.side = tokensSide[1]; // "T" o "B"
                }
                if (innerLine.startsWith("PIN_ID")) {
                    let pin = {};
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
                                break;
                        }
                        i++;
                    }
                    part.pins.push(pin);
                } else {
                    i++;
                }
            }
            parts.push(part);
        } else if (line.startsWith("OUTLINE_SEGMENTED")) {
            let tokens = line.split(/\s+/);
            tokens.shift();
            for (let j = 0; j < tokens.length; j += 2) {
                let x = parseFloat(tokens[j]);
                let y = parseFloat(tokens[j + 1]);
                outlinePoints.push({ x, y });
            }
            i++;
        } else {
            i++;
        }
    }
}

function fillComponentDatalist() {
    let componentList = select('#componentList');
    let namesSet = new Set();
    for (let part of parts) {
        namesSet.add(part.name);
    }
    let namesArray = Array.from(namesSet);
    namesArray.sort();
    componentList.html('');
    for (let name of namesArray) {
        let option = createElement('option', name);
        option.attribute('value', name);
        option.parent(componentList);
    }
}

function centerOnComponent(componentName) {
    let foundPart = parts.find(
        (part) => part.name.toLowerCase() === componentName.toLowerCase()
    );
    if (foundPart && foundPart.pins.length > 0) {
        if (displayMode !== "all") {
            if (foundPart.side === "T" && displayMode !== "top") {
                displayMode = "top";
            } else if (foundPart.side === "B" && displayMode !== "bottom") {
                displayMode = "bottom";
            }
        }
        let sumX = 0,
            sumY = 0;
        for (let pin of foundPart.pins) {
            sumX += pin.x;
            sumY += pin.y;
        }
        let centerX = sumX / foundPart.pins.length;
        let centerY = sumY / foundPart.pins.length;
        let groupOffset = 0;
        if (displayMode === "all" && foundPart.side === "B") {
            groupOffset = computeBottomOffset();
        }
        offsetX = width / 2 - (centerX + groupOffset) * scaleFactor;
        offsetY = height / 2 - centerY * scaleFactor;
        tooltip = {
            text: `Componente: ${foundPart.name}`,
            x: centerX,
            y: centerY,
            side: foundPart.side,
        };
        selectedPin = foundPart.pins[0];
        renderBuffer();
    } else {
        console.log("Componente no encontrado: " + componentName);
    }
}

function setupSearchListener() {
    let searchInput = select('#searchComponent');
    searchInput.changed(() => {
        let searchTerm = searchInput.value().trim();
        if (searchTerm !== "") {
            centerOnComponent(searchTerm);
        }
    });
}

function moveToNextPinInNet() {
    if (!selectedPin) return;
    let sameNetPins = [];
    for (let part of parts) {
        for (let pin of part.pins) {
            if (pin.net === selectedPin.net) {
                sameNetPins.push({ pin, partSide: part.side, partName: part.name });
            }
        }
    }
    if (sameNetPins.length > 1) {
        let currentIndex = sameNetPins.findIndex(
            (item) => item.pin === selectedPin
        );
        let nextIndex = (currentIndex + 1) % sameNetPins.length;
        let nextItem = sameNetPins[nextIndex];
        if (displayMode !== "all") {
            if (nextItem.partSide === "T" && displayMode !== "top") {
                displayMode = "top";
            } else if (nextItem.partSide === "B" && displayMode !== "bottom") {
                displayMode = "bottom";
            }
        }
        let groupOffset =
            displayMode === "all" && nextItem.partSide === "B" ? bottomOffset : 0;
        selectedPin = nextItem.pin;
        tooltip = {
            text: `Parte: ${nextItem.partName}\nNet: ${nextItem.pin.net}`,
            x: nextItem.pin.x,
            y: nextItem.pin.y,
            side: nextItem.partSide,
        };
        offsetX = width / 2 - (selectedPin.x + groupOffset) * scaleFactor;
        offsetY = height / 2 - selectedPin.y * scaleFactor;
        renderBuffer();
    }
}
