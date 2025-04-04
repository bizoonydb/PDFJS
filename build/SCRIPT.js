// Variables globales
let fileContent;
let parts = [];
let outlinePoints = [];
let flipHorizontal = true; // Estado del reflejo
// Variables para transformación global
let scaleFactor = 1;
let rotationAngle = Math.PI; // Inicialmente 180° (en radianes)
let offsetX = 0;
let offsetY = 0;
let pinScaleFactor = 1; // Ajusta según lo necesites //1

// Buffer para renderizar el contorno (elemento estático)
let buffer;

// Modo de visualización: "all", "top" o "bottom"
let displayMode = "top";

// Variables para interacción
let tooltip = null;       // Información detallada del pin (tooltip)
let selectedPin = null;   // Pin seleccionado

// Desplazamiento horizontal para separar componentes TOP y BOTTOM cuando se muestran juntos
let bottomOffset = 0;

//////////////////////////
// PRELOAD y SETUP
//////////////////////////
 
 function setup() {
         // Define o tamanho do canvas para ocupar toda a tela
         let canvasWidth = windowWidth; // Largura do canvas igual à largura da janela
         let canvasHeight = windowHeight; // Altura do canvas igual à altura da janela
         createCanvas(canvasWidth, canvasHeight);
         
         // Chamadas das funções após a criação do canvas
         parseFile();
         frameRate(20); // Limita la velocidad de fotogramas a 20 FPS mientras mas usa mas recurso util para pc de bajo recursos
    
         buffer = createGraphics(width, height); // Usando o tamanho do canvas
         renderBuffer();
     
         calcularTransformacion();
        
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
    document.getElementById("flipButton").addEventListener("click", () => {
        flipHorizontal = !flipHorizontal;
    });

    let searchInput = document.getElementById("searchComponent");

    searchInput.addEventListener("mousedown", (event) => {
        event.stopPropagation(); // Evita que p5.js intercepte el evento
    });


    fillComponentDatalist();
    setupSearchListener();

}
 
 //////////////////////////
 // DIBUJO
 //////////////////////////
 
 let blinkState = 0;  // Controla o estado de piscamento
 let blinkInterval = 15;  // Intervalo em frames para alternar as cores (ajuste conforme necessário)
 
 function draw() {
    background(0);
    

    // T1: Rotação global centrada no canvas
    push(); // T1: Rotación global centrada en el canvas
    translate(width / 2, height / 2);
    rotate(rotationAngle);
    translate(-width / 2, -height / 2);

    if (displayMode === "all") {
        bottomOffset = computeBottomOffset();
    }

    push(); // T2: Aplicar reflejo horizontal si está activado
    if (flipHorizontal) {
        translate(width, 0);
        scale(-1, 1);
    }
    

    push(); // T3: Traslación y escalado
    translate(offsetX, offsetY);
    scale(scaleFactor);



   ///////////////////////////////////////////
   //////////___OUTLINE_BORDA___//////////////////
   ///////////////////////////////////////
   let threshold = 1.1; // Distância mínima entre pontos para considerar duplicados
let minSegmentLength = 2; // Tamanho mínimo de segmento de linha para ser considerado válido (ajustável)

// Função para verificar se dois pontos estão próximos o suficiente para serem considerados duplicados
function arePointsClose(p1, p2, threshold) {
    return dist(p1.x, p1.y, p2.x, p2.y) < threshold;
}

// Função para filtrar os pontos próximos e removê-los
function filterOutlinePoints(outlinePoints, threshold) {
    let filteredPoints = [outlinePoints[0]]; // Inicia com o primeiro ponto

    for (let i = 1; i < outlinePoints.length; i++) {
        let currentPoint = outlinePoints[i];
        let lastAddedPoint = filteredPoints[filteredPoints.length - 1];

        // Verifica se o ponto atual está próximo do último ponto adicionado
        if (!arePointsClose(lastAddedPoint, currentPoint, threshold)) {
            filteredPoints.push(currentPoint); // Adiciona o ponto se não for duplicado
        }
    }

    return filteredPoints;
}

// Função para verificar o comprimento de um segmento de linha
function segmentLength(p1, p2) {
    return dist(p1.x, p1.y, p2.x, p2.y);
}

// Função para remover segmentos de linha muito curtos
function removeSmallSegments(points, minLength) {
    let cleanedPoints = [points[0]];

    for (let i = 1; i < points.length; i++) {
        let currentPoint = points[i];
        let lastAddedPoint = cleanedPoints[cleanedPoints.length - 1];
        
        // Verifica o comprimento do segmento
        if (segmentLength(lastAddedPoint, currentPoint) > minLength) {
            cleanedPoints.push(currentPoint);
        }
    }

    return cleanedPoints;
}

// Função de simplificação do contorno utilizando o algoritmo de Ramer-Douglas-Peucker
function simplifyContour(points, epsilon) {
    if (points.length < 3) return points; // Não há o que simplificar

    let dmax = 0;
    let index = 0;
    for (let i = 1; i < points.length - 1; i++) {
        let d = perpendicularDistance(points[i], points[0], points[points.length - 1]);
        if (d > dmax) {
            index = i;
            dmax = d;
        }
    }

    if (dmax > epsilon) {
        let left = simplifyContour(points.slice(0, index + 1), epsilon);
        let right = simplifyContour(points.slice(index), epsilon);

        return left.slice(0, left.length - 1).concat(right);
    } else {
        return [points[0], points[points.length - 1]];
    }
}

// Função para calcular a distância perpendicular de um ponto a uma linha
function perpendicularDistance(pt, lineStart, lineEnd) {
    let normalLength = dist(lineStart.x, lineStart.y, lineEnd.x, lineEnd.y);
    return Math.abs((pt.x - lineStart.x) * (lineEnd.y - lineStart.y) - (pt.y - lineStart.y) * (lineEnd.x - lineStart.x)) / normalLength;
}

// Filtra os pontos para remover duplicações ou segmentos muito curtos
let filteredOutlinePoints = filterOutlinePoints(outlinePoints, threshold);
let cleanedOutlinePoints = removeSmallSegments(filteredOutlinePoints, minSegmentLength);

// Simplifica o contorno para remover pontos desnecessários
let simplifiedOutlinePoints = simplifyContour(cleanedOutlinePoints, 0.5); // Ajuste a precisão conforme necessário

// Agora desenha a borda limpa, mais definida, sem linhas extras ou indesejadas
stroke(255, 255, 255, 15); // Borda AMARELA
strokeWeight(1 / scaleFactor);
noFill(); // Sem preenchimento na borda

beginShape();
for (let p of simplifiedOutlinePoints) {
    vertex(p.x, p.y);
}
endShape();


    // -----------------------------------------

    

    // Dibujar el buffer
    image(buffer, 0, 0);
    

    // Atualiza o estado de piscamento
    blinkState = (frameCount % blinkInterval < blinkInterval / 2) ? 255 : 0;  // Alterna entre 255 e 0 a cada intervalo

    // Desenha os pinos com efeito de piscar
    for (let part of parts) {
        if (displayMode === "top" && part.side !== "T") continue;
        if (displayMode === "bottom" && part.side !== "B") continue;
        let groupOffset = (displayMode === "all" && part.side === "B") ? bottomOffset : 0;
        for (let pin of part.pins) {
            noStroke();

            // Aplica a cor piscando ao pino selecionado e pinos conectados
            if (selectedPin === pin || (selectedPin && pin.net === selectedPin.net)) {
                fill(blinkState === 255 ? color(255, 0, 0) : color(0, 255, 0));  // Amarelo e Azul piscando
            } else if (pin.net === "GND") {
                fill(70, 70, 70);
            } else if (pin.net === "NC") {
                fill(255, 255, 0);
            } else if (pin.side === "B") {
                fill(255, 200, 0);
            } else if (pin.side === "TP") {
                fill(255, 255, 0);
            } else {
                fill(255, 0, 0);
            }
            // Verifica se o componente começa com "u", "n" ou "a" e desenha o pino corretamente
            if (part.name && ['u', 'tp', 'a'].includes(part.name.toLowerCase()[0])) {
              // Se começar com "u", "n" ou "a", desenha como círculo
            ellipse(pin.x + groupOffset, pin.y, pin.radius, pin.radius);
            } else {
             // Caso contrário, desenha como quadrado
             rect(pin.x + groupOffset - pin.radius / 2, pin.y - pin.radius / 2, pin.radius, pin.radius);
            }         


            
            
        }
    }

    

    
    drawComponentBoundingBoxes();
    drawSelectedNetConnections();
   
    drawPartNames();

    pop(); // Fin T3: Traslación y escalado
    pop(); // Fin T2: Reflejo horizontal
    pop(); // Fin T1: Rotación

    // Dibujar el tooltip sin transformaciones
    drawTooltip();
}


 
 //////////////////////////
 // FUNCIONES DE CONVERSIÓN
 //////////////////////////
 
 // Función para el click y tooltip (transformación completa)
