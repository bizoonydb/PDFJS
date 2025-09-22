// Variables globales
let parts = [];       // array de componentes
let netLines = [];    // array de linhas
let canvasWidth, canvasHeight;
let fileContent;
let selectedNets = []; // aqui vamos guardar as nets clicadas
let dataLoaded = false;
let outlinePoints = [];
let flipHorizontal = true; // Estado del reflejo
// Variables para transformación global
let scaleFactor = 1;
let rotationAngle = Math.PI; // Inicialmente 180° (en radianes)
let offsetX = 0;
let offsetY = 0;
let pinScaleFactor = 1; // Ajusta según lo necesites //1
let isDragging = false;

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
let bgImage; // Variável global para armazenar a imagem de fundo
let showBg = true; // controla a exibição da imagem


function setup() {
    canvasWidth = windowWidth;
    canvasHeight = windowHeight;
    createCanvas(canvasWidth, canvasHeight);
    
    frameRate(20);

    buffer = createGraphics(width, height); // buffer do canvas

    // Só processa após carregar o arquivo
    parseFile();            // fileContent já foi carregado no preload
    calcularTransformacion();
    renderBuffer();










const modal = document.getElementById("modalNets");
const overlay = document.getElementById("overlay");
const btnAbrir = document.getElementById("btnAbrirModal");
const btnSalvar = document.getElementById("btnSalvarModal");
const btnFechar = document.getElementById("btnFecharModal");
const modalContent = document.getElementById("modalNetsContent");

function abrirModal() {
    modalContent.innerHTML = "";

    const seenColors = new Set();

    selectedNets.forEach((netObj, index) => {
        const colorKey = (netObj.color || [255,0,0]).join(",");
        if (seenColors.has(colorKey)) return; // pula cores repetidas
        seenColors.add(colorKey);

        const row = document.createElement("div");
        row.classList.add("net-row");

        const colorBox = document.createElement("div");
        colorBox.classList.add("net-color");
        const [r,g,b] = netObj.color || [255,0,0];
        colorBox.style.backgroundColor = `rgb(${r},${g},${b})`;

        const input = document.createElement("input");
        input.type = "text";
        input.value = netObj.net;
        input.dataset.index = index;

        row.appendChild(colorBox);
        row.appendChild(input);
        modalContent.appendChild(row);
    });

    modal.style.display = "flex";
    overlay.style.display = "block";
}

function fecharModal() {
    modal.style.display = "none";
    overlay.style.display = "none";
}

btnAbrir.addEventListener("click", abrirModal);
btnFechar.addEventListener("click", fecharModal);
overlay.addEventListener("click", fecharModal);

btnSalvar.addEventListener("click", () => {
    const inputs = modalContent.querySelectorAll("input");
    inputs.forEach(input => {
        const idx = input.dataset.index;
        selectedNets[idx].net = input.value;
    });
    console.log("Nets atualizadas:", selectedNets);
    fecharModal();
});






const btnRenomear = document.getElementById("btnRenomearPDF");
const titleModal = document.getElementById("titleModal");
const pdfTitleInput = document.getElementById("pdfTitleInput");
const confirmBtn = document.getElementById("confirmTitleBtn");
const cancelBtn = document.getElementById("cancelTitleBtn");

let pdfTitle = "Layout Eletrônico"; // título padrão

// Abre modal
btnRenomear.addEventListener("click", () => {
    pdfTitleInput.value = pdfTitle; // preenche com valor atual
    titleModal.style.display = "flex";
});

// Confirma título
confirmBtn.addEventListener("click", () => {
    pdfTitle = pdfTitleInput.value || "Layout Eletrônico";
    titleModal.style.display = "none";
});

// Cancela modal
cancelBtn.addEventListener("click", () => {
    titleModal.style.display = "none";
});








document.getElementById("btnExportar").addEventListener("click", () => {
    try {
        const { jsPDF } = window.jspdf;

        if (!outlinePoints.length) {
            alert("Layout não carregado!");
            return;
        }
 // --- Função de cor conforme o nome do componente ---
        function determineFillColorPDF(part) {
            if (part.name.startsWith("CON")) {
                return [50, 50, 50];
                } else if (part.name.startsWith("C")) {
                return [180, 120, 80];
            } else if (part.name.startsWith("R")) {
                return [50, 50, 50];
                } else if (part.name.startsWith("TVS")) {
                return [50, 50, 50];
            } else if (part.name.startsWith("MIC")) {
                return [255, 255, 150];
            } else if (part.name.startsWith("N")) {
                return [10, 10, 10];
            } else if (part.name.startsWith("L")) {
                return [30, 30, 30];
            } else if (part.name.startsWith("ZD")) {
                return [80, 80, 80];
            } else if (part.name.startsWith("U") || part.name.startsWith("u")) {
                return [10, 10, 10];
            } else if (part.name.startsWith("S")) {
                return [128, 128, 128];
            } else if (part.name.startsWith("H")) {
                return [50, 50, 50];
            } else if (part.name.startsWith("J")) {
                return [50, 50, 50];
            } else if (part.name.startsWith("D")) {
                return [80, 80, 80];
            } else if (part.name.startsWith("Q")) {
                return [80, 80, 80];
            } else if (part.name.startsWith("RF")) {
                return [255, 255, 0];
            } else if (part.name.startsWith("ANT")) {
                return [128, 128, 128];
            } else if (part.name.startsWith("PA")) {
                return [50, 50, 50];
            } else if (part.name.startsWith("F")) {
                return [0, 0, 255];
            } else {
                return [200, 200, 200]; // cor padrão
            }
        }
        // --- Limites do layout ---
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        outlinePoints.forEach(p => {
            minX = Math.min(minX, p.x);
            minY = Math.min(minY, p.y);
            maxX = Math.max(maxX, p.x);
            maxY = Math.max(maxY, p.y);
        });

        parts.forEach(part => {
            part.pins.forEach(pin => {
                if (pin.outlineRelative && pin.outlineRelative.length >= 4) {
                    for (let i = 0; i < pin.outlineRelative.length; i += 2) {
                        let x = pin.x + pin.outlineRelative[i];
                        let y = pin.y + pin.outlineRelative[i + 1];
                        minX = Math.min(minX, x);
                        minY = Math.min(minY, y);
                        maxX = Math.max(maxX, x);
                        maxY = Math.max(maxY, y);
                    }
                } else {
                    minX = Math.min(minX, pin.x - (pin.radius || 2));
                    minY = Math.min(minY, pin.y - (pin.radius || 2));
                    maxX = Math.max(maxX, pin.x + (pin.radius || 2));
                    maxY = Math.max(maxY, pin.y + (pin.radius || 2));
                }
            });
        });

        const contentWidth = maxX - minX;
        const contentHeight = maxY - minY;

        // --- Página A4 landscape ---
        const pageWidth = 297 * 3.78;   // ~1122 px
        const pageHeight = 210 * 3.78;  // ~794 px
        const margin = 20;

        // --- Escala proporcional ---
        const scaleX = (pageWidth - 2 * margin) / contentWidth;
        const scaleY = (pageHeight - 2 * margin) / contentHeight;
        const scale = Math.min(scaleX, scaleY);

        // --- Offsets para centralizar ---
        const extraX = (pageWidth - contentWidth * scale) / 2 - margin;
        const extraY = (pageHeight - contentHeight * scale) / 2 - margin;

        const scaleCoord = (x, y) => ({
            x: (x - minX) * scale + margin + extraX,
            y: pageHeight - ((y - minY) * scale + margin + extraY)
        });

        // --- Cria PDF ---
        const pdf = new jsPDF({ unit: 'px', format: [pageWidth, pageHeight], orientation: 'landscape' });
        
        // --- Logo acima do título ---
const logoImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgZlNe2A7MY8TOyZ9siR_7OWDLjTvJWxLLUw&s"; // ou sua base64
const logoWidth = 60;   // largura da logo
const logoHeight = 60;  // altura da logo
const logoX = (pageWidth - logoWidth) / 2; // centralizado horizontalmente
const logoY = 20; // distância do topo da página

pdf.addImage(logoImg, 'PNG', logoX, logoY, logoWidth, logoHeight);
        // --- Configurações do título ---
const mainTitle = pdfTitle || "Layout Eletrônico"; // título definido pelo modal
const subTitle = "DIGITAL BOARD, ESQUEMAS DIGITALIZADOS";
const footerText = "+55(33)98444-4376 - DIGITAL BOARD";

// --- Parâmetros do título ---
pdf.setFont("helvetica", "bold");
pdf.setFontSize(50); // tamanho grande do título
const paddingX = 20; // padding horizontal do fundo
const paddingY = 20; // padding vertical do fundo

// Calcula largura do texto para a caixa de fundo
const titleWidth = pdf.getTextWidth(mainTitle);
const titleHeight = 50; // altura da caixa do fundo

// Define posição (centralizado horizontalmente, um pouco abaixo do topo)
const titleX = (pageWidth - titleWidth - paddingX * 2) / 2;
const titleY = 80; // posição do topo da caixa

// Desenha fundo amarelo com bordas arredondadas
pdf.setFillColor(255, 255, 0); // amarelo
pdf.setDrawColor(0, 0, 0);     // borda preta
pdf.setLineWidth(2);
pdf.roundedRect(titleX, titleY, titleWidth + paddingX * 2, titleHeight, 10, 10, 'FD');

// Texto do título centralizado
pdf.setTextColor(0, 0, 0);
pdf.text(mainTitle, pageWidth / 2, titleY + titleHeight / 2, { align: "center", baseline: "middle" });

// --- Subtítulo abaixo do título ---
pdf.setFontSize(20);
pdf.setFont("helvetica", "normal");
pdf.text(subTitle, pageWidth / 2, titleY + titleHeight + 10, { align: "center", baseline: "middle" });
// --- Rodapé ---
pdf.setFontSize(12);
pdf.setFont("helvetica", "normal");

// Define posição centralizada para o texto e imagem
const footerY = pageHeight - 20;
const iconSize = 22; // tamanho do ícone
const text = " +55(33)98444-4376 - DIGITAL BOARD";

// Calcula largura do texto
const textWidth = pdf.getTextWidth(text);
const startX = (pageWidth - (iconSize + 5 + textWidth)) / 2; // 5px de espaçamento
const whatsappIcon = "https://static.vecteezy.com/system/resources/previews/018/930/564/non_2x/whatsapp-logo-whatsapp-icon-whatsapp-transparent-free-png.png"; // ou base64

// Desenha ícone WhatsApp
pdf.addImage(whatsappIcon, 'PNG', startX, footerY - iconSize + 2, iconSize, iconSize);

// Ajusta Y do texto para alinhar verticalmente com o ícone
const textY = footerY - iconSize / 4; // subindo um pouco para centralizar
pdf.text(text, startX + iconSize + 5, textY, { align: "left", baseline: "middle" });



        // --- Imagem de fundo invertida, se existir ---
        if (bgImage) {
            const tempCanvas = document.createElement("canvas");
            tempCanvas.width = bgImage.width;
            tempCanvas.height = bgImage.height;
            const tempCtx = tempCanvas.getContext("2d");
            tempCtx.drawImage(bgImage.canvas || bgImage.elt || bgImage, 0, 0);

           

            const imgBase64 = tempCanvas.toDataURL("image/png");

            const imgWidth = contentWidth * scale;
            const imgHeight = contentHeight * scale;
            const imgX = margin + extraX;
            const imgY = pageHeight - margin - imgHeight - extraY;
            pdf.addImage(imgBase64, 'PNG', imgX, imgY, imgWidth, imgHeight);
       }
// --- Rodapé com nomes das nets maiores e em negrito com bordas arredondadas ---
if (selectedNets && selectedNets.length > 0) {
    const boxHeight = 150 * scale;   // Altura da caixa
    const spacing = 15;              // Espaçamento entre caixas
    const borderRadius = 15;         // Raio das bordas arredondadas

    const uniqueNets = [];
    const usedColors = [];
    selectedNets.forEach(n => {
        const colorKey = (n.color || [255, 0, 0]).join(",");
        if (!usedColors.includes(colorKey)) {
            usedColors.push(colorKey);
            uniqueNets.push(n);
        }
    });

    let totalWidth = 0;
    const boxWidths = uniqueNets.map(netObj => {
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(90 * scale);   // Texto bem grande
        const w = pdf.getTextWidth(netObj.net) + 40; // Padding horizontal maior
        totalWidth += w;
        return w;
    });
    totalWidth += spacing * (uniqueNets.length - 1);

    let xOffset = (pageWidth - totalWidth) / 2;
    const yOffset = pageHeight - boxHeight - 50; // Mais pra cima que antes

    uniqueNets.forEach((netObj, i) => {
        const color = netObj.color || [255, 0, 0];
        pdf.setFillColor(...color);
        pdf.setDrawColor(...color);
        const text = netObj.net;
        const boxWidth = boxWidths[i];

        // Caixa com bordas arredondadas
        pdf.roundedRect(xOffset, yOffset, boxWidth, boxHeight, borderRadius, borderRadius, 'F');

        // Texto centralizado
        pdf.setTextColor(0, 0, 0);
        pdf.text(text, xOffset + boxWidth / 2, yOffset + boxHeight / 2, {
            align: 'center',
            baseline: 'middle'
        });

        xOffset += boxWidth + spacing;
    });
}










// --- Desenha os componentes ---
parts.forEach(part => {
    if (part.outline && part.outline.length) {
        const fillColor = determineFillColorPDF(part);
        pdf.setFillColor(...fillColor);
        pdf.setDrawColor(0, 0, 0);      // Cor da borda
        pdf.setLineWidth(0.5 * scale);  // Largura da borda

        // Calcula bounding box do componente
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        for (let i = 0; i < part.outline.length; i += 2) {
            const x = part.origin.x + part.outline[i];
            const y = part.origin.y + part.outline[i + 1];
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
        }
        const topLeft = scaleCoord(minX, minY);
        const bottomRight = scaleCoord(maxX, maxY);
        const width = bottomRight.x - topLeft.x;
        const height = topLeft.y - bottomRight.y; // invertido pelo PDF

        // Preenche e desenha contorno do componente
        if (part.pins.length < 3) {
            const radius = Math.min(width, height) * 0.1; // ajuste o raio
            pdf.roundedRect(topLeft.x, bottomRight.y, width, height, radius, radius, 'FD'); // Fill + Draw
        } else {
            pdf.rect(topLeft.x, bottomRight.y, width, height, 'FD'); // Fill + Draw
        }
    }
});
// --- Pinos ---
// --- Pinos ---
parts.forEach(part => {
    const moreThanSixPins = part.pins.length > 6;
    const applyYellowCopper = moreThanSixPins && (
        part.name.startsWith("J") ||
        part.name.startsWith("SOC") ||
        
        part.name.startsWith("CON")
    );

    part.pins.forEach(pin => {
        pdf.setLineWidth(0.5 * scale);
        const label = pin.name || "";

        // Cores padrão
        let fill = [180,180,180];
        let stroke = [0,0,0];

        // GND ou NC
        if ((pin.net || "").toUpperCase().includes("GND")) {
            fill = [180,180,180];
            stroke = [80,80,80];
        } else if ((pin.net || "").toUpperCase().includes("NC")) {
            fill = [150,150,255];
            stroke = [0,0,0];
        }

        // Se o componente for J, SOC ou CON e tiver mais de 6 pinos
        if (applyYellowCopper && pin.outlineRelative && pin.outlineRelative.length >= 4) {
            fill = [205,127,50]; // amarelo cobre
            stroke = [0,0,0];
        }

        pdf.setFillColor(...fill);
        pdf.setDrawColor(...stroke);

        let centerX, centerY;

        if (pin.outlineRelative && pin.outlineRelative.length >= 4) {
            const points = [];
            for (let i = 0; i < pin.outlineRelative.length; i += 2) {
                points.push(scaleCoord(pin.x + pin.outlineRelative[i], pin.y + pin.outlineRelative[i+1]));
            }

            let minX = Math.min(...points.map(p => p.x));
            let minY = Math.min(...points.map(p => p.y));
            let maxX = Math.max(...points.map(p => p.x));
            let maxY = Math.max(...points.map(p => p.y));

            const width = maxX - minX;
            const height = maxY - minY;
            const radius = Math.min(width, height) * 0.2;

            pdf.roundedRect(minX, minY, width, height, radius, radius, 'FD');

            centerX = minX + width/2;
            centerY = minY + height/2;
        } else {
            const pos = scaleCoord(pin.x, pin.y);
            const r = (pin.radius || 2) * scale;
            pdf.circle(pos.x, pos.y, r, 'FD');
            centerX = pos.x;
            centerY = pos.y;
        }

        if (label) {
            pdf.setFontSize(6 * scale);
            pdf.setTextColor(0,0,0);
            pdf.text(label, centerX, centerY, {align:"center", baseline:"middle"});
        }
    });
});





        // --- Nets selecionadas com roteamento evitando sobreposição ---
// --- Nets selecionadas com L offset ---
if (selectedNets && selectedNets.length > 0) {
    const netsMap = {};
    const offsetMap = {}; // armazena deslocamentos por coordenada

    selectedNets.forEach(sel => {
        if (!netsMap[sel.net]) netsMap[sel.net] = [];
        netsMap[sel.net].push(sel.id);
    });

    for (let netName in netsMap) {
        const color = selectedNets.find(n => n.net === netName)?.color || [255, 0, 0];
        pdf.setLineWidth(1.5 * scale);
        pdf.setDrawColor(...color);

        const connectedPoints = [];
        for (let pinId of netsMap[netName]) {
            for (let part of parts) {
                const groupOffset = (displayMode === "all" && part.side === "B") ? bottomOffset : 0;
                for (let pin of part.pins) {
                    const currentId = `${part.name}_${pin.name}`;
                    if (currentId === pinId) {
                        let centerX, centerY;
                        if (pin.outlineRelative && pin.outlineRelative.length >= 4) {
                            let sumX = 0, sumY = 0, count = 0;
                            for (let i = 0; i < pin.outlineRelative.length; i += 2) {
                                sumX += pin.x + pin.outlineRelative[i] + groupOffset;
                                sumY += pin.y + pin.outlineRelative[i + 1];
                                count++;
                            }
                            centerX = sumX / count;
                            centerY = sumY / count;
                        } else {
                            centerX = pin.x + groupOffset;
                            centerY = pin.y;
                        }
                        connectedPoints.push({ pin, center: scaleCoord(centerX, centerY) });
                    }
                }
            }
        }

        for (let i = 1; i < connectedPoints.length; i++) {
    const p1 = connectedPoints[i - 1].center;
    const p2 = connectedPoints[i].center;

    const keyH = `H_${Math.round(p1.y)}`;
    const keyV = `V_${Math.round(p1.x)}`;
    if (!offsetMap[keyH]) offsetMap[keyH] = 0;
    if (!offsetMap[keyV]) offsetMap[keyV] = 0;

    const step = 4 * scale;
    const offsetPerp = (offsetMap[keyH] + offsetMap[keyV]) * step;

    if (Math.abs(p2.x - p1.x) > Math.abs(p2.y - p1.y)) {
        // horizontal primeiro
        const midX = p2.x;
        const midY = p1.y + offsetPerp;

        // Linha do pino 1 até o ponto de saída horizontal (com offset)
        pdf.line(p1.x, p1.y, p1.x, p1.y + offsetPerp);
        // Linha horizontal desviado
        pdf.line(p1.x, p1.y + offsetPerp, midX, midY);
        // Linha vertical até o centro do pino 2
        pdf.line(midX, midY, p2.x, p2.y);
        // Linha do ponto de chegada até o centro do pino 2 (fecha)
        pdf.line(p2.x, p2.y, p2.x, midY);
    } else {
        // vertical primeiro
        const midX = p1.x + offsetPerp;
        const midY = p2.y;

        // Linha do pino 1 até o ponto de saída vertical (com offset)
        pdf.line(p1.x, p1.y, p1.x + offsetPerp, p1.y);
        // Linha vertical desviado
        pdf.line(p1.x + offsetPerp, p1.y, midX, midY);
        // Linha horizontal até o centro do pino 2
        pdf.line(midX, midY, p2.x, p2.y);
        // Linha do ponto de chegada até o centro do pino 2 (fecha)
        pdf.line(p2.x, p2.y, midX, p2.y);
    }

    offsetMap[keyH]++;
    offsetMap[keyV]++;
}


        // --- Desenha os pads ---
        connectedPoints.forEach(({ pin, center }) => {
            pdf.setFillColor(...color);
            

            if (pin.outlineRelative && pin.outlineRelative.length >= 4) {
                const points = [];
                for (let i = 0; i < pin.outlineRelative.length; i += 2) {
                    points.push(scaleCoord(pin.x + pin.outlineRelative[i], pin.y + pin.outlineRelative[i + 1]));
                }
                let minX = Math.min(...points.map(p => p.x));
                let minY = Math.min(...points.map(p => p.y));
                let maxX = Math.max(...points.map(p => p.x));
                let maxY = Math.max(...points.map(p => p.y));
                const width = maxX - minX;
                const height = maxY - minY;
                const radius = Math.min(width, height) * 0.2;
                pdf.roundedRect(minX, minY, width, height, radius, radius, 'FD');
            } else {
                const r = (pin.radius || 2) * scale;
                pdf.circle(center.x, center.y, r, 'FD');
            }
        });
    }
}


// --- Marca d'água ---
const watermarkText = "DIGITAL BOARD";
const fontSize = 12;          // tamanho pequeno
const angle = -30;            // ângulo em graus
const spacingX = 150;         // espaçamento horizontal
const spacingY = 100;         // espaçamento vertical

pdf.setFont("helvetica", "bold");
pdf.setFontSize(fontSize);

// Define opacidade (0 = invisível, 1 = totalmente opaco)
pdf.setGState(new pdf.GState({ opacity: 0.2})); // 10% visível

for (let x = -pageWidth; x < pageWidth * 2; x += spacingX) {
    for (let y = -pageHeight; y < pageHeight * 2; y += spacingY) {
        pdf.text(watermarkText, x, y, {
            align: "left",
            baseline: "top",
            angle: angle
        });
    }
}

// Volta à opacidade normal para outros elementos
pdf.setGState(new pdf.GState({ opacity: 1 }));



        // --- Nomes dos componentes por cima de tudo ---
parts.forEach(part => {
    if (part.name && part.pins.length) {
        let sumX = 0, sumY = 0;
        part.pins.forEach(pin => { sumX += pin.x; sumY += pin.y; });
        const center = scaleCoord(sumX / part.pins.length, sumY / part.pins.length);
        pdf.setFontSize(10 * scale);
        pdf.setTextColor(0, 0, 0);
        pdf.text(part.name, center.x, center.y, { align: "center", baseline: "middle" });
    }
});

        // --- Salva PDF ---
        pdf.save("layout_completo.pdf");
        console.log("PDF gerado com sucesso!");

    } catch(e) {
        console.error("Erro ao gerar PDF:", e);
    }
});












     
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
    // Botão para mostrar/ocultar imagem de fundo
   
    let searchInput = document.getElementById("searchComponent");

    searchInput.addEventListener("mousedown", (event) => {
        event.stopPropagation(); // Evita que p5.js intercepte el evento
    });
     // Conecta o botão ao evento
     const toggleBtn = document.getElementById('toggleBgBtn');
      toggleBtn.addEventListener('click', (event) => {
      event.preventDefault(); // impede recarregamento ou comportamento padrão
     showBg = !showBg;
    });
 


    fillComponentDatalist();
    setupSearchListener();

}

 
 let blinkState = 0;  // Controla o estado de piscamento
 let blinkInterval = 15;  // Intervalo em frames para alternar as cores (ajuste conforme necessário)
 
 function draw() {
    
    background(255);
   
    // T1: Rotação global centrada no canvas
    push();
    
    translate(width / 2, height / 2);
    rotate(rotationAngle);
    translate(-width / 2, -height / 2);

       if (!outlinePoints || outlinePoints.length === 0) return;

    // Loop seguro
    for (let i = 0; i < outlinePoints.length; i++) {
        let p = outlinePoints[i];
        if (!p) continue; // pula elementos indefinidos
        ellipse(p.x, p.y, 5, 5);
    }

  
    if (displayMode === "all") {
      bottomOffset = computeBottomOffset();
    }
  
    // T2: Reflejo horizontal (flip horizontal) se ativado
    push();
    if (flipHorizontal) {
      translate(width, 0);
      scale(-1, 1);
    }
  
    // T3: Translação e escala (zoom/pan)
    push();
    translate(offsetX, offsetY);
    scale(scaleFactor);
  
      
  
    // 🔽 Desenha a imagem de fundo com zoom e pan aplicados
    drawBackgroundImage();
    
    
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
      
      
      push();

pop();

      
      
drawComponentBoundingBoxes();
      
 
   let threshold = 1.1; // Distância mínima entre pontos para considerar duplicados
   let minSegmentLength = 2; // Tamanho mínimo de segmento de linha para ser considerado válido (ajustável)
   
   function arePointsClose(p1, p2, threshold) {
       return dist(p1.x, p1.y, p2.x, p2.y) < threshold;
   }
   
   function filterOutlinePoints(outlinePoints, threshold) {
       let filteredPoints = [outlinePoints[0]];
       for (let i = 1; i < outlinePoints.length; i++) {
           let currentPoint = outlinePoints[i];
           let lastAddedPoint = filteredPoints[filteredPoints.length - 1];
           if (!arePointsClose(lastAddedPoint, currentPoint, threshold)) {
               filteredPoints.push(currentPoint);
           }
       }
       return filteredPoints;
   }
   
   function segmentLength(p1, p2) {
       return dist(p1.x, p1.y, p2.x, p2.y);
   }
   
   function removeSmallSegments(points, minLength) {
       let cleanedPoints = [points[0]];
       for (let i = 1; i < points.length; i++) {
           let currentPoint = points[i];
           let lastAddedPoint = cleanedPoints[cleanedPoints.length - 1];
           if (segmentLength(lastAddedPoint, currentPoint) > minLength) {
               cleanedPoints.push(currentPoint);
           }
       }
       return cleanedPoints;
   }
   
   function simplifyContour(points, epsilon) {
       if (points.length < 3) return points;
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
   
   function perpendicularDistance(pt, lineStart, lineEnd) {
       let normalLength = dist(lineStart.x, lineStart.y, lineEnd.x, lineEnd.y);
       return Math.abs((pt.x - lineStart.x) * (lineEnd.y - lineStart.y) - (pt.y - lineStart.y) * (lineEnd.x - lineStart.x)) / normalLength;
   }
   
   let filteredOutlinePoints = filterOutlinePoints(outlinePoints, threshold);
   let cleanedOutlinePoints = removeSmallSegments(filteredOutlinePoints, minSegmentLength);
   let simplifiedOutlinePoints = simplifyContour(cleanedOutlinePoints, 0.5);
   
   // Preenche a área dentro do contorno com verde
   fill(255, 255, 255, 0,); // Verde para representar a placa
   stroke(255, 255, 255, 0,); // Borda branca
   strokeWeight(1 / scaleFactor);
   beginShape();
   for (let p of simplifiedOutlinePoints) {
       vertex(p.x, p.y);
   }
   endShape(CLOSE);
   

    // -----------------------------------------

     
      
    // Dibujar el buffer
    image(buffer, 0, 0);
    

    // Atualiza o estado de piscamento
blinkState = (frameCount % blinkInterval < blinkInterval / 2) ? 255 : 0;  // Alterna entre 255 e 0 a cada intervalo
 drawPartNames();
// Desenha os pinos com efeito de piscar
/// Desenha os pinos com efeito de piscar
if (scaleFactor >= 0.2) {
    for (let part of parts) {
        if (displayMode === "top" && part.side !== "T") continue;
        if (displayMode === "bottom" && part.side !== "B") continue;

        let groupOffset = (displayMode === "all" && part.side === "B") ? bottomOffset : 0;

        for (let pin of part.pins) {
            // Calcular posição do pino na tela (uma vez só)
            let screenX = (pin.x + groupOffset) * scaleFactor + offsetX;
            let screenY = pin.y * scaleFactor + offsetY;

            // IGNORAR pino se estiver fora da tela — melhora o desempenho
            if (screenX < -20 || screenX > width + 20 || screenY < -20 || screenY > height + 20) continue;

            // A partir daqui, só processa pinos realmente visíveis
            let enlargedRadius = pin.radius * 1.9;
            let isPPnV = typeof pin.net === "string" && /^PP[0-9]V/.test(pin.net);

            noStroke();

            // Aplica a cor piscando ao pino selecionado e pinos conectados
            if (selectedPin === pin || (selectedPin && pin.net === selectedPin.net)) {
                fill(blinkState === 255 ? color(255, 0, 255) : color(100, 180, 100));
            } else if (typeof pin.net === "string" && pin.net.startsWith("VB")) {
                fill(255, 0, 0);
            } else if (typeof pin.net === "string" && pin.net.startsWith("VSW")) {
                fill(230, 200, 100);
            } else if (typeof pin.net === "string" && pin.net.startsWith("V")) {
                fill(255, 70, 70);
            } else if (typeof pin.net === "string" && pin.net.startsWith("DV")) {
                fill(255, 70, 70);
            } else if (typeof pin.net === "string" && pin.net.startsWith("PWR")) {
                fill(255, 100, 100);
            } else if (typeof pin.net === "string" && pin.net.startsWith("RF")) {
                fill(0, 130, 0);
            } else if (typeof pin.net === "string" && pin.net.startsWith("PP_VDD")) {
                fill(255, 70, 70);
            } else if (typeof pin.net === "string" && pin.net.startsWith("PP_BAT")) {
                fill(255, 70, 70);
            } else if (typeof pin.net === "string" && pin.net.startsWith("PP_VS")) {
                fill(255, 70, 70);
             } else if (typeof pin.net === "string" && pin.net.startsWith("0P")) {
                fill(255, 70, 70);
             } else if (typeof pin.net === "string" && pin.net.startsWith("1P")) {
                fill(255, 70, 70);
             } else if (typeof pin.net === "string" && pin.net.startsWith("2P")) {
                fill(255, 70, 70);
             } else if (typeof pin.net === "string" && pin.net.startsWith("3P")) {
                fill(255, 70, 70);
            } else if (typeof pin.net === "string" && pin.net.startsWith("4P")) {
                fill(255, 70, 70);
            } else if (typeof pin.net === "string" && pin.net.startsWith("5P")) {
                fill(255, 70, 70);
            } else if (typeof pin.net === "string" && pin.net.startsWith("5V")) {
                fill(255, 70, 70);
            } else if (typeof pin.net === "string" && pin.net.startsWith("1V")) {
                fill(255, 70, 70);
            } else if (typeof pin.net === "string" && pin.net.startsWith("2V")) {
                fill(255, 70, 70);
            } else if (isPPnV) {
                fill(230, 200, 100);
            } else if (pin.net === "GND") {
                fill(120, 120, 120);
            } else if (pin.net === "NC") {
                fill(100, 130, 180);
            } else if (pin.side === "B") {
                fill(255, 200, 0);
            } else if (pin.side === "TP") {
                fill(255, 255, 0);
            } else {
                fill(230, 200, 100);
            }

            // Borda para PPnV
            if (isPPnV) {
                stroke(200, 50, 50);
                strokeWeight(1.5);
            } else {
                noStroke();
            }

            // Desenhar o pino
            if (pin.outlineRelative && pin.outlineRelative.length >= 4) {
                beginShape();
                for (let j = 0; j < pin.outlineRelative.length; j += 2) {
                    let vx = pin.x + pin.outlineRelative[j];
                    let vy = pin.y + pin.outlineRelative[j + 1];
                    vertex(vx + groupOffset, vy);
                }
                endShape(CLOSE);
            } else {
                if (part.name && ['u', 'a', 'nfc', '1', 'n', 'tp'].some(prefix => part.name.toLowerCase().startsWith(prefix))) {
                    ellipse(pin.x + groupOffset, pin.y, enlargedRadius, enlargedRadius);
                } else {
                    rect(pin.x + groupOffset - enlargedRadius / 2, pin.y - enlargedRadius / 2, enlargedRadius, enlargedRadius);
                }
            }

            // === DESENHAR TEXTOS APENAS EM ZOOM GRANDE ===
            if (
                scaleFactor >= 4.0 &&
                screenX > 0 && screenX < width &&
                screenY > 0 && screenY < height
            ) {
                push();
                fill(255);
                noStroke();
                textAlign(CENTER, CENTER);

                translate(0, height);
                scale(1, -1);

                textSize(min(pin.radius * 0.8, 20));
                text(pin.number || pin.name || "", pin.x + groupOffset, height - pin.y - 1);

                if (typeof pin.net === "string" && pin.net.length > 0) {
                    textSize(min(pin.radius * 0.1, 4));
                    text(pin.net, pin.x + groupOffset, height - pin.y + 8);
                }

                pop();
            }

            // === DESENHAR NET NO CENTRO DO PINO SE TIVER OUTLINE E ZOOM GRANDE ===
            if (
                scaleFactor >= 4.0 &&
                pin.net &&
                pin.outlineRelative && pin.outlineRelative.length >= 4 &&
                screenX > 0 && screenX < width &&
                screenY > 0 && screenY < height
            ) {
                push();
                fill(0);
                noStroke();
                textAlign(CENTER, CENTER);

                // Centro aproximado da área do pino
                let centerX = pin.x + groupOffset + (pin.outlineRelative[0] + pin.outlineRelative[2]) / 2;
                let centerY = pin.y + (pin.outlineRelative[1] + pin.outlineRelative[3]) / 2;

                textSize(min(pin.radius * 0.5, 12));

                let netText = pin.net;
                let lines = [];
                for (let i = 0; i < netText.length; i += 6) {
                    lines.push(netText.slice(i, i + 6));
                }

                let lineHeight = textSize() * 1.2;
                for (let i = 0; i < lines.length; i++) {
                    text(
                        lines[i],
                        centerX * scaleFactor + offsetX,
                        (centerY + (i - (lines.length - 1) / 2) * lineHeight) * scaleFactor + offsetY
                    );
                }

                pop();
            }

            noStroke();
        }
    }
}




    
    
    
    
   
    drawSelectedNetConnections();

    pop(); // Fin T3: Traslación y escalado
    pop(); // Fin T2: Reflejo horizontal
    pop(); // Fin T1: Rotación

    // Dibujar el tooltip sin transformaciones
    drawTooltip();
}


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
         fill(255, 255, 255, 120);//AMARWELO CAIXINHA DE INFORMAÇOES
         rect(screenPos.x, screenPos.y - 20, txtWidth + padding * 2, 40, 4);
         fill(0);
         text(txt, screenPos.x + padding, screenPos.y - 20 + padding);
         pop();
     }
 }
 
 // Detecta el click convirtiendo las coordenadas de pantalla a mundo
 
