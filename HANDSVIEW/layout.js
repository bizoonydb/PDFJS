let ThemeBOR = [  //colores estilo NextDB Online
    "#fff",     // blanco fondo ThemeBOR[0]
    "#00D2FF28", // fill de board
    "#FFD700", // Amarillo brillante
    "#A9A9A9", // Gris oscuro
    "#DCDCDC", // Blanco neutro
    "#000000", // Negro  ThemeBOR[5]
    "#D3D3D3", // Gris claro
    "#fff", //Gris Claro2 ThemeBOR[7]
    "#0000FF", // Azul pin seleccionado  ThemeBOR[8]
    "#00FF00", //Verde nextpin 0, 255, 0  ThemeBOR[9]
    "#646464", //gris oscuro para los GND  ThemeBOR[10]
    "#000005", // gris claro translucido para los pines NC ThemeBOR[11]
    "#FF0000", //Rojo pines ThemeBOR[12]
    "#FFFFDC96", // color marfil fondo de tooltip ThemeBOR[13]
    "#652F06",//Marron oscuro opcinal para condensadores  ThemeBOR[14]
    "#0000C8",//Azul intenso para resto componentes Resitencias, Bobinas entre otros ThemeBOR[15]
    "#0F0F0F",//gris muy oscuro para nombre de componentes ThemeBOR[16]
    "#FFD700",// amarillo oro ThemeBOR[17]
    "#4B4B4B",// ThemeBOR[18]
];
/*
let ThemeBOR = [  //colores estilo NextDB Online
    "#fff",     // blanco fondo ThemeBOR[0]
    "#00D2FF28", // Rojo oscuro
    "#FFD700", // Amarillo brillante
    "#A9A9A9", // Gris oscuro
    "#DCDCDC", // Blanco neutro
    "#000000", // Negro  ThemeBOR[5]
    "#D3D3D3", // Gris claro
    "#C8C8C8", //Gris Claro2 ThemeBOR[7]
    "#0000FF", // Azul pin seleccionado  ThemeBOR[8]
    "#00FF00", //Verde nextpin 0, 255, 0  ThemeBOR[9]
    "#646464", //gris oscuro para los GND  ThemeBOR[10]
    "#C8C8C850", // gris claro translucido para los pines NC ThemeBOR[11]
    "#FF0000", //Rojo pines ThemeBOR[12]
    "#FFFFDC96", // color marfil fondo de tooltip ThemeBOR[13]
    "#652F06",//Marron oscuro opcinal para condensadores  ThemeBOR[14]
    "#0000C8",//Azul intenso para resto componentes Resitencias, Bobinas entre otros ThemeBOR[15]
    "#0F0F0F",//gris muy oscuro para nombre de componentes ThemeBOR[16]
];*/
let ThemeFlexDB = [
    "#1E1E1E",     // [0] Fondo negro oscuro
    "#FFD966",     // [1] Pines activos (amarillo pastel claro)
    "#4CAF50",     // [2] Pines conectados (verde medio saturado)
    "#B4C7E7",     // [3] Pines no conectados (azul celeste suave)
    "#C8C8C8",     // [4] Pines GND (gris claro)
    "#FFFFFF",     // [5] Texto sobre fondo oscuro (blanco)
    "#6FA8DC",     // [6] Líneas de conexión / referencias (azul claro)
    "#00FF00",     // [7] Pin seleccionado (verde neón)
    "#FF0000",     // [8] Pin marcado / error (rojo fuerte)
    "#D9D9D9",     // [9] Líneas verticales guías (gris claro)
    "#8E7CC3",     // [10] Tooltip de información (violeta pastel translúcido)
    "#F4CCCC",     // [11] Pines con advertencia / voltaje alto (rosado claro)
    "#000000",     // [12] Color para borde interior de pads (negro puro)
    "#D0E0E3",     // [13] Fondo de componentes en borde (azul-gris pálido)
    "#999999",     // [14] Etiquetas en árbol / UI (gris intermedio)
    "#FF9900",     // [15] Elementos activos (naranja vivo)
    "#CCCCCC"      // [16] Fondo de silkscreen (gris neutro claro)
];

let ThemeProPCB = [ //estilo Kikcad
    "#1E1E1E",  // [0] Fondo oscuro neutro (tipo modo nocturno)
    "#FF3030",  // [1] VCC o trazos de alta señal (rojo brillante)
    "#FFD700",  // [2] Pines activos o señales importantes (amarillo dorado)
    "#808080",  // [3] Trazos GND (gris medio)
    "#C0C0C0",  // [4] Pads no conectados / silkscreen claro (gris claro)
    "#FFFFFF",  // [5] Texto o líneas visibles sobre fondo oscuro (blanco)
    "#A0A0A0",  // [6] Capa de referencia o capa inactiva (gris apagado)
    "#B0B0FF",  // [7] Vias o conexiones internas (azul suave)
    "#00FFFF",  // [8] Trazas señal digital o bus (cian)
    "#00FF00",  // [9] Señal analógica / test points (verde puro)
    "#404040",  // [10] Tierra (más oscuro que GND para fondo diferencial)
    "#60606088", // [11] Pines no conectados (gris semi-transparente)
    "#FF0000",  // [12] Pines activos (rojo fuerte)
    "#FFFFE080", // [13] Tooltips o overlays de ayuda (amarillo marfil translúcido)
    "#8B4513", // [14] Condensadores, marrón cobre
    "#1E90FF", // [15] Resistencia / bobinas / componentes pasivos (azul acero)
    "#DCDCDC", // [16] Texto de componentes (silkscreen claro)
];
let ThemeBOR_FlexStyle = [
    "#000000",   // [0] Fondo negro total
    "#FF6666",   // [1] Pin seleccionado manualmente (rojo suave)
    "#FFD966",   // [2] Pines activos amarillos
    "#CCB84A",   // [3] Pines GND (amarillo más oscuro)
    "#C8C8C8",   // [4] Pines NC (gris claro)
    "#FFFFFF",   // [5] Contorno blanco puro
    "#DDDDDD",   // [6] Letras sobre NC o fondo oscuro (gris claro)
    "#AAAAAA",   // [7] Letras auxiliares (gris medio)
    "#FF0000",   // [8] Next pin (rojo fuerte)
    "#FF6666",   // [9] Pin seleccionado (rojo suave)
    "#222222",   // [10] Letras sobre pines GND (gris muy oscuro)
    "#C8C8C880", // [11] Pines NC translúcidos (gris claro semitransparente)
    "#FFD966",   // [12] Pines activos (duplicado si necesitas usarlo aparte)
    "#FFFFE080", // [13] Tooltips (amarillo marfil translúcido)
    "#996633",   // [14] Condensadores (marrón medio estilo cobre)
    "#3399FF",   // [15] Resistencias, bobinas, pasivos (azul claro fuerte)
    "#FFFFFF"    // [16] Letras sobre fondo negro (blanco puro)
];