function worldToScreen(wx, wy) {
    let p = createVector(wx, wy);

    // T3: Traslación y escalado
    p.x = p.x * scaleFactor + offsetX;
    p.y = p.y * scaleFactor + offsetY;

    // T2: Flip horizontal (si está activo)
    if (flipHorizontal) {
        p.x = width - p.x;
    }

    // T1: Rotación global
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



function screenToWorld(mx, my) {
    let p = createVector(mx, my);
    let cx = width / 2, cy = height / 2;

    // Invertir T1: Deshacer la rotación global (inversa)
    p.sub(createVector(cx, cy));
    let cosA = Math.cos(-rotationAngle);
    let sinA = Math.sin(-rotationAngle);
    let xNew = p.x * cosA - p.y * sinA;
    let yNew = p.x * sinA + p.y * cosA;
    p.set(xNew, yNew);
    p.add(createVector(cx, cy));

    // Invertir T2: Deshacer flip horizontal (si está activo)
    if (flipHorizontal) {
        p.x = width - p.x;
    }

    // Invertir T3: Deshacer traslación y escalado
    p.x = (p.x - offsetX) / scaleFactor;
    p.y = (p.y - offsetY) / scaleFactor;

    return { x: p.x, y: p.y };
}



// Funciones para el zoom (ignorando el flip horizontal)

// Convertir de pantalla a "mundo" para el zoom: se invierte primero T3 (traslación y escala) y luego T1 (rotación global)
function screenToWorldZoom(mx, my) {
    let p = createVector(mx, my);

    // Invertir T3: Traslación y escalado
    p.x = (p.x - offsetX) / scaleFactor;
    p.y = (p.y - offsetY) / scaleFactor;

    // Invertir T1: Deshacer la rotación global alrededor del centro
    let cx = width / 2;
    let cy = height / 2;
    p.sub(createVector(cx, cy));
    let cosA = Math.cos(-rotationAngle);
    let sinA = Math.sin(-rotationAngle);
    let xNew = p.x * cosA - p.y * sinA;
    let yNew = p.x * sinA + p.y * cosA;
    p.set(xNew, yNew);
    p.add(createVector(cx, cy));

    return { x: p.x, y: p.y };
}

// Convertir de "mundo" a pantalla para el zoom: se aplica primero T1 (rotación global) y luego T3 (traslación y escala)
function worldToScreenZoom(wx, wy) {
    let p = createVector(wx, wy);

    // Aplicar T1: Rotación global alrededor del centro
    let cx = width / 2;
    let cy = height / 2;
    p.sub(createVector(cx, cy));
    let cosA = Math.cos(rotationAngle);
    let sinA = Math.sin(rotationAngle);
    let xNew = p.x * cosA - p.y * sinA;
    let yNew = p.x * sinA + p.y * cosA;
    p.set(xNew, yNew);
    p.add(createVector(cx, cy));

    // Aplicar T3: Traslación y escalado
    p.x = p.x * scaleFactor + offsetX;
    p.y = p.y * scaleFactor + offsetY;

    return { x: p.x, y: p.y };
}

// Función de zoom centrado en el mouse usando las funciones para zoom (sin flip horizontal)
function mouseWheel(event) {
    // Convertir la posición del mouse a coordenadas "mundo" (para zoom)
    let worldBefore = screenToWorldZoom(mouseX, mouseY);

    // Ajustar el factor de zoom: 0.9 para alejar, 1.1 para acercar
    let zoomFactor = event.delta > 0 ? 0.9 : 1.1;
    scaleFactor *= zoomFactor;

    // Calcular la nueva posición en pantalla para ese mismo punto del mundo (usando la conversión para zoom)
    let screenAfter = worldToScreenZoom(worldBefore.x, worldBefore.y);

    // Ajustar los offsets para que el punto bajo el mouse permanezca fijo
    offsetX += (mouseX - screenAfter.x);
    offsetY += (mouseY - screenAfter.y);

    return false;
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
         fill(255, 255, 0, 120);//AMARWELO CAIXINHA DE INFORMAÇOES
         rect(screenPos.x, screenPos.y - 20, txtWidth + padding * 2, 40, 4);
         fill(0);
         text(txt, screenPos.x + padding, screenPos.y - 20 + padding);
         pop();
     }
 }
 
 // Detecta el click convirtiendo las coordenadas de pantalla a mundo