let draggingLine = null;
let dragOffset = { x: 0, y: 0 };
let isDraggingLine = false;



// Função auxiliar para pinos

// Detecta clique próximo da linha
function isNearLine(px, py, line) {
    const tolerance = 5;
    const minX = Math.min(line.x1, line.x2) - tolerance;
    const maxX = Math.max(line.x1, line.x2) + tolerance;
    const minY = Math.min(line.y1, line.y2) - tolerance;
    const maxY = Math.max(line.y1, line.y2) + tolerance;
    return px >= minX && px <= maxX && py >= minY && py <= maxY;
}


// Função utilitária para converter HEX -> RGB
function hexToRgb(hex) {
    hex = hex.replace('#','');
    const bigint = parseInt(hex,16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

// Função que converte nome da malha (net.name) em voltagem exibível
function netNameToVoltage(netName) {
    if (!netName) return '';

    const name = netName.toUpperCase();

    const voltageMap = {
        'VBAT': '4.2V',
        'VBUS': '5.0V',
        'VPH_PWR': '4,2V',
        'VSYS': '4.2V',
        'VIO18': '1.8V',
        'VCN18': '1.8V',
        'VIO28': '2.8V',
        'VCN28': '2.8V',
        'PP_VDD_M': '4.2V',
        'PP_VDDM': '4.2V',
        'GND': 'GND',
        
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
        return `${match2[1]}.${match2[3]}V`;
    }

    // Padrão com 1 inteiro e 2 decimais, ex: 1P85 → 1,85V
    const match1p2 = name.match(/(\d)(V|P)(\d{2})/);
    if (match1p2) {
        return `${match1p2[1]}.${match1p2[3]}V`;
    }

    // Detecta padrão com 1 dígito, tipo "1V8" ou "3P3"
    const match1 = name.match(/(\d)(V|P)(\d)/);
    if (match1) {
        return `${match1[1]}.${match1[3]}V`;
    }

    return ''; // Se não reconhece, retorna vazio
}
let currentNet = null; // 🔥 Salvar a net atual
function updateComponentInfo(part = null, pin = null) {
    const container = document.getElementById('componentInfo');
    const details = document.getElementById('componentDetails');

    if (!details) return;

    if (typeof parts === 'undefined' || !Array.isArray(parts)) {
        details.innerHTML = `<div class="summary"><b>Dados não carregados</b></div>`;
        return;
    }

    const totalComponents = parts.length;
    const totalNets = new Set(parts.flatMap(p => (p.pins || []).map(pin => pin.net))).size;
    const totalPins = parts.reduce((acc, p) => acc + (p.pins ? p.pins.length : 0), 0);

    const isEmpty = !part || !pin;

    const componente = isEmpty ? '---' : part.name;
    const tipo = isEmpty ? '---' : getComponentType(part.name);
    const pads = isEmpty ? '---' : (part.pins ? part.pins.length : '---');
    const net = isEmpty ? '---' : pin.net;
    const voltage = isEmpty ? '---' : (typeof netNameToVoltage === 'function' ? (netNameToVoltage(pin.net) || '---') : '---');
    const netCount = isEmpty ? '---' : parts.filter(p => (p.pins || []).some(pn => pn.net === pin.net)).length;

    // 🔥 Salvar a net atual
    currentNet = isEmpty ? null : pin.net;

    // 🔥 Gerar lista agrupada por tipo
    let componentsOnNet = isEmpty 
        ? []
        : parts.filter(p => (p.pins || []).some(pn => pn.net === pin.net));

    const grouped = {};
    componentsOnNet.forEach(comp => {
        const type = getComponentType(comp.name);
        if (!grouped[type]) grouped[type] = [];
        grouped[type].push(comp.name);
    });

    const componentsListHTML = componentsOnNet.length > 0 
        ? `
        <div class="scrollable">
            ${Object.entries(grouped).map(([type, names]) => `
                <div class="group">
                    <div class="group-title">${type}</div>
                    <div class="group-items">
                    ${net}
                        ${names.map(n => `<span class="item">${n}</span>`).join(' ')}
                    </div>
                </div>
            `).join('')}
        </div>
        `
        : '---';

    details.innerHTML = `
        <div class="summary">
        DADOS DO COMPONENTE
            <div class="info-box"><span class="info-label">COMPONENTE:</span> <span class="info-value">${componente}</span></div><hr>
            <div class="info-box"><span class="info-label">TIPO:</span> <span class="info-value">${tipo}</span></div><hr>
            <div class="info-box"><span class="info-label">PADS:</span> <span class="info-value">${pads}</span></div><hr>
            <div class="info-box"><span class="info-label">MALHA:</span> <span class="info-value">${net}</span></div><hr>
            <div class="info-box"><span class="info-label">VOLTAGEM:</span> <span class="info-value">${voltage}</span></div><hr>
            <div class="info-box"><span class="info-label">COMP/ NA MALHA:</span> <span class="info-value">${netCount}</span></div>
        </div>
        <hr>
        <div class="summary">
        TOTAL NA PLACA
            <div class="info-box"><span class="info-label">COMPONENTES:</span> <span class="info-value">${totalComponents}</span></div>
            <div class="info-box"><span class="info-label">MALHAS:</span> <span class="info-value">${totalNets}</span></div>
            <div class="info-box"><span class="info-label">PADS:</span> <span class="info-value">${totalPins}</span></div>
        </div><hr>
        COMPONENTES NA MALHA
     <div class="summary">
        <div class="info-box">
            
        </div>
    `;
}

updateComponentInfo();
// Função para detectar o tipo de componente
function getComponentType(name) {
    const prefix = name.toUpperCase();
    if (prefix.startsWith('CON') || prefix.startsWith('J')) return 'CONECTOR';
    if (prefix.startsWith('ZD') || prefix.startsWith('DZ')) return 'DIODO ZENER';
    if (prefix.startsWith('R')) return 'RESISTOR';
    if (prefix.startsWith('C')) return 'CAPACITOR';
    if (prefix.startsWith('U')) return 'CIRCUITO INTEGRADO';
    if (prefix.startsWith('L')) return 'BOBINA / INDUTOR';
    if (prefix.startsWith('D')) return 'DIODO';
    if (prefix.startsWith('Q')) return 'TRANSISTOR';
    return 'NÃO DEFINIDO';
}
updateComponentInfo();

  
// 🔥 Função para gerar lista no modal baseada na currentNet
function generateComponentListForNet() {
    const container = document.getElementById('componentList');
    container.innerHTML = '';

    if (!currentNet) {
        container.innerHTML = '<div>Nenhuma malha selecionada</div>';
        return;
    }

    const componentsOnNet = parts.filter(p => 
        (p.pins || []).some(pn => pn.net === currentNet)
    );

    if (componentsOnNet.length === 0) {
        container.innerHTML = '<div>Nenhum componente nesta malha</div>';
        return;
    }

    const grouped = {};
    componentsOnNet.forEach(comp => {
        const type = getComponentType(comp.name);
        if (!grouped[type]) grouped[type] = [];
        grouped[type].push(comp.name);
    });

    for (const [type, items] of Object.entries(grouped)) {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'group';

        const title = document.createElement('div');
        title.className = 'group-title';
        title.textContent = type;
        groupDiv.appendChild(title);

        const itemsDiv = document.createElement('div');
        itemsDiv.className = 'group-items';

        items.forEach(name => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';
            itemDiv.textContent = name;
            itemsDiv.appendChild(itemDiv);
        });

        groupDiv.appendChild(itemsDiv);
        container.appendChild(groupDiv);
    }
}

// 🔥 Controle do Modal
const modal = document.getElementById("componentModal");
const btn = document.getElementById("openModalBtn");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    generateComponentListForNet();
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
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
         renderBuffer();
         return false;
     }
 }
 
 function mouseReleased() {
    isDragging = false; // Mostra os nomes novamente ao soltar o mouse
    cursor('default');  // Restaura o cursor padrão
}
 
 
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
    if (Math.abs(x2 - x1) > Math.abs(y2 - y1)) {
        // linha horizontal primeiro, depois vertical
        line(x1, y1, x2, y1);
        line(x2, y1, x2, y2);
    } else {
        // linha vertical primeiro, depois horizontal
        line(x1, y1, x1, y2);
        line(x1, y2, x2, y2);
    }
}