let bgImage; 
let showBg = true;
let imageUrl= null;
let parserWorker;
let netLines = [];
let zoomFactor = 1;
let fileContent;
let allInTop;
let outlineWidth;
let parts = [
    { name: "U1" },
    { name: "R1" },
    { name: "C2" },
    { name: "R1" }, // repetido a propósito
    { name: "U2" }
];
let outlines = []; // Esto reemplaza outlinePoints

let outlinePoints = [];
let flipHorizontal = true; // Estado del reflejo
let showNetConnections = true;
let scaleFactor = 1;
let rotationAngle = Math.PI; // Inicialmente 180° (en radianes)
let offsetX = 0;
let offsetY = 0;
let pinScaleFactor = 1; // Ajusta según lo necesites //1
//let effectiveStroke = 1 / scaleFactor;

let displayMode = "top"; // Modo de visualización: "all", "top" o "bottom"
// Variables para interacción
let tooltip = null;       // Información detallada del pin (tooltip)
let selectedPin = null;   // Pin seleccionado
// Desplazamiento horizontal para separar componentes TOP y BOTTOM cuando se muestran juntos
let bottomOffset = 100;
let isLoading = true;  // Variable para saber si estamos cargando
let loadingTime = 0;   // Contador para el tiempo de carga






function centerCanvas() {
    offsetX = defaultOffsetX;
    offsetY = defaultOffsetY;
    scaleFactor = 1; // Opcional: Restablece el zoom
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(18); // Limita la velocidad de fotogramas a 20 FPS

    // Simulamos una carga con setTimeout (puedes reemplazar con tu lógica)
    setTimeout(() => {
        isLoading = false;  // Cambiar el estado cuando se termine la carga
        parseFile();
        getTopOutlineWidth();
        calcularTransformacion();

        //buffer = createGraphics(width, height);
        //renderBuffer();
    }, 1000);  // 1 segundo de espera para simular la carga (puedes ajustar este tiempo)


    document.querySelectorAll('#controls button, #controls input').forEach(el => {
        el.addEventListener('mousedown', (event) => {
            event.stopPropagation();
        });
    });


    // Configuración de botones
    select('#btnResize').mousePressed(() => {
        windowResized();
        location.reload();
    });

    select('#btnZoomIn').mousePressed(() => {
        applyZoom(1.1);
    });

    select('#btnZoomOut').mousePressed(() => {
        applyZoom(0.9);
    });


    select('#btnAll').mousePressed(() => {
        displayMode = "all";
        flipHorizontal = true; // Desactivar reflejo al mostrar ambos lados
        centerAndFitView();
    });

    select('#btnTop').mousePressed(() => {
        displayMode = "top";
        flipHorizontal = true;
        centerAndFitView();

    });
    select('#btnBottom').mousePressed(() => {
        displayMode = "bottom";
        flipHorizontal = false;
        centerAndFitView();

    });
    select('#btnNextNet').mousePressed(() => {
        moveToNextPinInNet();
    });

    // Botón para rotar 90° cada click
    select('#btnRotate').mousePressed(() => {
        rotationAngle += Math.PI / 2;
    });

    const btnTraces = select('#btnToggleTraces');
    const imgTraces = btnTraces.elt.querySelector('img'); // Accede al <img> dentro del botón

    btnTraces.mousePressed(() => {
        showNetConnections = !showNetConnections;

        // Cambia la imagen según el estado
        if (showNetConnections) {
            imgTraces.src = 'https://bvrhandschematic.web.app/Icons/lineas visible.png';
            imgTraces.alt = 'Ocultar pistas';
        } else {
            imgTraces.src = 'https://bvrhandschematic.web.app/Icons/lineas ocultas.png'; // asegúrate de tener esta imagen
            imgTraces.alt = 'Mostrar pistas';
        }
    });

    



    document.getElementById("flipButton").addEventListener("click", () => {
        flipHorizontal = !flipHorizontal;
    });

    let searchInput = document.getElementById("searchComponent");

    searchInput.addEventListener("mousedown", (event) => {
        event.stopPropagation(); // Evita que p5.js intercepte el evento
    });

    fillComponentDatalist();
    //setupSearchListener();

}


function getBvrBoundingBox() {
    let xs = outlinePoints.map(p => p.x);
    let ys = outlinePoints.map(p => p.y);
    let minX = Math.min(...xs);
    let maxX = Math.max(...xs);
    let minY = Math.min(...ys);
    let maxY = Math.max(...ys);
    console.log("BBox:", { minX, maxX, minY, maxY, width: maxX - minX, height: maxY - minY });
    return {
        minX,
        maxX,
        minY,
        maxY,
        width: maxX - minX,
        height: maxY - minY
    };
}

function drawBackgroundImage() {
    if (showBg && bgImage) {
        let bbox = getBvrBoundingBox();

        push();
        scale(1, -1); // Inverte Y
        translate(0, -bbox.maxY - bbox.minY); // Ajusta o Y para origem

        // ESTICA completamente a imagem para cobrir todo o bounding box
        image(
            bgImage,
            bbox.minX,          // Começa do canto esquerdo
            bbox.minY,          // Começa do canto inferior (já invertido com scale)
            bbox.width,         // Estica horizontalmente
            bbox.height         // Estica VERTICALMENTE
        );

        pop();
    }
}