function mousePressed() {
    // Convertir la posición del mouse a coordenadas del "mundo"
    let worldPos = screenToWorld(mouseX, mouseY);
    let mx = worldPos.x;
    let my = worldPos.y;
    let found = false;

    // Recorrer cada parte y sus pines para ver si se hizo click sobre alguno
    for (let part of parts) {
        if (displayMode === "top" && part.side !== "T") continue;
        if (displayMode === "bottom" && part.side !== "B") continue;
        let groupOffset = (displayMode === "all" && part.side === "B") ? bottomOffset : 0;

        for (let pin of part.pins) {
            if (pin.net === "GND") continue; // Opcional: omitir GND
            let d = dist(mx, my, pin.x + groupOffset, pin.y);
            if (pin.net === "NC") continue; // Opcional: omitir NC
            
            if (d <= pin.radius) {
                tooltip = {
                    text: `COMP: ${part.name}\nMALHA: ${pin.net}`,
                    x: pin.x,
                    y: pin.y,
                    side: part.side
                };
                selectedPin = pin;
                found = true;
                break;
            }
        }
        if (found) break;
    }

    // Si no se encontró ningún pin, no modificamos tooltip ni selectedPin
    // if (!found) {
    //     tooltip = null;
    //     selectedPin = null;
    // }

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
 
 
 
  //////////////////////////
 // OTRAS FUNCIONES (Parseo, etc.)
 //////////////////////////
 
 function renderBuffer() {
    buffer.clear();
    buffer.push();
    // Dibuja el contorno en sus coordenadas originales
    buffer.stroke(255, 255, 255, 0);
    buffer.noFill();
    buffer.beginShape();
   // for (let p of outlinePoints) {
       // buffer.vertex(p.x, p.y);
   // }
    buffer.endShape(CLOSE);
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
 function drawOrthogonalLine(x1, y1, x2, y2) {
    console.log(`Linha de (${x1}, ${y1}) para (${x2}, ${y2})`);
    line(x1, y1, x2, y1); // horizontal
    line(x2, y1, x2, y2); // vertical
}

function drawBlueDot(x, y) {
    push();
    fill(0, 255, 0);
    noStroke();
    ellipse(x, y, 6, 6);
    pop();
}


function drawSelectedNetConnections() {
    if (!selectedPin) return;

    push();
    strokeWeight(3);
    stroke(0, 255, 0);
    noFill();

    let connectedPoints = [];

    for (let part of parts) {
        let groupOffset = (displayMode === "all" && part.side === "B") ? bottomOffset : 0;

        for (let pin of part.pins) {
            if (pin.net === selectedPin.net) {
                let px = pin.x + (part.side === "B" ? groupOffset : 0);
                let py = pin.y;
                connectedPoints.push({ x: px, y: py });
            }
        }
    }

    connectedPoints.sort((a, b) => a.x - b.x || a.y - b.y);

    console.log("Pontos conectados:");
    connectedPoints.forEach(p => {
        console.log(`(${p.x}, ${p.y})`);
        drawBlueDot(p.x, p.y);
    });

    for (let i = 1; i < connectedPoints.length; i++) {
        let p1 = connectedPoints[i - 1];
        let p2 = connectedPoints[i];
        console.log(`Linha: (${p1.x}, ${p1.y}) -> (${p2.x}, ${p2.y})`);
        drawOrthogonalLine(p1.x, p1.y, p2.x, p2.y);
    }
    

    pop();
}

 
 function drawComponentBoundingBoxes() {
    let backgroundRects = []; // Lista para armazenar os preenchimentos

    // Primeiro, coletamos as informações dos retângulos de fundo
    for (let part of parts) {
        if (displayMode === "top" && part.side !== "T") continue;
        if (displayMode === "bottom" && part.side !== "B") continue;
        let groupOffset = (displayMode === "all" && part.side === "B") ? bottomOffset : 0;

        if (part.pins.length > 0) {
            let minX = Infinity, minY = Infinity;
            let maxX = -Infinity, maxY = -Infinity;

            for (let pin of part.pins) {
                let r = pin.radius * 0.75;
                minX = Math.min(minX, pin.x - r);
                maxX = Math.max(maxX, pin.x + r);
                minY = Math.min(minY, pin.y - r);
                maxY = Math.max(maxY, pin.y + r);
            }

            // Definir cor de preenchimento por tipo de componente
            let fillColor;
            if (part.name.startsWith("C")) {
                fillColor = color(255, 255, 150, 85);
            } else if (part.name.startsWith("R")) {
                fillColor = color(50, 50, 50, 100);
            } else if (part.name.startsWith("MIC")) {
                fillColor = color(255, 255, 150, 225);
            } else if (part.name.startsWith("N")) {
                fillColor = color(0, 0, 255, 0);
            } else if (part.name.startsWith("L")) {
                fillColor = color(30, 30, 30, 205);
            } else if (part.name.startsWith("ZD")) {
                fillColor = color(80, 80, 80, 125);
            } else if (part.name.startsWith("U")) {
                fillColor = color(50, 50, 50, 100);
            } else if (part.name.startsWith("S")) {
                fillColor = color(128, 128, 128, 115);
            } else if (part.name.startsWith("H")) {
                fillColor = color(50, 50, 50, 120);
            } else if (part.name.startsWith("J")) {
                fillColor = color(200, 200, 200, 115);
            } else if (part.name.startsWith("D")) {
                fillColor = color(80, 80, 80, 125);
            } else if (part.name.startsWith("Q")) {
                fillColor = color(80, 80, 80, 125);
            } else if (part.name.startsWith("RF")) {
                fillColor = color(255, 255, 0, 105);
            } else if (part.name.startsWith("ANT")) {
                fillColor = color(128, 128, 128, 155);
            } else if (part.name.startsWith("PA")) {
                fillColor = color(50, 50, 50, 120);
            } else if (part.name.startsWith("F")) {
                fillColor = color(0, 0, 255, 75);
            } else {
                fillColor = color(255, 255, 0, 0);

            }
    
 
            // Guardamos os dados para desenhar depois
            backgroundRects.push({ x: minX + groupOffset, y: minY, w: maxX - minX, h: maxY - minY, color: fillColor });
        }
    }
    // 2. Desenhamos os fundos DEPOIS
    noStroke();
    for (let rectData of backgroundRects) {
        fill(rectData.color);
        rect(rectData.x, rectData.y, rectData.w, rectData.h);
    }

    // 1. Desenhamos as bordas  COR DAS BORDAS DOS COMPONENTES e pinos PRIMEIRO
    stroke(255, 255, 255,100);
    noFill();
    strokeWeight(1,5);
    for (let rectData of backgroundRects) {
        rect(rectData.x, rectData.y, rectData.w, rectData.h);
    }
    

    
}



function drawPartNames() {
    // Solo mostrar nombres si se ha acercado lo suficiente (umbral ajustable)
    if (scaleFactor < 1.1) return;
    
    push();
    // Restablece la matriz de transformación para que el texto se dibuje sin rotación ni escala
    resetMatrix();
    // Configuración de estilo para el texto
    textAlign(CENTER, CENTER);
    textSize(12);
    fill(255, 266, 20);
    noStroke();

    // Recorre cada parte para dibujar su nombre en el centro de sus pines
    for (let part of parts) {
        // Filtrar según el modo de visualización
        if (displayMode === "top" && part.side !== "T") continue;
        if (displayMode === "bottom" && part.side !== "B") continue;
        
        if (part.pins.length > 0) {
            // Si se está mostrando ambos lados ("all"), se aplica un offset a las partes del lado inferior
            let groupOffset = (displayMode === "all" && part.side === "B") ? bottomOffset : 0;
            let sumX = 0, sumY = 0;
            // Sumar las coordenadas de cada pin de la parte
            for (let pin of part.pins) {
                sumX += pin.x;
                sumY += pin.y;
            }
            // Calcular el centro (en coordenadas "mundo")
            let centerX = sumX / part.pins.length + groupOffset;
            let centerY = sumY / part.pins.length;
            // Convertir el centro a coordenadas de pantalla usando la función de transformación completa
            let screenPos = worldToScreen(centerX, centerY);
            // Dibujar el nombre en la posición calculada
            text(part.name, screenPos.x, screenPos.y);
        }
    }
    pop();
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

 
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    renderBuffer(); // Vuelve a dibujar el contenido después del ajuste
}

function keyPressed() {
    if (document.activeElement.tagName === "INPUT") {
        return; // Permite escribir en el input
    }
    return false; // Evita que p5.js bloquee la entrada
}