function drawBlueDot(x, y) {
    push();
    fill(255, 0, 255,); // VerMELHO PINO SELECIONADO
    strokeWeight(1);
    ellipse(x, y, 6, 6);
    pop();
}






// ------------------ MOUSE PRESSED ------------------
function mousePressed() {
    let worldPos = screenToWorld(mouseX, mouseY);
    let mx = worldPos.x;
    let my = worldPos.y;

    // Clique nos pinos
    for (let part of parts) {
        if (displayMode === "top" && part.side !== "T") continue;
        if (displayMode === "bottom" && part.side !== "B") continue;
        let groupOffset = (displayMode === "all" && part.side === "B") ? bottomOffset : 0;

        for (let pin of part.pins) {
            let worldX = pin.x + groupOffset;
            let worldY = pin.y;

            let hit = false;
            if (pin.outline && pin.outline.length) {
                const poly = pin.outline.map(v => ({ x: v.x + worldX, y: v.y + worldY }));
                hit = pointInPolygon(mx, my, poly);
            } else {
                hit = dist(mx, my, worldX, worldY) <= pin.radius;
            }

            if (hit) {
                handlePinClick(part, pin);
                return false; // bloqueia pan do canvas
            }
        }
    }
}

// ------------------ HANDLE PIN CLICK ------------------
function handlePinClick(part, pin) {
    let pinId = `${part.name}_${pin.name}`;
    let tooltipText;

    if (pin.net === "GND" || pin.net === "NC") {
        tooltipText = `Parte: ${part.name} / PINO: ${pin.net}`;
    } else {
        tooltipText = `COMP: ${part.name} / MALHA: ${pin.net} / PINO: ${pin.name}`;
        const colorInput = document.getElementById("netColorPicker");
        const rgb = hexToRgb(colorInput.value);

        const existingIndex = selectedNets.findIndex(p => p.id === pinId);
        if (existingIndex === -1) {
            selectedNets.push({ id: pinId, net: pin.net, color: rgb });
        } else {
            selectedNets.splice(existingIndex, 1);
        }

        // ⚡ Chamada imediata para atualizar linhas e desenhar
        actualizarRedSeleccionada();
       
    }

    tooltip = { text: tooltipText, x: pin.x, y: pin.y, side: part.side };

    const pinDisplay = document.getElementById("pinDisplay");
    if (pinDisplay) pinDisplay.innerHTML = tooltipText;

    const voltageDisplay = document.getElementById("voltageDisplay");
    if (voltageDisplay) {
        const voltage = netNameToVoltage(pin.net);
        voltageDisplay.textContent = voltage ? voltage : '...';
    }

    updateComponentInfo(part, pin);
}