function draw() {
    background(255); // 

    if (isLoading) { // Si está cargando, muestra mensaje de carga animado.

        textSize(50);
        fill(0,0,0);
        textAlign(CENTER, CENTER);
        text("LAYOUT MODE", width / 2, height / 2); // Texto "Cargando" centrado.

        let loadingDots = ['.', '..', '...']; // Animación de puntos.
        let dotIndex = Math.floor(millis() / 500) % 3; // Cambia cada 500 ms.
        text(loadingDots[dotIndex], width / 2 + 100, height / 2); // Dibuja los puntos.

    } else {
        // Si ya terminó de cargar, se dibuja el contenido.
        
        

        push(); // T1: Guarda el estado de la transformación actual.
        translate(width / 2, height / 2); // Traslada el origen al centro del canvas.
        rotate(rotationAngle); // Rota todo el contenido según rotationAngle.
        translate(-width / 2, -height / 2); // Devuelve el origen a la esquina.
        if (displayMode === "all") {
            bottomOffset = computeBottomOffset(); // Calcula desplazamiento para la vista combinada.
        }

        push(); // T2: Guarda estado antes de aplicar reflejo.
        if (flipHorizontal) { // Si está activado el reflejo horizontal.
            translate(width, 0); // Traslada al borde derecho.
            scale(-1, 1); // Invierte horizontalmente.#00D2FF28
        }

        push(); // T3: Guarda estado antes de traslación y escalado.
        translate(offsetX, offsetY); // Aplica desplazamiento de vista.
        scale(scaleFactor); // Aplica zoom general.
        strokeWeight(1 / scaleFactor); // Ajusta grosor de líneas para que no cambie con el zoom.
        fill(0, 120, 80); // COR DA PLACA.nao funciona
       
        let threshold = 10000; // Umbral de distancia entre puntos para unirlos.
        let drawing = false; // Bandera para saber si se está dibujando una forma.
        setInterval(() => {
            // Hacer algo cada 200ms independientemente del frameRate
        }, 200);

function drawOutline(points, offsetX = 0, flipX = false, mirrorAxis = 0) {
    let drawing = false;

    // 🟨 Define a cor da linha e a espessura
    stroke(0);//cor da borda
    strokeWeight(2 / scaleFactor); // Ajusta el grosor de la línea según el zoom
    fill(255); // cor da placa


    for (let i = 0; i < points.length - 1; i++) {
        let current = points[i];
        let next = points[i + 1];
        let distance = dist(current.x, current.y, next.x, next.y);

        if (distance <= threshold) {
            if (!drawing) {
                beginShape();
                drawing = true;
                let x = flipX ? mirrorAxis - current.x : current.x + offsetX;
                vertex(x, current.y);
            }
            let x = flipX ? mirrorAxis - next.x : next.x + offsetX;
            vertex(x, next.y);
        } else {
            if (drawing) {
                endShape();
                drawing = false;
            }
        }
    }

    if (drawing) {
        endShape(CLOSE);
    }
}


        // ---- Uso de la función factorizada ----

        // Lado "T" (Top)
        drawOutline(outlinePoints, 0);

        // Lado "B" (Bottom), si no está todo en top
        if (!allInTop) {
            let offsetXBottom = (displayMode === "all") ? bottomOffset : 0;
            drawOutline(outlinePoints, offsetXBottom);
        } else {
            let offsetXTop = outlineWidth * (2 + 0.02);
            drawOutline(outlinePoints, 0, true, offsetXTop);
        }
 drawComponentBoundingBoxes(); // Dibuja los cuadros de los componentes.


        /////////// pines ///////////////////
        if (scaleFactor >= 0.2) {
            for (let part of parts) {
                if (displayMode === "top" && part.side !== "T") continue;
                if (displayMode === "bottom" && part.side !== "B") continue;

                let groupOffset = (displayMode === "all" && part.side === "B") ? bottomOffset : 0;

                for (let pin of part.pins) {
                    let worldX = pin.x + groupOffset;
                    let worldY = pin.y;

                    // Preparamos el conjunto de vértices en coordenadas mundo
                    let verts = [];
                    if (pin.outline && pin.outline.length) {
                        // polígono custom
                        verts = pin.outline.map(v => ({ x: v.x + worldX, y: v.y + worldY }));
                    } else if (/^(R|r|L|l|C|c|PL|Z|ZD|D|FL)/.test(part.name)) {
                        // cuadrado centrado de lado = pin.radius
                        let r = pin.radius / 2;
                        verts = [
                            { x: worldX - r, y: worldY - r },
                            { x: worldX + r, y: worldY - r },
                            { x: worldX + r, y: worldY + r },
                            { x: worldX - r, y: worldY + r },
                        ];
                    } else {
                        // círculo/óvalo: aproximamos por su bounding box
                        let rW = pin.radius / 2;
                        let rH = pin.radius / 2;
                        verts = [
                            { x: worldX - rW, y: worldY - rH },
                            { x: worldX + rW, y: worldY - rH },
                            { x: worldX + rW, y: worldY + rH },
                            { x: worldX - rW, y: worldY + rH },
                        ];
                    }

                    // Transformamos a screen y comprobamos si alguno cae dentro
                    let anyVisible = verts.some(v => {
                        let s = worldToScreen(v.x, v.y);
                        return (s.x >= 0 && s.x <= width && s.y >= 0 && s.y <= height);
                    });
                    if (!anyVisible) continue;  // todo fuera de pantalla, saltamos

                    // Log para saber si tiene outline o no

                    // Estilos según estado/net
                   
            // 🔥 Definição das cores dos pinos
            noStroke();

   let interval = 3; // Número de frames para alternar (~0.5s em 60fps)
let toggle = floor(frameCount / interval) % 2;

if (selectedPin === pin) {
    // Alterna entre Magenta (255, 0, 255) e Amarelo (255, 255, 0)
    fill(0, 255, 0); // Vermelho
    

} else if (selectedPin && pin.net === selectedPin.net) {
    // Alterna entre Vermelho e Verde
    if (toggle === 0) {
        fill(250, 0, 0); // Vermelho
    } else {
        fill(0, 255, 0); // Verde
    }



            } else if (pin.net === "GND") {
                fill(150, 150, 150); // Cinza

            } else if (pin.net === "NC") {
                strokeWeight(1 / scaleFactor);
                stroke(0, 0, 0);
                noFill(); // Não preenchido

          

            } else {
                fill(180, 180, 180); // Default - pino padrão
            }
            

                  // Desenhar pino já com a certeza que está visível na tela
if (pin.outline && pin.outline.length) {
    push();
    translate(worldX, worldY);
    beginShape();
    for (let v of pin.outline) {
        vertex(v.x, v.y);
    }
    endShape(CLOSE);
    pop();

} else if (/^(R|r|L|l|C|c|PL|Z|ZD|D|FL)/.test(part.name)) {
    // Quadrado para resistores, indutores, , etc.
    push();
    rectMode(CENTER);
    
    rect(worldX, worldY, pin.radius, pin.radius);
    pop();

} else {
    // 🔴 Se é pino redondo, aumentar um pouco o tamanho
    const scaleFactorCircle = 1.9;  // Aumento de 30%
    const enlargedRadius = pin.radius * scaleFactorCircle;
    ellipse(worldX, worldY, enlargedRadius, enlargedRadius);
}

                }
            }
        }




        if (showNetConnections) {
            drawSelectedNetConnections(); // Dibuja las conexiones entre pines de la misma red.
        }
        //drawBackgroundImage();   imagen fondo
       
        drawPartNames(); // Dibuja los nombres de las partes.
        drawPinNumbers();
        checkPinsOutsideTopOutline();

        pop(); // Fin T3: Revierte traslación y escala.
        pop(); // Fin T2: Revierte reflejo.
        pop(); // Fin T1: Revierte rotación.

        push();
        textAlign(CENTER, CENTER);
        textSize(80); // Tamaño fijo, puedes ajustar según tu canvas
        textFont('sans-serif'); // Usa una fuente más clara y estable
        fill(0, 0, 0, 55); // Un poco más opaco para que sea legible
        textStyle(BOLD);
        text("DIGITAL BOARD", width / 2, height / 2);
        pop();


        drawTooltip(); // Dibuja tooltip sin transformaciones.
    }

}