// ------------------ DESENHO DAS CONEXÕES ------------------
function drawSelectedNetConnections() {
    if (!selectedNets || selectedNets.length === 0) return;

    push();
    strokeWeight(2);
    noFill();

    // Agrupa pinos por net
    const netsMap = {};
    selectedNets.forEach(sel => {
        if (!netsMap[sel.net]) netsMap[sel.net] = [];
        netsMap[sel.net].push(sel.id);
    });

    for (let netName in netsMap) {
        const color = selectedNets.find(n => n.net === netName)?.color || [0, 255, 0];
        stroke(...color);

        const connectedPoints = [];

        // Obter coordenadas de cada pino
        for (let pinId of netsMap[netName]) {
            const [partName, pinName] = pinId.split("_");
            const part = parts.find(p => p.name === partName);
            if (!part) continue;
            const pin = part.pins.find(p => p.name === pinName);
            if (!pin) continue;

            const groupOffset = (displayMode === "all" && part.side === "B") ? bottomOffset : 0;
            connectedPoints.push({ x: pin.x + groupOffset, y: pin.y });
        }

        // Desenha linhas L entre pinos consecutivos
        for (let i = 1; i < connectedPoints.length; i++) {
            const p1 = connectedPoints[i - 1];
            const p2 = connectedPoints[i];

            if (Math.abs(p2.x - p1.x) > Math.abs(p2.y - p1.y)) {
                const midY = p1.y;
                line(p1.x, p1.y, p2.x, midY);
                line(p2.x, midY, p2.x, p2.y);
            } else {
                const midX = p1.x;
                line(p1.x, p1.y, midX, p2.y);
                line(midX, p2.y, p2.x, p2.y);
            }
        }

        // Pontos azuis
        connectedPoints.forEach(p => drawBlueDot(p.x, p.y, 4));
    }

    pop();
}
function expandNetByPassThroughOnlyMarked(cor) {
    const alreadySelected = new Set(selectedNets.map(sel => sel.id));
    const alreadyExpandedParts = new Set();
    let queue = [];

    // Inicializa a fila apenas com os pinos já selecionados (marcados pelas palavras-chave e cor)
    for (let sel of selectedNets) {
        if (sel.color.toString() !== cor.toString()) continue; // só expande para a cor atual
        const [partName, pinName] = sel.id.split("_");
        const part = parts.find(p => p.name === partName);
        if (!part) continue;
        const pin = part.pins.find(p => p.name === pinName);
        if (!pin) continue;
        queue.push({ part, pin, fromNet: pin.net });
    }

    while (queue.length > 0) {
        const { part, pin, fromNet } = queue.shift();

        // Só propaga para componentes de 2 pinos
        if (part.pins.length !== 2) continue;

        const netsInPart = Array.from(new Set(part.pins.map(p => p.net).filter(Boolean)));
        if (netsInPart.length !== 2) continue;

        const partKey = part.name + "_" + part.pins.map(p => p.net).join("_");
        if (alreadyExpandedParts.has(partKey)) continue;
        alreadyExpandedParts.add(partKey);

        // Só propaga se algum pino do componente já está marcado
        const algumMarcado = part.pins.some(p => alreadySelected.has(`${part.name}_${p.name}`));
        if (!algumMarcado) continue;

        // Descobre a outra net
        const otherNet = netsInPart.find(n => n !== fromNet);

        // NÃO marca se a outra net for GND
        if (!otherNet || otherNet.trim().toUpperCase() === "GND") continue;

        // Marca apenas o outro pino deste componente, com a mesma cor
        let marcouNovo = false;
        for (let otherPin of part.pins) {
            if (otherPin.net === otherNet) {
                const pinId = `${part.name}_${otherPin.name}`;
                if (!alreadySelected.has(pinId)) {
    selectedNets.push({ id: pinId, net: otherNet, color: cor });
    alreadySelected.add(pinId);

    // ⚡ Desenhar imediatamente a linha conectando o novo pino
      markAndDrawFullNet(otherNet, cor);
      expandNetWithTwoPadComponents(pin.net, cor);
}
            }
        }

        // Se marcou novo pino, continua expansão para outros componentes de 2 pinos conectados à nova net
        if (marcouNovo) {
            for (let nextPart of parts) {
                if (nextPart.pins.length !== 2) continue;
                const nextNets = Array.from(new Set(nextPart.pins.map(p => p.net).filter(Boolean)));
                if (nextNets.length !== 2) continue;

                // Só adiciona se algum pino desse componente tem a outra net
                if (nextPart.pins.some(p => p.net === otherNet)) {
                    const nextPartKey = nextPart.name + "_" + nextPart.pins.map(p => p.net).join("_");
                    if (!alreadyExpandedParts.has(nextPartKey)) {
                        for (let nextPin of nextPart.pins) {
                            if (nextPin.net === otherNet) {
                                queue.push({ part: nextPart, pin: nextPin, fromNet: otherNet });
                            }
                        }
                    }
                }
            }
        }
    }

    // Atualiza todas as nets apenas **uma vez no final**
    actualizarRedSeleccionada();
    
    
}
function expandNetWithTwoPadComponents(netName, color, maxHops = 5) {
    const visitedNets = new Set(); 
    const queue = [netName];

    while (queue.length > 0) {
        const currentNet = queue.shift();
        if (visitedNets.has(currentNet)) continue;
        visitedNets.add(currentNet);

        // Marca e desenha toda a net atual
        markAndDrawFullNet(currentNet, color);

        // Agora verifica todos os componentes dessa net
        for (let part of parts) {
            if (part.pins.length !== 2) continue; // só 2 pads
            const netsInPart = Array.from(new Set(part.pins.map(p => p.net).filter(Boolean)));
            if (netsInPart.length !== 2) continue; // precisa ter 2 nets distintas

            // Esse componente está ligado à net atual?
            if (!netsInPart.includes(currentNet)) continue;

            // Descobre a outra net
            const otherNet = netsInPart.find(n => n !== currentNet);
            if (!otherNet) continue;

            // Ignora nets inválidas
            if (["GND", "NC"].includes(otherNet.toUpperCase())) continue;

            // Se ainda não visitamos essa outra net, adiciona na fila
            if (!visitedNets.has(otherNet)) {
                queue.push(otherNet);
            }
        }
    }
}


function markAndDrawFullNet(netName, color) {
    if (!netName) return;

    // Procura todos os pinos de todos os componentes dessa net
    for (let part of parts) {
        const groupOffset = (displayMode === "all" && part.side === "B") ? bottomOffset : 0;

        for (let pin of part.pins) {
            if (pin.net === netName) {
                const pinId = `${part.name}_${pin.name}`;

                // Adiciona a selectedNets se ainda não estiver
                if (!selectedNets.some(p => p.id === pinId)) {
                    selectedNets.push({ id: pinId, net: netName, color: color });
                }
            }
        }
    }

    // Desenha toda a net
    const connectedPins = selectedNets
        .filter(p => p.net === netName)
        .map(p => {
            const [partName, pinName] = p.id.split("_");
            const part = parts.find(pt => pt.name === partName);
            if (!part) return null;
            const pin = part.pins.find(pt => pt.name === pinName);
            if (!pin) return null;
            const offset = (displayMode === "all" && part.side === "B") ? bottomOffset : 0;
            return { x: pin.x + offset, y: pin.y };
        })
        .filter(Boolean);

    if (connectedPins.length <= 1) return;

    stroke(...(selectedNets.find(p => p.net === netName)?.color || [0, 255, 0]));
    strokeWeight(2);

    // linhas L
    for (let i = 1; i < connectedPins.length; i++) {
        const p1 = connectedPins[i - 1];
        const p2 = connectedPins[i];
        if (Math.abs(p2.x - p1.x) > Math.abs(p2.y - p1.y)) {
            const midY = p1.y;
            line(p1.x, p1.y, p2.x, midY);
            line(p2.x, midY, p2.x, p2.y);
        } else {
            const midX = p1.x;
            line(p1.x, p1.y, midX, p2.y);
            line(midX, p2.y, p2.x, p2.y);
        }
    }

    // pontos azuis
    connectedPins.forEach(p => drawBlueDot(p.x, p.y, 4));
}