function checkPinsOutsideTopOutline() {
    if (outlinePoints.length < 3) return;

    function isPointInPolygon(point, polygon) {
        let inside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            let xi = polygon[i].x, yi = polygon[i].y;
            let xj = polygon[j].x, yj = polygon[j].y;
            let intersect = ((yi > point.y) !== (yj > point.y)) &&
                (point.x < (xj - xi) * (point.y - yi) / (yj - yi + 0.00001) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    }

    let outPins = [];

    for (let part of parts) {
        if (part.side !== "T") continue;

        for (let pin of part.pins) {
            if (!isPointInPolygon({ x: pin.x, y: pin.y }, outlinePoints)) {
                outPins.push(`${part.name}.${pin.name}`);
            }
        }
    }

    if (outPins.length > 0) {
        allInTop = true;
    }
}
function getTopOutlineWidth() {
    if (outlinePoints.length < 2) {
        outlineWidth = 0;
        return 0;
    }

    let minX = Infinity;
    let maxX = -Infinity;

    for (let point of outlinePoints) {
        if (point.x < minX) minX = point.x;
        if (point.x > maxX) maxX = point.x;
    }

    outlineWidth = maxX - minX;
    return outlineWidth;
}






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
    let zoomFactor = event.delta > 0 ? 0.8 : 1.3;
    scaleFactor *= zoomFactor;

    // Calcular la nueva posición en pantalla para ese mismo punto del mundo (usando la conversión para zoom)
    let screenAfter = worldToScreenZoom(worldBefore.x, worldBefore.y);

    // Ajustar los offsets para que el punto bajo el mouse permanezca fijo
    offsetX += (mouseX - screenAfter.x);
    offsetY += (mouseY - screenAfter.y);

    return false;
}
function applyZoom(factor) {
    // Punto en el centro del canvas
    let centerX = width / 2;
    let centerY = height / 2;

    // Convertir la posición del centro a coordenadas "mundo"
    let worldBefore = screenToWorldZoom(centerX, centerY);

    // Ajustar el factor de escala
    scaleFactor *= factor;

    // Calcular la nueva posición en pantalla para ese mismo punto del mundo
    let screenAfter = worldToScreenZoom(worldBefore.x, worldBefore.y);

    // Ajustar los offsets para que el centro permanezca fijo
    offsetX += (centerX - screenAfter.x);
    offsetY += (centerY - screenAfter.y);
}
// Dibujar el tooltip "derecho" (sin rotación ni escala)
function drawTooltip() {
    // Verifica si existe un tooltip para mostrar
    if (tooltip) {
        // Convierte las coordenadas del mundo a coordenadas de pantalla
        let screenPos = worldToScreen(tooltip.x, tooltip.y);

        push(); // Guarda el estado actual de las transformaciones

        resetMatrix(); // Reinicia todas las transformaciones, para dibujar el texto sin que se vean afectadas por otras transformaciones

        // Configura la alineación y tamaño del texto
        textAlign(LEFT, TOP);
        textSize(16);
        noStroke();

        let padding = 4; // Espacio de relleno alrededor del texto
        let txt = tooltip.text; // Texto del tooltip
        let txtWidth = textWidth(txt); // Calcula el ancho del texto para ajustar el rectángulo de fondo

        // Dibuja un rectángulo de fondo con color semi-transparente
        // La posición del rectángulo se ajusta usando la posición de pantalla y se desplaza 20 píxeles hacia arriba
        // El rectángulo tiene un relleno extra (padding) a los lados y bordes redondeados con un radio de 4
        fill(255,255,255,0); //COR DA BOX DE INFORMAÇAO
        rect(screenPos.x, screenPos.y - 20, txtWidth + padding * 2, 65, 4);

        // Configura el color del texto y lo dibuja encima del rectángulo de fondo
        fill(0,0,0,0);//COR DO TEXTO DA BOX DE INFORMAÇAO
        text(txt, screenPos.x + padding, screenPos.y - 20 + padding);

        pop(); // Restaura el estado de las transformaciones para no afectar el resto del dibujo
    }
}
// Calcula el desplazamiento horizontal para componentes del lado inferior en modo "all"
function computeBottomOffset() {
    // Inicializamos los límites mínimos y máximos en el eje X para los pines del lado "T"
    let topMinX = Infinity,    // El valor más pequeño que encontremos (comienza en +∞)
        topMaxX = -Infinity;   // El valor más grande que encontremos (comienza en -∞)

    // Recorremos todos los "parts"
    for (let part of parts) {
        // Nos interesa solo la parte que está en el lado "T" (Top)
        if (part.side === "T") {
            // Para cada pin de esa parte
            for (let pin of part.pins) {
                let r = pin.radius;  // Radio del pin

                // Calculamos el límite izquierdo del pin (x - r) y ajustamos topMinX si es menor
                if (pin.x - r < topMinX) {
                    topMinX = pin.x - r;
                }

                // Calculamos el límite derecho del pin (x + r) y ajustamos topMaxX si es mayor
                if (pin.x + r > topMaxX) {
                    topMaxX = pin.x + r;
                }
            }
        }
    }

    // La anchura total ocupada por los pines en X es (topMaxX - topMinX).
    // A ese valor le sumamos un margen adicional de 200 unidades y devolvemos el resultado.
    return (topMaxX - topMinX) + 200;
    // (En el pasado este margen era de 50, pero se amplió a 200)
}