// ------------------ ATUALIZAR RED SELECIONADA ------------------
function actualizarRedSeleccionada(ordenarPorProximidade = false) {
    netLines = []; // limpa as linhas antigas

    const netsMap = {};
    selectedNets.forEach(sel => {
        if (!netsMap[sel.net]) netsMap[sel.net] = [];
        netsMap[sel.net].push(sel.id);
    });

    for (let netName in netsMap) {
        const pinIds = netsMap[netName];
        let connectedPoints = [];

        // coleta coordenadas de todos os pinos selecionados
        for (let sel of pinIds) {
            const [partName, pinName] = sel.split("_");
            const part = parts.find(p => p.name === partName);
            if (!part) continue;
            const pin = part.pins.find(p => p.name === pinName);
            if (!pin) continue;
            const groupOffset = (displayMode === "all" && part.side === "B") ? bottomOffset : 0;
            connectedPoints.push({ x: pin.x + groupOffset, y: pin.y });
        }

        if (connectedPoints.length <= 1) continue;

        if (ordenarPorProximidade) {
            connectedPoints.sort((a, b) => a.x - b.x || a.y - b.y);
        }

        // cria linhas L
        for (let i = 1; i < connectedPoints.length; i++) {
            const p1 = connectedPoints[i - 1];
            const p2 = connectedPoints[i];
            if (Math.abs(p2.x - p1.x) > Math.abs(p2.y - p1.y)) {
                const midY = p1.y;
                netLines.push({ x1: p1.x, y1: p1.y, x2: p2.x, y2: midY, net: netName });
                netLines.push({ x1: p2.x, y1: midY, x2: p2.x, y2: p2.y, net: netName });
            } else {
                const midX = p1.x;
                netLines.push({ x1: p1.x, y1: p1.y, x2: midX, y2: p2.y, net: netName });
                netLines.push({ x1: midX, y1: p2.y, x2: p2.x, y2: p2.y, net: netName });
            }
        }
    }
}