// Función auxiliar: test de punto en polígono (ray-casting)
function pointInPolygon(x, y, vs) {
    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        const xi = vs[i].x, yi = vs[i].y;
        const xj = vs[j].x, yj = vs[j].y;
        const intersect = ((yi > y) !== (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

function mousePressed() {
    // Converter posição do mouse para coordenadas do mundo
    let worldPos = screenToWorld(mouseX, mouseY);
    let mx = worldPos.x;
    let my = worldPos.y;
    let found = false;

    for (let part of parts) {
        if (displayMode === "top" && part.side !== "T") continue;
        if (displayMode === "bottom" && part.side !== "B") continue;
        let groupOffset = (displayMode === "all" && part.side === "B") ? bottomOffset : 0;

        for (let pin of part.pins) {
            // Calcula o centro da pad
            let worldX = pin.x + groupOffset;
            let worldY = pin.y;

            // Verifica se o clique está dentro da pad
            let hit = false;
            if (pin.outline && pin.outline.length) {
                const poly = pin.outline.map(v => ({
                    x: v.x + worldX,
                    y: v.y + worldY
                }));
                hit = pointInPolygon(mx, my, poly);
            } else {
                hit = dist(mx, my, worldX, worldY) <= pin.radius;
            }

            if (hit) {
                const tipPos = { x: worldX, y: worldY, side: part.side };
                let tooltipText;

                if (pin.net === "GND" || pin.net === "NC") {
                    tooltipText = `Parte: ${part.name}<br>Net: ${pin.net}`;
                    selectedPin = null;
                } else {
                    tooltipText = `COMP: ${part.name}<br>MALHA: ${pin.net}<br>PINO: ${pin.name}`;
                    selectedPin = pin;
                    actualizarRedSeleccionada();
                }

                tooltip = {
                    text: tooltipText,
                    ...tipPos
                };

                // Atualiza display do pino
                const pinDisplay = document.getElementById("pinDisplay");
                if (pinDisplay) {
                    pinDisplay.innerHTML = tooltipText;
                }

                // Atualiza display de voltagem separado
                const voltageDisplay = document.getElementById("voltageDisplay");
                if (voltageDisplay) {
                    const voltage = netNameToVoltage(pin.net);
                    voltageDisplay.textContent = voltage ? voltage : '...';
                }

                found = true;
                break;
            }
        }
        if (found) break;
    }

    return false; // Evita comportamento padrão
}


// Função que converte nome da malha (net.name) em voltagem exibível
function netNameToVoltage(netName) {
    if (!netName) return '';

    const name = netName.toUpperCase();

    const voltageMap = {
        'VBAT': '4,2V',
        'VBUS': '5,0V',
        'VPH_PWR': '4,2V',
        'VSYS': '4,2V',
        'GND': 'GND',
        'NC': 'NC'
    };

    // Verifica os nomes pré-mapeados
    for (const key in voltageMap) {
        if (name.includes(key)) {
            return voltageMap[key];
        }
    }

    // Detecta padrão com 2 dígitos, tipo "10V53" ou "10P53"
    const match2 = name.match(/(\d{2})(V|P)(\d{2})/);
    if (match2) {
        return `${match2[1]},${match2[3]}V`;
    }

    // Padrão com 1 inteiro e 2 decimais, ex: 1P85 → 1,85V
    const match1p2 = name.match(/(\d)(V|P)(\d{2})/);
    if (match1p2) {
        return `${match1p2[1]},${match1p2[3]}V`;
    }

    // Detecta padrão com 1 dígito, tipo "1V8" ou "3P3"
    const match1 = name.match(/(\d)(V|P)(\d)/);
    if (match1) {
        return `${match1[1]},${match1[3]}V`;
    }

    return ''; // Se não reconhece, retorna vazio
}



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
        // renderBuffer();
        return false;
    }
}

function mouseReleased() {
    // Al soltar, se restaura el cursor por defecto
    cursor('default');
}

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
    // Inicializamos los límites mínimos y máximos en el eje X para los pines del lado "T"
    let topMinX = Infinity,    // El valor más pequeño que encontremos (comienza en +∞)
        topMaxX = -Infinity;   // El valor más grande que encontremos (comienza en -∞)

    // Recorremos todos los "parts"
    for (let part of parts) {
        // Nos interesa solo la parte que está en el lado "T" (Top)
        if (part.side === "T") {
            // Para cada pin de esa parte
            for (let pin of part.pins) {
                let r = pin.radius;  // Radio del pin

                // Calculamos el límite izquierdo del pin (x - r) y ajustamos topMinX si es menor
                if (pin.x - r < topMinX) {
                    topMinX = pin.x - r;
                }

                // Calculamos el límite derecho del pin (x + r) y ajustamos topMaxX si es mayor
                if (pin.x + r > topMaxX) {
                    topMaxX = pin.x + r;
                }
            }
        }
    }

    // La anchura total ocupada por los pines en X es (topMaxX - topMinX).
    // A ese valor le sumamos un margen adicional de 200 unidades y devolvemos el resultado.
    return (topMaxX - topMinX) + 200;
    // (En el pasado este margen era de 50, pero se amplió a 200)
}


function drawSelectedNetConnections() {
    if (netLines.length === 0) return;

    push();
    // Cor verde fixo
    stroke(0, 255, 0);
    strokeWeight(3 / scaleFactor); // Espessura proporcional ao zoom
    noFill();

    for (let seg of netLines) {
        line(seg.x1, seg.y1, seg.x2, seg.y2);
    }

    pop();
}




function actualizarRedSeleccionada() {
    if (!selectedPin) return;

    const netWorker = new Worker("netWorker.js");

    netWorker.postMessage({
        parts,
        selectedNet: selectedPin.net,
        displayMode,
        bottomOffset
    });

    netWorker.onmessage = function (e) {
        netLines = e.data.lines;
    };
}









function drawComponentBoundingBoxes() {
    for (let part of parts) {
        if (displayMode === "top" && part.side !== "T") continue;
        if (displayMode === "bottom" && part.side !== "B") continue;
        let groupOffset = (displayMode === "all" && part.side === "B") ? bottomOffset : 0;

        if (part.pins.length <= 1) continue; // saltamos si solo hay un pin

        // Inicializamos los extremos
        let minX = Infinity, minY = Infinity;
        let maxX = -Infinity, maxY = -Infinity;

        // Recorremos cada pin y extraemos sus vértices mundo
        for (let pin of part.pins) {
            if (pin.outline && pin.outline.length) {
                // Usamos cada vértice del outline
                for (let v of pin.outline) {
                    let wx = pin.x + v.x;
                    let wy = pin.y + v.y;
                    if (wx < minX) minX = wx;
                    if (wx > maxX) maxX = wx;
                    if (wy < minY) minY = wy;
                    if (wy > maxY) maxY = wy;
                }
            } else {
                // Fallback: bounding box del círculo/rectángulo alrededor del pin
                let r = pin.radius * 1.1;
                let wx1 = pin.x - r, wy1 = pin.y - r;
                let wx2 = pin.x + r, wy2 = pin.y + r;
                if (wx1 < minX) minX = wx1;
                if (wx2 > maxX) maxX = wx2;
                if (wy1 < minY) minY = wy1;
                if (wy2 > maxY) maxY = wy2;
            }
        }

        // Proyección a pantalla para visibilidad
       // Lista de vértices em coordenadas de mundo
let verts = [
    {x: minX + groupOffset, y: minY},
    {x: maxX + groupOffset, y: minY},
    {x: maxX + groupOffset, y: maxY},
    {x: minX + groupOffset, y: maxY}
];

// Projeção dos vértices para tela
let anyVisible = verts.some(v => {
    let s = worldToScreen(v.x, v.y);
    return (s.x >= 0 && s.x <= width && s.y >= 0 && s.y <= height);
});

// Se nenhum vértice está visível, pula
if (!anyVisible) continue;

       // Estilo según tipo de componente
if (part.name.startsWith("CN")) {
    // 🔸 conector
    strokeWeight(1 / scaleFactor);
    fill(255, 255, 255);  
    stroke(0, 0, 0);    // Borda cinza
 } else if (part.name.startsWith("L")) {
    
    strokeWeight(1 / scaleFactor);
    fill(255, 255, 255); 
    stroke(0, 0, 0);    
 } else if (part.name.startsWith("X")) {
    
    strokeWeight(1 / scaleFactor);
    fill(255, 255, 255); 
    stroke(0, 0, 0);    
} else if (part.name.startsWith("OSC")) {
    
    strokeWeight(1 / scaleFactor);
    fill(255, 255, 255); 
    stroke(0, 0, 0);   
} else if (part.name.startsWith("ANT")) {
    
    strokeWeight(1 / scaleFactor);
    fill(255, 255, 255); 
    stroke(0, 0, 0); 
 } else if (part.name.startsWith("MIC")) {
    
    strokeWeight(1 / scaleFactor);
    fill(255, 255, 255); 
    stroke(0, 0, 0);     

} else if (part.name.startsWith("U")) {
    
    strokeWeight(1 / scaleFactor);
    fill(255, 255, 255); 
    stroke(0, 0, 0);    
    } else if (part.name.startsWith("J")) {
    
    strokeWeight(1 / scaleFactor);
    fill(255, 255, 255); 
    stroke(0, 0, 0);    
  } else if (part.name.startsWith("N")) {
    
    strokeWeight(1 / scaleFactor);
    fill(255, 255, 255); 
    stroke(0, 0, 0);    
    } else if (part.name.startsWith("BTC")) {
    
    strokeWeight(1 / scaleFactor);
    fill(255, 255, 255); 
    stroke(0, 0, 0);    
    } else if (part.name.startsWith("H")) {
    
    strokeWeight(1 / scaleFactor);
    fill(255, 255, 255); 
    stroke(0, 0, 0);    
    } else if (part.name.startsWith("PA")) {
    
    strokeWeight(1 / scaleFactor);
    fill(255, 255, 255); 
    stroke(0, 0, 0);    
    } else if (part.name.startsWith("EMI")) {
    
    strokeWeight(1 / scaleFactor);
    fill(255, 255, 255); 
    stroke(0, 0, 0);  
    } else if (part.name.startsWith("SOC")) {
    
    strokeWeight(1 / scaleFactor);
    fill(255, 255, 255); 
    stroke(0, 0, 0);    
    } else if (part.name.startsWith("SIM")) {
    // 🔹 CI (Circuito Integrado)
    strokeWeight(1 / scaleFactor);
    fill(255, 255, 255); 
    stroke(0, 0, 0);    
    } else if (part.name.startsWith("CON")) {
    // 🔹 CI (Circuito Integrado)
    strokeWeight(1 / scaleFactor);
    fill(255, 255, 255); 
    stroke(0, 0, 0);    
} else if (part.name.startsWith("L")) {
    // 🔹 CI (Circuito Integrado)
    strokeWeight(1 / scaleFactor);
    fill(255, 255, 255); 
    stroke(150, 150, 150); 
    
    
} else if (part.name.startsWith("F")) {
    // 🔹 CI (Circuito Integrado)
    strokeWeight(1 / scaleFactor);
    fill(255, 255, 255); 
    stroke(0, 0, 0);    

} else if (part.name.startsWith("C")) {
  
       strokeWeight(1 / scaleFactor);
    fill(255, 255, 255);  
    stroke(0, 0, 0);    
} else if (part.name.startsWith("R")) {
  
    strokeWeight(1 / scaleFactor);
    fill(255, 255, 255);  
    stroke(0, 0, 0);    
} else if (part.name.startsWith("VR")) {
  
    strokeWeight(1 / scaleFactor);
    fill(255, 255, 255);  
    stroke(0, 0, 0);    
} else if (part.name.startsWith("ZD")) {
  
    strokeWeight(1 / scaleFactor);
    fill(255, 255, 255);  
    stroke(0, 0, 0);    
} else if (part.name.startsWith("D")) {
  
     strokeWeight(1 / scaleFactor);
    fill(255, 255, 255);  
    stroke(0, 0, 0);    


} else if (part.name.startsWith("TV")) {
  
     strokeWeight(1 / scaleFactor);
    fill(255, 255, 255);  
    stroke(0, 0, 0);    



} else {
    strokeWeight(2 / scaleFactor)
    // 🔘 Outros componentes
    noFill();
    stroke(0, 0, 0);      // Borda cinza
}

// *** CONFIGURAÇÃO DE SOMBRA ***
drawingContext.shadowColor = 'rgba(0, 0, 0, 1)'; // sombra preta, opacidade moderada
drawingContext.shadowBlur = 0;  // desfoque da sombra proporcional ao zoom
drawingContext.shadowOffsetX = 0;
drawingContext.shadowOffsetY = 0;

// Desenha o retângulo com sombra
rect(
    minX + groupOffset,
    minY,
    maxX - minX,
    maxY - minY
);

// Remove a sombra para não afetar próximos desenhos
drawingContext.shadowColor = 'transparent';
drawingContext.shadowBlur = 0;
drawingContext.shadowOffsetX = 0;
drawingContext.shadowOffsetY = 0;

    }
}