let originalPins = []; // armazena os pinos iniciais com id, net e cor

function marcarNetsPorNome(regras, ordenarPorProximidade = false) {
    const regrasLower = regras.map(r => ({ termo: r.termo.toLowerCase(), cor: r.cor }));

    if (Array.isArray(selectedNets)) selectedNets.length = 0;

    for (let part of parts) {
        for (let pin of part.pins) {
            if (!pin.net) continue;
            const netName = String(pin.net).toLowerCase();
            const pinId = `${part.name}_${pin.name}`;
            for (let r of regrasLower) {
                if (netName.includes(r.termo)) {
                    if (!selectedNets.some(p => p.id === pinId)) {
                        selectedNets.push({ id: pinId, net: pin.net, color: r.cor });
                    }
                    break;
                }
            }
        }
    }

    // Salva os pinos originais
    originalPins = selectedNets.map(p => ({ ...p }));

    // Expande para cada cor das regras
    for (let r of regrasLower) {
        expandNetByPassThroughOnlyMarked(r.cor);
    }

    // Ordenar por proximidade se necessário
    if (ordenarPorProximidade) {
        const netsMap = {};
        selectedNets.forEach(sel => {
            if (!netsMap[sel.net]) netsMap[sel.net] = [];
            netsMap[sel.net].push(sel);
        });
        selectedNets = [];
        for (let netName in netsMap) {
            let pinsWithCoord = netsMap[netName].map(sel => {
                let found = null;
                for (let part of parts) {
                    for (let pin of part.pins) {
                        if (`${part.name}_${pin.name}` === sel.id) {
                            found = { sel, x: pin.x, y: pin.y };
                            break;
                        }
                    }
                    if (found) break;
                }
                return found;
            }).filter(Boolean);
            pinsWithCoord.sort((a, b) => a.x - b.x || a.y - b.y);
            pinsWithCoord.forEach(obj => selectedNets.push(obj.sel));
        }
    }
}// ------------------ REMOVE COMPLETAMENTE EXPANSÕES PELA COR, sem bagunçar outras nets ------------------
function compressExpandedNets() {
    if (!originalPins || originalPins.length === 0) return;
    if (!selectedNets || selectedNets.length === 0) return;

    // Conta pinos por cor
    let colorCount = {};
    selectedNets.forEach(p => {
        const key = (p.color || []).join(",");
        colorCount[key] = (colorCount[key] || 0) + 1;
    });

    if (Object.keys(colorCount).length === 0) return;

    // Cor mais carregada
    let maxColor = Object.keys(colorCount).reduce((a, b) =>
        colorCount[a] > colorCount[b] ? a : b
    );

    // Pinos originais dessa cor
    const originalOfColor = originalPins.filter(p => (p.color || []).join(",") === maxColor);

    // Remove apenas os pinos extras dessa cor
    selectedNets = selectedNets.filter(p => {
        const pColor = (p.color || []).join(",");
        if (pColor !== maxColor) return true;                 // Mantém outras cores
        return originalOfColor.some(orig => orig.id === p.id); // Mantém apenas os originais
    });

    // ⚠️ Removei o sort! Agora a ordem das outras nets não é alterada
}





function keyPressed() {
    if (key === '1' || key === '1') {
        // Regras CARGAMENTO USB
        marcarNetsPorNome([
            { termo: "vbus", cor: [255, 0, 0] },
            { termo: "vcharge", cor: [255, 0, 0] },
            
             { termo: "v_charge", cor: [255, 0, 0] },
            
            { termo: "v_bus", cor: [255, 0, 0] },        
            { termo: "usb_dm", cor: [255, 255, 0] },
             { termo: "ap_dm", cor: [255, 255, 0] },
             { termo: "ap_dn", cor: [255, 255, 0] },
             { termo: "ap_d_m", cor: [255, 255, 0] },
             { termo: "ap_d_n", cor: [255, 255, 0] },
             { termo: "usb_dn", cor: [255, 255, 0] },
             { termo: "usb_d_m", cor: [255, 255, 0] }, 
              { termo: "usb_d_n", cor: [255, 255, 0] }, 
               { termo: "_d_n", cor: [255, 255, 0] },
                { termo: "_d_m", cor: [255, 255, 0] },
                
                
               { termo: "usb_d_p", cor: [0, 255, 0] },
                
                { termo: "_d_p", cor: [0, 255, 0] }, 
                { termo: "sns_p", cor: [0, 255, 0] }, 
                 { termo: "sns_m", cor: [255, 255, 0] },
                 { termo: "sns_n", cor: [255, 255, 0] },
                 { termo: "sns_dp", cor: [0, 255, 0] }, 
                 { termo: "sns_dm", cor: [255, 255, 0] },
            { termo: "usb_dp", cor: [0, 255, 0] },
             { termo: "ap_dp", cor: [0, 255, 0] }, 
             { termo: "ap_d_p", cor: [0, 255, 0] },    
            { termo: "usb_id", cor: [0, 0, 255] }, 
            
            { termo: "cc1", cor: [0, 155, 255] },
            
           
             
            { termo: "hs_dp", cor: [0, 255, 0] },
             { termo: "hs_dm", cor: [255, 255, 0] },
             
             { termo: "bs+", cor: [0, 155, 255] },
             { termo: "bs-", cor: [0, 155, 155] },
              
            { termo: "cc2", cor: [155, 0, 255] }      
        ], true);
        return false;
    }

    if (key === '2' || key === '2') {
        // BACKLIGHT
        marcarNetsPorNome([
            { termo: "LEDK", cor: [255, 255, 0] },
            { termo: "LED_K", cor: [255, 255, 0] }, 
            { termo: "LEDA", cor: [0, 150, 255] },
            { termo: "cabc", cor: [250, 150, 0] },
            { termo: "cab_c", cor: [250, 150, 0] }, 
            { termo: "LED_A", cor: [0, 150, 255] }
        ]);
        return false;
    }

    if (key === '0' || key === '0') {
        compressExpandedNets();
        
        return false;
    }

    //BATERIA FPC
    if (key === '3' || key === '3') {
        marcarNetsPorNome([
            { termo: "AAAAAA", cor: [0, 255, 255]},
            { termo: "vbaterry_sr", cor: [133, 0, 0] },
 { termo: "bat_id", cor: [0, 155, 255] },
 { termo: "batid", cor: [0, 155, 255] },
  { termo: "bat_id2", cor: [0, 155, 155] },
    { termo: "bat_id1", cor: [0, 155, 155] },
 { termo: "baton", cor: [0, 155, 255] },
 { termo: "bat_thm", cor: [255, 155, 0] },
{ termo: "batt_th", cor: [255, 155, 0] },
 { termo: "therm", cor: [255, 155, 0] },
        { termo: "cc2", cor: [155, 0, 255] }      
        ], true);
        return false;
    }


    if (key === '4' || key === '4') {
        marcarNetsPorNome([{ termo: "SPK", cor: [0, 255, 255] }]);
        return false;
    }

    if (key === '5' || key === '5') {
        marcarNetsPorNome([{ termo: "cam", cor: [255, 0, 255] }]);
        return false;
    }
}









function drawComponentBoundingBoxes() {
    let backgroundRects = [];

    for (let part of parts) {
        if (displayMode === "top" && part.side !== "T") continue;
        if (displayMode === "bottom" && part.side !== "B") continue;
        let groupOffset = (displayMode === "all" && part.side === "B") ? bottomOffset : 0;

        let minX = Infinity, minY = Infinity;
        let maxX = -Infinity, maxY = -Infinity;

        if (part.outline && part.outline.length > 0) {
            for (let i = 0; i < part.outline.length; i += 2) {
                let relX = part.outline[i];
                let relY = part.outline[i + 1];

                let absX = part.origin.x + relX;
                let absY = part.origin.y + relY;

                minX = Math.min(minX, absX);
                maxX = Math.max(maxX, absX);
                minY = Math.min(minY, absY);
                maxY = Math.max(maxY, absY);
            }
        } else if (part.pins && part.pins.length > 0) {
            for (let pin of part.pins) {
                let pinX = pin.x + part.origin.x;
                let pinY = pin.y + part.origin.y;
                minX = Math.min(minX, pinX);
                maxX = Math.max(maxX, pinX);
                minY = Math.min(minY, pinY);
                maxY = Math.max(maxY, pinY);
            }
        } else {
            continue; // Pular se não houver outline nem pinos
        }
        let x = minX + groupOffset;
        let y = minY;
        let w = maxX - minX;
        let h = maxY - minY;

        // Corrigido: Verifica se está completamente fora da tela
        let screenMin = worldToScreen(x, y);
        let screenMax = worldToScreen(x + w, y + h);

        let screenLeft   = Math.min(screenMin.x, screenMax.x);
        let screenRight  = Math.max(screenMin.x, screenMax.x);
        let screenTop    = Math.min(screenMin.y, screenMax.y);
        let screenBottom = Math.max(screenMin.y, screenMax.y);

        let completelyOffScreen =
            screenRight < 0 ||
            screenLeft > width ||
            screenBottom < 0 ||
            screenTop > height;

        if (completelyOffScreen) continue;


        backgroundRects.push({ 
            x, 
            y, 
            w, 
            h, 
            fillColor: determineFillColor(part)
        });
    }

    // Desenhar os retângulos visíveis
    noStroke();
    for (let rectData of backgroundRects) {
        fill(rectData.fillColor);
        rect(rectData.x, rectData.y, rectData.w, rectData.h);
    }

    // Desenhar bordas do componente
    stroke(150, 150, 150);
    noFill();
    strokeWeight(2);

    for (let rectData of backgroundRects) {
        rect(rectData.x, rectData.y, rectData.w, rectData.h);
    }
}

// Função de cor conforme o nome do componente
function determineFillColor(part) {
    if (part.name.startsWith("C")) {
        return color(255, 255, 150, 85);
    } else if (part.name.startsWith("R")) {
        return color(50, 50, 50, 100);
    } else if (part.name.startsWith("MIC")) {
        return color(255, 255, 150, 225);
    } else if (part.name.startsWith("N")) {
        return color(0, 0, 255, 0);
    } else if (part.name.startsWith("L")) {
        return color(30, 30, 30);
    } else if (part.name.startsWith("ZD")) {
        return color(80, 80, 80, 125);
    } else if (part.name.startsWith("U")) {
        return color(10, 10, 10);
    } else if (part.name.startsWith("u")) {
        return color(10, 10, 10);
    } else if (part.name.startsWith("S")) {
        return color(128, 128, 128, 115);
    } else if (part.name.startsWith("H")) {
        return color(50, 50, 50, 120);
    } else if (part.name.startsWith("J")) {
        return color(200, 200, 200, 35);
    } else if (part.name.startsWith("D")) {
        return color(80, 80, 80, 125);
    } else if (part.name.startsWith("Q")) {
        return color(80, 80, 80, 125);
    } else if (part.name.startsWith("RF")) {
        return color(255, 255, 0, 105);
    } else if (part.name.startsWith("ANT")) {
        return color(128, 128, 128, 155);
    } else if (part.name.startsWith("PA")) {
        return color(50, 50, 50, 120);
    } else if (part.name.startsWith("F")) {
        return color(0, 0, 255, 75);
    } else {
        return color(255, 255, 0, 0);
    }
}

function drawPartNames() {
    if (scaleFactor < 1.1 || scaleFactor >= 4.0 || isDragging) return;

    push();
    resetMatrix();
    textAlign(CENTER, CENTER);
    fill(255);
    noStroke();

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

            let centerScreen = worldToScreen(centerX, centerY);

            if (centerScreen.x >= 0 && centerScreen.x <= width && centerScreen.y >= 0 && centerScreen.y <= height) {
                textSize(12);
                text(part.name, centerScreen.x, centerScreen.y);
            }
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
            let part = { name: partName, pins: [], outline: [] };
            i++;
            while (i < fileContent.length && !fileContent[i].trim().startsWith("PART_END")) {
                let innerLine = fileContent[i].trim();

                if (innerLine.startsWith("PART_SIDE")) {
                    let tokensSide = innerLine.split(/\s+/);
                    part.side = tokensSide[1]; // "T" ou "B"
                }

                if (innerLine.startsWith("PART_ORIGIN")) {
                    let tokensOrigin = innerLine.split(/\s+/);
                    part.origin = {
                        x: parseFloat(tokensOrigin[1]),
                        y: parseFloat(tokensOrigin[2])
                    };
                }

                if (innerLine.startsWith("PART_OUTLINE_RELATIVE")) {
                    let tokensOutline = innerLine.split(/\s+/);
                    tokensOutline.shift(); // remove "PART_OUTLINE_RELATIVE"
                    part.outline = tokensOutline.map(Number);
                }

                if (innerLine.startsWith("PIN_ID")) {
                    let pin = {};
                    i++;
                    while (i < fileContent.length && !fileContent[i].trim().startsWith("PIN_END")) {
                        let pinLine = fileContent[i].trim();
                        let tokensPin = pinLine.split(/\s+/);
                        switch (tokensPin[0]) {
                            case "PIN_NUMBER":
                                pin.number = tokensPin[1];
                                break;
                            case "PIN_NAME":
                                pin.name = tokensPin.slice(1).join(" ");
                                break;
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
                            case "PIN_OUTLINE_RELATIVE":
                                pin.outlineRelative = tokensPin.slice(1).map(Number);
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
        drawSelectedNetConnections();

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



function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    renderBuffer(); // Vuelve a dibujar el contenido después del ajuste
}