function drawPartNames() {
    push();
    resetMatrix();
    textAlign(CENTER, CENTER);
    textSize(12);
    fill(0);//COR DOS NOMES DOS COMPONENTES
    noStroke();

    for (let part of parts) {
        if (displayMode === "top" && part.side !== "T") continue;
        if (displayMode === "bottom" && part.side !== "B") continue;

        if (part.pins.length > 1) {
            let name = part.name.toUpperCase(); // Aseguramos todo en mayúsculas
            let firstChar = name.charAt(0);
            let firstTwoChars = name.substring(0, 2);
            let requiredZoom = 1.5; // Zoom por defecto

            if (firstChar === "J" || firstChar === "U" || firstTwoChars === "CN" || firstTwoChars === "SI" || firstTwoChars === "SO" || firstTwoChars === "HD" || firstTwoChars === "LE") {
                requiredZoom = 0.1;
            } else if (firstChar === "R") {
                requiredZoom = 1.0;
            }

            if (scaleFactor < requiredZoom) continue;

            let groupOffset = (displayMode === "all" && part.side === "B") ? bottomOffset : 0;
            let sumX = 0, sumY = 0;

            for (let pin of part.pins) {
                sumX += pin.x;
                sumY += pin.y;
            }

            let centerX = sumX / part.pins.length + groupOffset;
            let centerY = sumY / part.pins.length;
            let screenPos = worldToScreen(centerX, centerY);

            // ✨ Solo si está dentro del canvas
            if (
                screenPos.x >= 0 && screenPos.x <= width &&
                screenPos.y >= 0 && screenPos.y <= height
            ) {
                text(part.name, screenPos.x, screenPos.y);
            }
        }

    }

    pop();
}

function drawPinNumbers() {
    // Solo pintar cuando estemos bastante cerca
    const requiredZoomPin = 1.0;
    if (scaleFactor < requiredZoomPin) return;

    // 1) Cálculo de la ventana en mundo
    const topLeftWorld = screenToWorld(0, 0);
    const bottomRightWorld = screenToWorld(width, height);
    const worldMinX = Math.min(topLeftWorld.x, bottomRightWorld.x);
    const worldMaxX = Math.max(topLeftWorld.x, bottomRightWorld.x);
    const worldMinY = Math.min(topLeftWorld.y, bottomRightWorld.y);
    const worldMaxY = Math.max(topLeftWorld.y, bottomRightWorld.y);

    push();
    resetMatrix();
    textAlign(CENTER, CENTER);
    noStroke();
    fill(80);//COR DOS NÚMEROS E MALHAS DOS PINOS

    for (let part of parts) {
        if (displayMode === "top" && part.side !== "T") continue;
        if (displayMode === "bottom" && part.side !== "B") continue;
        let groupOffset = (displayMode === "all" && part.side === "B") ? bottomOffset : 0;

        for (let pin of part.pins) {
            // Coordenadas mundo del centro
            let worldX = pin.x + groupOffset;
            let worldY = pin.y;

            // Filtrado rápido en mundo (por radio)
            let r = pin.radius;
            if (
                worldX + r < worldMinX || worldX - r > worldMaxX ||
                worldY + r < worldMinY || worldY - r > worldMaxY
            ) continue;

            // Transformamos al espacio de pantalla
            let screenPos = worldToScreen(worldX, worldY);
            if (
                screenPos.x < 0 || screenPos.x > width ||
                screenPos.y < 0 || screenPos.y > height
            ) continue;

            // Calculamos tamaño de texto según diámetro de pad en pantalla
            const screenDiameter = pin.radius * scaleFactor;
            const ts = screenDiameter * 0.2;//tamanho do texto
            textSize(ts);//tamanho do texto

            // Si name === number, solo mostramos name en el centro
            if (pin.name === pin.number) {
                const offsetNum = -ts * 0.4;
                const offsetName = ts * 0.6;
                text(pin.name, screenPos.x, screenPos.y + offsetNum);
                text(pin.net, screenPos.x, screenPos.y + offsetName);
            } else {
                // Número arriba y nombre abajo, ambos dentro de la almohadilla
                const offsetNum = -ts * 0.4;
                const offsetName = ts * 0.6;
                text(pin.name, screenPos.x, screenPos.y + offsetNum);
                text(pin.net, screenPos.x, screenPos.y + offsetName);
            }
        }
    }

    pop();
}


function parseFile() {
    parserWorker = new Worker("parserWorker.js");
    parserWorker.postMessage(fileContent);

    parserWorker.onmessage = function (e) {
        parts = e.data.parts;
        outlinePoints = e.data.outlinePoints;
        imageUrl = e.data.imageUrl || null; // <- Capturamos y controlamos si no está

        fillComponentDatalist();
        fillNetDatalist();

        // Llamar al outlineWorker para calcular transformación
        const outlineWorker = new Worker("outlineWorker.js");
        outlineWorker.postMessage({
            outlinePoints,
            canvasWidth: width,
            canvasHeight: height
        });

        outlineWorker.onmessage = function (e) {
            outlineWidth = e.data.outlineWidth;
            scaleFactor = e.data.scaleFactor;
            offsetX = e.data.offsetX;
            offsetY = e.data.offsetY;

            // Aquí puedes llamar a tu función que dibuja o inicializa el canvas
            //itSketch(parts, outlinePoints, imageUrl); // <- Pasa el fondo
        };
    };
}


/////
function centerOnNet(netName) {
    netName = netName.trim().toLowerCase();
    for (let part of parts) {
        for (let pin of part.pins) {
            if (pin.net && pin.net.toLowerCase() === netName) {
                if (displayMode !== "all") {
                    if (part.side === "T" && displayMode !== "top") {
                        displayMode = "top";
                        flipHorizontal = true;
                    } else if (part.side === "B" && displayMode !== "bottom") {
                        displayMode = "bottom";
                        flipHorizontal = false;
                    }
                }

                let groupOffset =
                    displayMode === "all" && part.side === "B" ? computeBottomOffset() : 0;

                selectedPin = pin;
                tooltip = {
                    text: `Parte: ${part.name}\nNet: ${pin.net}`,
                    x: pin.x,
                    y: pin.y,
                    side: part.side,
                };

                offsetX = width / 2 - (pin.x + groupOffset) * scaleFactor;
                offsetY = height / 2 - pin.y * scaleFactor;

                console.log(`Centrándose en net: ${pin.net} (${part.name})`);
                return;
            }
        }
    }
    console.log("Net no encontrada:", netName);
}
function setupNetInputListener() {
    let netInput = select('#netInput');
    netInput.input(() => {
        let value = netInput.value().trim();
        if (value.length > 0) {
            centerOnNet(value);
        }
    });
}


/////

function manhattanDistance(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}
function fillComponentDatalist() {
    console.log("Parts:", parts); // 👈 Verifica que tenga datos
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

function fillNetDatalist() {
    let netList = select('#netList');
    netList.html('');

    let nets = new Set();

    for (let part of parts) {
        for (let net of part.nets) {
            nets.add(net);
        }
    }

    for (let net of nets) {
        let option = document.createElement('option');
        option.value = net;
        netList.elt.appendChild(option);
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
        //selectedPin = foundPart.pins[0];
        //renderBuffer();
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
                flipHorizontal = true;
            } else if (nextItem.partSide === "B" && displayMode !== "bottom") {
                displayMode = "bottom";
                flipHorizontal = false;
            }
        }
        let groupOffset =
            displayMode === "all" && nextItem.partSide === "B" ? bottomOffset : 0;
        selectedPin = nextItem.pin;
        actualizarRedSeleccionada();

        tooltip = {
            text: `Parte: ${nextItem.partName}\nNet: ${nextItem.pin.net}`,
            x: nextItem.pin.x,
            y: nextItem.pin.y,
            side: nextItem.partSide,
        };
        offsetX = width / 2 - (selectedPin.x + groupOffset) * scaleFactor;
        offsetY = height / 2 - selectedPin.y * scaleFactor;
        //renderBuffer();
    }
}

function centerAndFitView() {
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;

    for (let part of parts) {
        // Opcional: si quieres filtrar por displayMode
        if (displayMode !== "all" && part.side !== (displayMode === "top" ? "T" : "B")) continue;

        for (let pin of part.pins) {
            let x = pin.x + ((displayMode === "all" && part.side === "B") ? bottomOffset : 0);
            let y = pin.y;
            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
        }
    }

    // Margen visual
    const padding = 80;

    let contentWidth = maxX - minX + padding * 2;
    let contentHeight = maxY - minY + padding * 2;

    // Calcula el mejor zoom que cabe en el canvas
    scaleFactor = Math.min(width / contentWidth, height / contentHeight);

    // Centra el contenido
    offsetX = width / 2 - (minX + (maxX - minX) / 2) * scaleFactor;
    offsetY = height / 2 - (minY + (maxY - minY) / 2) * scaleFactor;

    //renderBuffer();
}



function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    //renderBuffer(); // Vuelve a dibujar el contenido después del ajuste
}

function keyPressed() {
    if (document.activeElement.tagName === "INPUT") {
        return; // Permite escribir en el input
    }
    return false; // Evita que p5.js bloquee la entrada
}






