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

            const imgData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
            const data = imgData.data;
            for (let i = 0; i < data.length; i += 4) {
                data[i] = 255 - data[i];
                data[i + 1] = 255 - data[i + 1];
                data[i + 2] = 255 - data[i + 2];
            }
            tempCtx.putImageData(imgData, 0, 0);
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

     

        // --- Componentes ---
        parts.forEach(part => {
            if (part.outline && part.outline.length) {
                pdf.setDrawColor(0, 0, 0);
                pdf.setLineWidth(0.5 * scale);
                const n = part.outline.length;
                for (let i = 0; i < n; i += 2) {
                    const x1 = part.origin.x + part.outline[i];
                    const y1 = part.origin.y + part.outline[i + 1];
                    const j = (i + 2 < n) ? i + 2 : 0;
                    const k = (i + 3 < n) ? i + 3 : 1;
                    const x2 = part.origin.x + part.outline[j];
                    const y2 = part.origin.y + part.outline[k];
                    if (x1 === x2 || y1 === y2) {
                        const p1 = scaleCoord(x1, y1);
                        const p2 = scaleCoord(x2, y2);
                        pdf.line(p1.x, p1.y, p2.x, p2.y);
                    }
                }
            }

           
        });

        // --- Pinos ---
        parts.forEach(part => {
            part.pins.forEach(pin => {
                pdf.setLineWidth(0.5 * scale);
                const label = pin.name || "";
                let fill = [255, 200, 100], stroke = [0, 0, 0];
                if ((pin.net || "").toUpperCase().includes("GND")) fill = [180,180,180], stroke = [80,80,80];
                else if ((pin.net || "").toUpperCase().includes("NC")) fill = [150,150,255], stroke = [0,0,0];

                pdf.setFillColor(...fill);
                pdf.setDrawColor(...stroke);

                let centerX, centerY;
                if (pin.outlineRelative && pin.outlineRelative.length >=4){
                    const points=[];
                    for(let i=0;i<pin.outlineRelative.length;i+=2){
                        points.push(scaleCoord(pin.x+pin.outlineRelative[i], pin.y+pin.outlineRelative[i+1]));
                    }
                    centerX=(points[0].x+points[2].x)/2;
                    centerY=(points[0].y+points[1].y)/2;
                    pdf.lines(
                        points.map((p,i)=>[points[(i+1)%points.length].x-p.x, points[(i+1)%points.length].y-p.y]), 
                        points[0].x, points[0].y, [1,1],'FD'
                    );
                } else {
                    const pos=scaleCoord(pin.x,pin.y);
                    pdf.circle(pos.x,pos.y,(pin.radius || 2)*scale,'FD');
                    centerX=pos.x; centerY=pos.y;
                }

                if(label){
                    pdf.setFontSize(6*scale);
                    pdf.setTextColor(0,0,0);
                    pdf.text(label, centerX, centerY, {align:"center", baseline:"middle"});
                }
            });
        });

        // --- Nets selecionadas ---
        if (selectedNets && selectedNets.length > 0) {
            const netsMap = {};
            selectedNets.forEach(sel => {
                if (!netsMap[sel.net]) netsMap[sel.net] = [];
                netsMap[sel.net].push(sel.id);
            });

            for (let netName in netsMap) {
                const color = selectedNets.find(n => n.net === netName)?.color || [255, 0, 0];
                pdf.setLineWidth(1.5 * scale);
                pdf.setDrawColor(...color);

                let connectedPoints = [];
                for (let pinId of netsMap[netName]) {
                    for (let part of parts) {
                        const groupOffset = (displayMode === "all" && part.side === "B") ? bottomOffset : 0;
                        for (let pin of part.pins) {
                            const currentId = `${part.name}_${pin.name}`;
                            if (currentId === pinId) {
                                let centerX, centerY;
                                if (pin.outlineRelative && pin.outlineRelative.length >= 4) {
                                    let sumX=0,sumY=0,count=0;
                                    for(let i=0;i<pin.outlineRelative.length;i+=2){
                                        sumX += pin.x + pin.outlineRelative[i] + groupOffset;
                                        sumY += pin.y + pin.outlineRelative[i+1];
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
                    const p1 = connectedPoints[i-1].center;
                    const p2 = connectedPoints[i].center;
                    if (Math.abs(p2.x-p1.x) > Math.abs(p2.y-p1.y)) {
                        pdf.line(p1.x,p1.y,p2.x,p1.y);
                        pdf.line(p2.x,p1.y,p2.x,p2.y);
                    } else {
                        pdf.line(p1.x,p1.y,p1.x,p2.y);
                        pdf.line(p1.x,p2.y,p2.x,p2.y);
                    }
                }

                connectedPoints.forEach(({pin, center}) => {
                    pdf.setFillColor(...color);
                    if(pin.outlineRelative && pin.outlineRelative.length>=4){
                        const points=[];
                        for(let i=0;i<pin.outlineRelative.length;i+=2){
                            points.push(scaleCoord(pin.x+pin.outlineRelative[i], pin.y+pin.outlineRelative[i+1]));
                        }
                        pdf.lines(points.map((p,i)=>[
                            points[(i+1)%points.length].x-p.x,
                            points[(i+1)%points.length].y-p.y
                        ]), points[0].x, points[0].y, [1,1],'FD');
                    } else {
                        pdf.circle(center.x, center.y, (pin.radius || 2) * scale,'FD');
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
    background(0);
   
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
   
    drawPartNames();

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




// ------------------ MOUSE CLICK ------------------
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

        // Verifica se o pino já está selecionado
        const existingIndex = selectedNets.findIndex(p => p.id === pinId);
        if (existingIndex === -1) {
            // Adiciona o pino à net
            selectedNets.push({ id: pinId, net: pin.net, color: rgb });
        } else {
            // Remove apenas o pino clicado, mantendo os outros da mesma net
            selectedNets.splice(existingIndex, 1);
        }

        // Atualiza todas as nets desenhadas, incluindo essa
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

// ------------------ ATUALIZAR RED SELECIONADA ------------------
function actualizarRedSeleccionada() {
    netLines = [];

    // Agrupa pinos por net
    const netsMap = {};
    selectedNets.forEach(sel => {
        if (!netsMap[sel.net]) netsMap[sel.net] = new Set();
        netsMap[sel.net].add(sel.id);
    });

    for (let netName in netsMap) {
        const pinIds = Array.from(netsMap[netName]);
        let connectedPoints = [];

        for (let part of parts) {
            let groupOffset = (displayMode === "all" && part.side === "B") ? bottomOffset : 0;

            for (let pin of part.pins) {
                const pinId = `${part.name}_${pin.name}`;
                if (pin.net === netName && pinIds.includes(pinId)) {
                    let px = pin.x + (part.side === "B" ? groupOffset : 0);
                    let py = pin.y;
                    connectedPoints.push({ x: px, y: py });
                }
            }
        }

        // Ordena e conecta todos os pinos restantes da net
        connectedPoints.sort((a, b) => a.x - b.x || a.y - b.y);

        for (let i = 1; i < connectedPoints.length; i++) {
            const p1 = connectedPoints[i - 1];
            const p2 = connectedPoints[i];
            netLines.push({ x1: p1.x, y1: p1.y, x2: p2.x, y2: p1.y, net: netName });
            netLines.push({ x1: p2.x, y1: p1.y, x2: p2.x, y2: p2.y, net: netName });
        }
    }
}

// ------------------ DESENHO DAS CONEXÕES ------------------
function drawSelectedNetConnections() {
    if (!selectedNets || selectedNets.length === 0) return;

    push();
    strokeWeight(2);
    noFill();

    // Agrupa pinos por net mantendo a ordem de clique
    const netsMap = {};
    selectedNets.forEach(sel => {
        if (!netsMap[sel.net]) netsMap[sel.net] = [];
        netsMap[sel.net].push(sel.id);
    });

    for (let netName in netsMap) {
        const color = selectedNets.find(n => n.net === netName)?.color || [0, 255, 0];
        stroke(...color);

        // Pega os pinos dessa net na ordem de clique
        let connectedPoints = [];
        for (let pinId of netsMap[netName]) {
            for (let part of parts) {
                let groupOffset = (displayMode === "all" && part.side === "B") ? bottomOffset : 0;
                for (let pin of part.pins) {
                    const currentId = `${part.name}_${pin.name}`;
                    if (currentId === pinId) {
                        connectedPoints.push({
                            pin,
                            x: pin.x + groupOffset,
                            y: pin.y
                        });
                    }
                }
            }
        }

        // Conecta os pinos na ordem de clique
        for (let i = 1; i < connectedPoints.length; i++) {
            const p1 = connectedPoints[i - 1];
            const p2 = connectedPoints[i];
            let offset = (i % 2 === 0) ? 1 : -1; // alterna deslocamento
         drawOrthogonalLine(p1.x + offset, p1.y + offset, p2.x + offset, p2.y + offset);
        }

        // Desenha todos os pinos selecionados
        connectedPoints.forEach(p => drawBlueDot(p.x, p.y, 4));
    }

    pop();
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

function keyPressed() {
    if (document.activeElement.tagName === "INPUT") {
        return; // Permite escribir en el input
    }
    return false; // Evita que p5.js bloquee la entrada
}















function exportarNetSelecionadaPDF() {
    if (!selectedNets || selectedNets.length === 0) {
        alert("Nenhuma net selecionada!");
        return;
    }

    const { jsPDF } = window.jspdf;
    if (!outlinePoints || !outlinePoints.length) {
        alert("Layout não carregado!");
        return;
    }

    const pageWidth = 297 * 3.78;  // A4 landscape
    const pageHeight = 210 * 3.78;
    const margin = 20;

    const pdf = new jsPDF({ unit: 'px', format: [pageWidth, pageHeight], orientation: 'landscape' });

    // --- 1️⃣ Reúne todos os componentes e pinos de todas as nets selecionadas ---
    const allNetComponents = [];
      const drawnComponents = new Set(); // para evitar duplicação
    const netPinsMap = {}; // netName -> lista de pinos escalados
    selectedNets.forEach(sel => netPinsMap[sel.net.toUpperCase()] = []);

    parts.forEach(part => {
        let partHasNet = false;
        part.pins.forEach(pin => {
            const pinNet = (pin.net || "").toUpperCase();
            if (netPinsMap.hasOwnProperty(pinNet)) {
                partHasNet = true;
            }
        });
        if (partHasNet && !allNetComponents.includes(part)) allNetComponents.push(part);
    });

    if (allNetComponents.length === 0) return;

    // --- 2️⃣ Calcula bounding box de todos os pinos e outlines ---
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    allNetComponents.forEach(part => {
            if(drawnComponents.has(part.name)) return; // pula duplicados
        part.pins.forEach(pin => {
            const px = part.origin.x + pin.x;
            const py = part.origin.y + pin.y;
            minX = Math.min(minX, px);
            minY = Math.min(minY, py);
            maxX = Math.max(maxX, px);
            maxY = Math.max(maxY, py);
        });
        if (part.outline) {
            for (let i = 0; i < part.outline.length; i += 2) {
                const px = part.origin.x + part.outline[i];
                const py = part.origin.y + part.outline[i + 1];
                minX = Math.min(minX, px);
                minY = Math.min(minY, py);
                maxX = Math.max(maxX, px);
                maxY = Math.max(maxY, py);
            }
        }
    });

    const contentWidth = maxX - minX;
    const contentHeight = maxY - minY;

    // --- 3️⃣ Calcula escala máxima para caber no PDF ---
    const scale = Math.min((pageWidth - 2*margin)/contentWidth, (pageHeight - 2*margin)/contentHeight);

    // Centraliza todo o conteúdo
    const extraX = (pageWidth - contentWidth*scale)/2 - minX*scale;
    const extraY = (pageHeight - contentHeight*scale)/2 - minY*scale;

    const scaleCoord = (x, y) => ({
        x: x*scale + extraX,
        y: pageHeight - (y*scale + extraY)
    });

    // --- 4️⃣ Preenche netPinsMap com coordenadas escaladas ---
    parts.forEach(part => {
        part.pins.forEach(pin => {
            const pinNet = (pin.net || "").toUpperCase();
            if (netPinsMap.hasOwnProperty(pinNet)) {
                netPinsMap[pinNet].push({
                    pin,
                    part,
                    center: scaleCoord(part.origin.x + pin.x, part.origin.y + pin.y)
                });
            }
        });
    });

    // --- 5️⃣ Desenha todos os componentes e pinos ---
    allNetComponents.forEach(part => {
        const firstLetter = (part.name || "").charAt(0).toUpperCase();
const nameUpper = (part.name || "").toUpperCase();
if (["RE","R"].some(prefix => nameUpper.startsWith(prefix)) && part.pins.length === 2) {
    pdf.setDrawColor(0,0,0);
    pdf.setLineWidth(0.5*scale);

    const x1 = part.origin.x + part.pins[0].x;
    const y1 = part.origin.y + part.pins[0].y;
    const x2 = part.origin.x + part.pins[1].x;
    const y2 = part.origin.y + part.pins[1].y;

    const p1 = scaleCoord(x1, y1);
    const p2 = scaleCoord(x2, y2);

    const segments = 5; // reduzimos os segmentos para não ficar espremido
    const totalLength = Math.sqrt((p2.x - p1.x)**2 + (p2.y - p1.y)**2);
    const offsetFromPin = Math.min(20*scale, totalLength*0.2); // aumenta o espaço antes do zig-zag

    const dxTotal = (p2.x - p1.x);
    const dyTotal = (p2.y - p1.y);

    // ponto inicial do zig-zag
    const startX = p1.x + (dxTotal/totalLength)*offsetFromPin;
    const startY = p1.y + (dyTotal/totalLength)*offsetFromPin;

    // ponto final do zig-zag
    const endX = p2.x - (dxTotal/totalLength)*offsetFromPin;
    const endY = p2.y - (dyTotal/totalLength)*offsetFromPin;

    const dx = (endX - startX)/segments;
    const dy = (endY - startY)/segments;

    let points = [];
    for(let i=0;i<=segments;i++){
        const offset = (i%2===0 ? 1 : -1) * 4 * scale; // altura do zig-zag aumentada
        const px = startX + dx*i - dy * offset / Math.sqrt(dx*dx + dy*dy);
        const py = startY + dy*i + dx * offset / Math.sqrt(dx*dx + dy*dy);
        points.push({x:px, y:py});
    }

    // linhas do pino até o início do zig-zag
    pdf.line(p1.x, p1.y, points[0].x, points[0].y);
    // zig-zag
    for(let i=1;i<points.length;i++){
        pdf.line(points[i-1].x, points[i-1].y, points[i].x, points[i].y);
    }
    // linha do fim do zig-zag até o pino
    pdf.line(points[points.length-1].x, points[points.length-1].y, p2.x, p2.y);

    // bolinhas nos pinos
    pdf.circle(p1.x, p1.y, 0.8*scale,'FD');
    pdf.circle(p2.x, p2.y, 0.8*scale,'FD');

       // 🔹 Desenha ícone de GND nos pinos que têm net "GND"
// 🔹 Desenha ícone de GND (3 riscos) nos pinos que têm net "GND"
part.pins.forEach((pin, idx) => {
    if(pin.net && pin.net.toUpperCase() === "GND") {
        const px = part.origin.x + pin.x;
        const py = part.origin.y + pin.y;
        const p = scaleCoord(px, py);

        const tickLength = 5*scale; // comprimento do traço de conexão
        const base = 4*scale;        // comprimento do maior risco
        const spacing = 1.5*scale;   // espaçamento entre os riscos

        // outro pino do resistor
        const otherPin = part.pins[1 - idx];
        const otherX = part.origin.x + otherPin.x;
        const otherY = part.origin.y + otherPin.y;
        const otherP = scaleCoord(otherX, otherY);

        // vetor do pino GND -> outro pino (invertido para fora)
        let dx = otherP.x - p.x;
        let dy = otherP.y - p.y;
        const len = Math.sqrt(dx*dx + dy*dy);
        const ux = dx/len;
        const uy = dy/len;

        // ponto inicial do GND (para fora do resistor)
        const gndX = p.x - ux*tickLength;
        const gndY = p.y - uy*tickLength;

        // vetor perpendicular unitário (para os riscos)
        const perpX = -uy;
        const perpY = ux;

        // desenha 3 riscos, do maior para o menor, afastando perpendicularmente
        const sizes = [base, base*0.66, base*0.33];
        sizes.forEach((s, i) => {
            // deslocamento ao longo do vetor do resistor, para fora
            const offset = i * spacing;
            const startX = gndX - perpX * (s/2) - ux * offset;
            const startY = gndY - perpY * (s/2) - uy * offset;
            const endX = gndX + perpX * (s/2) - ux * offset;
            const endY = gndY + perpY * (s/2) - uy * offset;

            pdf.line(startX, startY, endX, endY);
        });

        // linha conectando pino ao primeiro risco
        pdf.line(p.x, p.y, gndX, gndY);
    }
});



      drawComponentName(part, scaleCoord, pdf, scale);
        return; // pula o desenho normal
}

if (["D","LED","TVS"].some(prefix => nameUpper.startsWith(prefix)) && part.pins.length === 2) {
    pdf.setDrawColor(0,0,0);
    pdf.setLineWidth(0.5*scale);

    // --- determinar quem é anodo e catodo ---
    let anodoPin = part.pins[0];
    let catodoPin = part.pins[1];

    // se um dos pinos tiver net GND ele vira catodo
    if ((part.pins[0].net && part.pins[0].net.toUpperCase()==="GND") &&
        !(part.pins[1].net && part.pins[1].net.toUpperCase()==="GND")) {
        // pino 0 é GND → inverter
        catodoPin = part.pins[0];
        anodoPin = part.pins[1];
    } else if ((part.pins[1].net && part.pins[1].net.toUpperCase()==="GND") &&
        !(part.pins[0].net && part.pins[0].net.toUpperCase()==="GND")) {
        // pino1 já é GND → ok
        anodoPin = part.pins[0];
        catodoPin = part.pins[1];
    }

    // --- coords absolutos dos dois pinos ---
    const x1 = part.origin.x + anodoPin.x;
    const y1 = part.origin.y + anodoPin.y;
    const x2 = part.origin.x + catodoPin.x;
    const y2 = part.origin.y + catodoPin.y;

    const p1 = scaleCoord(x1, y1); // anodo
    const p2 = scaleCoord(x2, y2); // catodo

    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const len = Math.sqrt(dx*dx + dy*dy);
    const ux = dx / len;
    const uy = dy / len;
    const perpX = -uy;
    const perpY = ux;

    // comprimentos padrão
    const triLen = 12*scale;      // comprimento triângulo
    const triHeight = 6*scale;    // altura triângulo
    const gap = 2*scale;          // espaçamento barra ↔ linha

    // ponto inicial do triângulo (lado anodo)
    const triBaseX = p1.x + ux*((len - triLen)/2);
    const triBaseY = p1.y + uy*((len - triLen)/2);

    // ponta do triângulo (lado catodo)
    const triTipX = triBaseX + ux*triLen;
    const triTipY = triBaseY + uy*triLen;

    // vértices superior e inferior do triângulo
    const vTop = {
        x: triBaseX + perpX*triHeight/2,
        y: triBaseY + perpY*triHeight/2
    };
    const vBottom = {
        x: triBaseX - perpX*triHeight/2,
        y: triBaseY - perpY*triHeight/2
    };
    const vTip = {x: triTipX, y: triTipY};

    // barra catodo logo após a ponta
    const barTopX = vTip.x + ux*gap + perpX*triHeight/2;
    const barTopY = vTip.y + uy*gap + perpY*triHeight/2;
    const barBottomX = vTip.x + ux*gap - perpX*triHeight/2;
    const barBottomY = vTip.y + uy*gap - perpY*triHeight/2;

    // 🔹 Desenhar linha do anodo até a base do triângulo
    pdf.line(p1.x, p1.y, triBaseX, triBaseY);

    // 🔹 Triângulo (ponta para catodo)
    pdf.line(vTop.x, vTop.y, vBottom.x, vBottom.y);
    pdf.line(vTop.x, vTop.y, vTip.x, vTip.y);
    pdf.line(vBottom.x, vBottom.y, vTip.x, vTip.y);

    // 🔹 Barra catodo
    pdf.setLineWidth(0.7*scale);
    pdf.line(barTopX, barTopY, barBottomX, barBottomY);

    // 🔹 Linha do catodo até o pino catodo
    const afterBarX = vTip.x + ux*(gap + 0.5*scale);
    const afterBarY = vTip.y + uy*(gap + 0.5*scale);
    pdf.line(afterBarX, afterBarY, p2.x, p2.y);

    // bolinhas nos pinos
    pdf.circle(p1.x, p1.y, 0.8*scale,'FD');
    pdf.circle(p2.x, p2.y, 0.8*scale,'FD');

    // 🔹 GND no pino catodo (se tiver GND)
    part.pins.forEach((pin, idx) => {
        if(pin.net && pin.net.toUpperCase() === "GND") {
            const px = part.origin.x + pin.x;
            const py = part.origin.y + pin.y;
            const p = scaleCoord(px, py);

            const tickLength = 5*scale;
            const base = 4*scale;
            const spacing = 1.5*scale;

            const otherPin = (pin===anodoPin)?catodoPin:anodoPin;
            const otherX = part.origin.x + otherPin.x;
            const otherY = part.origin.y + otherPin.y;
            const otherP = scaleCoord(otherX, otherY);

            let dx = otherP.x - p.x;
            let dy = otherP.y - p.y;
            const len = Math.sqrt(dx*dx + dy*dy);
            const ux = dx/len;
            const uy = dy/len;

            const gndX = p.x - ux*tickLength;
            const gndY = p.y - uy*tickLength;

            const perpX = -uy;
            const perpY = ux;

            const sizes = [base, base*0.66, base*0.33];
            sizes.forEach((s, i) => {
                const offset = i * spacing;
                const startX = gndX - perpX*(s/2) - ux*offset;
                const startY = gndY - perpY*(s/2) - uy*offset;
                const endX = gndX + perpX*(s/2) - ux*offset;
                const endY = gndY + perpY*(s/2) - uy*offset;
                pdf.line(startX, startY, endX, endY);
            });
            pdf.line(p.x, p.y, gndX, gndY);
        }
    });

    drawComponentName(part, scaleCoord, pdf, scale);
    return; // pula o desenho normal
}






if (["L","PL","B"].some(prefix => nameUpper.startsWith(prefix)) && part.pins.length === 2) {
    pdf.setDrawColor(0,0,0);
    pdf.setLineWidth(0.5*scale);

    const x1 = part.origin.x + part.pins[0].x;
    const y1 = part.origin.y + part.pins[0].y;
    const x2 = part.origin.x + part.pins[1].x;
    const y2 = part.origin.y + part.pins[1].y;

    const p1 = scaleCoord(x1, y1);
    const p2 = scaleCoord(x2, y2);

    const turns = 3;          // número de voltas
    const pointsPerTurn = 10; // pontos por volta
    const amplitude = 10*scale; // altura das curvas

    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const length = Math.sqrt(dx*dx + dy*dy);
    const ux = dx / length;
    const uy = dy / length;

    // vetor perpendicular
    const perpX = -uy;
    const perpY = ux;

    let points = [];
    const totalPoints = turns * pointsPerTurn;

    for(let i=0;i<=totalPoints;i++){
        const t = i / totalPoints;
        const baseX = p1.x + dx*t;
        const baseY = p1.y + dy*t;
        // curva apenas para cima usando valor absoluto do seno
        const angle = (i / pointsPerTurn) * Math.PI; // meia volta
        const offset = Math.abs(Math.sin(angle)) * amplitude;
        points.push({x: baseX + perpX*offset, y: baseY + perpY*offset});
    }

    for(let i=1;i<points.length;i++){
        pdf.line(points[i-1].x, points[i-1].y, points[i].x, points[i].y);
    }

    // bolinhas nos pinos
    pdf.circle(p1.x, p1.y, 0.8*scale,'FD');
    pdf.circle(p2.x, p2.y, 0.8*scale,'FD');

    // 🔹 Desenha ícone de GND (3 riscos) nos pinos que têm net "GND"
part.pins.forEach((pin, idx) => {
    if(pin.net && pin.net.toUpperCase() === "GND") {
        const px = part.origin.x + pin.x;
        const py = part.origin.y + pin.y;
        const p = scaleCoord(px, py);

        const tickLength = 5*scale; // comprimento do traço de conexão
        const base = 4*scale;        // comprimento do maior risco
        const spacing = 1.5*scale;   // espaçamento entre os riscos

        // outro pino do resistor
        const otherPin = part.pins[1 - idx];
        const otherX = part.origin.x + otherPin.x;
        const otherY = part.origin.y + otherPin.y;
        const otherP = scaleCoord(otherX, otherY);

        // vetor do pino GND -> outro pino (invertido para fora)
        let dx = otherP.x - p.x;
        let dy = otherP.y - p.y;
        const len = Math.sqrt(dx*dx + dy*dy);
        const ux = dx/len;
        const uy = dy/len;

        // ponto inicial do GND (para fora do resistor)
        const gndX = p.x - ux*tickLength;
        const gndY = p.y - uy*tickLength;

        // vetor perpendicular unitário (para os riscos)
        const perpX = -uy;
        const perpY = ux;

        // desenha 3 riscos, do maior para o menor, afastando perpendicularmente
        const sizes = [base, base*0.66, base*0.33];
        sizes.forEach((s, i) => {
            // deslocamento ao longo do vetor do resistor, para fora
            const offset = i * spacing;
            const startX = gndX - perpX * (s/2) - ux * offset;
            const startY = gndY - perpY * (s/2) - uy * offset;
            const endX = gndX + perpX * (s/2) - ux * offset;
            const endY = gndY + perpY * (s/2) - uy * offset;

            pdf.line(startX, startY, endX, endY);
        });

        // linha conectando pino ao primeiro risco
        pdf.line(p.x, p.y, gndX, gndY);
    }
});


      drawComponentName(part, scaleCoord, pdf, scale);
        return; // pula o desenho normal
}



if(firstLetter === "C" && part.pins.length === 2){
    pdf.setDrawColor(0,0,0);
    pdf.setLineWidth(0.5*scale);

    const x1 = part.origin.x + part.pins[0].x;
    const y1 = part.origin.y + part.pins[0].y;
    const x2 = part.origin.x + part.pins[1].x;
    const y2 = part.origin.y + part.pins[1].y;

    const p1 = scaleCoord(x1, y1);
    const p2 = scaleCoord(x2, y2);

    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const length = Math.sqrt(dx*dx + dy*dy);
    const ux = dx / length;
    const uy = dy / length;

    // perpendicular
    const perpX = -uy;
    const perpY = ux;

    const plateHeight = 12*scale; // altura dos traços
    const offset = 10*scale;      // distância dos traços do pino

    // Posições dos traços verticais
    const t1x = p1.x + ux*offset;
    const t1y = p1.y + uy*offset;
    const t2x = p2.x - ux*offset;
    const t2y = p2.y - uy*offset;

    // linha do pino1 até traço vertical
    pdf.line(p1.x, p1.y, t1x, t1y);

    // traços verticais (perpendiculares à linha entre os pinos)
    pdf.line(t1x - perpX*plateHeight/2, t1y - perpY*plateHeight/2, t1x + perpX*plateHeight/2, t1y + perpY*plateHeight/2);
    pdf.line(t2x - perpX*plateHeight/2, t2y - perpY*plateHeight/2, t2x + perpX*plateHeight/2, t2y + perpY*plateHeight/2);

    // linha horizontal conectando os dois traços
    pdf.line(t1x, t1y, t2x, t2y);

    // linha do traço vertical até pino2
    pdf.line(t2x, t2y, p2.x, p2.y);

    // bolinhas nos pinos
    pdf.circle(p1.x, p1.y, 0.8*scale,'FD');
    pdf.circle(p2.x, p2.y, 0.8*scale,'FD');

    // 🔹 Desenha ícone de GND (3 riscos) nos pinos que têm net "GND"
part.pins.forEach((pin, idx) => {
    if(pin.net && pin.net.toUpperCase() === "GND") {
        const px = part.origin.x + pin.x;
        const py = part.origin.y + pin.y;
        const p = scaleCoord(px, py);

        const tickLength = 5*scale; // comprimento do traço de conexão
        const base = 4*scale;        // comprimento do maior risco
        const spacing = 1.5*scale;   // espaçamento entre os riscos

        // outro pino do resistor
        const otherPin = part.pins[1 - idx];
        const otherX = part.origin.x + otherPin.x;
        const otherY = part.origin.y + otherPin.y;
        const otherP = scaleCoord(otherX, otherY);

        // vetor do pino GND -> outro pino (invertido para fora)
        let dx = otherP.x - p.x;
        let dy = otherP.y - p.y;
        const len = Math.sqrt(dx*dx + dy*dy);
        const ux = dx/len;
        const uy = dy/len;

        // ponto inicial do GND (para fora do resistor)
        const gndX = p.x - ux*tickLength;
        const gndY = p.y - uy*tickLength;

        // vetor perpendicular unitário (para os riscos)
        const perpX = -uy;
        const perpY = ux;

        // desenha 3 riscos, do maior para o menor, afastando perpendicularmente
        const sizes = [base, base*0.66, base*0.33];
        sizes.forEach((s, i) => {
            // deslocamento ao longo do vetor do resistor, para fora
            const offset = i * spacing;
            const startX = gndX - perpX * (s/2) - ux * offset;
            const startY = gndY - perpY * (s/2) - uy * offset;
            const endX = gndX + perpX * (s/2) - ux * offset;
            const endY = gndY + perpY * (s/2) - uy * offset;

            pdf.line(startX, startY, endX, endY);
        });

        // linha conectando pino ao primeiro risco
        pdf.line(p.x, p.y, gndX, gndY);
    }
});


      drawComponentName(part, scaleCoord, pdf, scale);
        return; // pula o desenho normal
}

if (["NN","N"].some(prefix => nameUpper.startsWith(prefix)) && part.pins.length === 2) {
    pdf.setDrawColor(0,0,0);
    pdf.setLineWidth(0.5*scale);

    const x1 = part.origin.x + part.pins[0].x;
    const y1 = part.origin.y + part.pins[0].y;
    const x2 = part.origin.x + part.pins[1].x;
    const y2 = part.origin.y + part.pins[1].y;

    const p1 = scaleCoord(x1, y1);
    const p2 = scaleCoord(x2, y2);

    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const length = Math.sqrt(dx*dx + dy*dy);
    const ux = dx / length;
    const uy = dy / length;

    // perpendicular
    const perpX = -uy;
    const perpY = ux;

    const plateHeight = 12*scale; // altura dos traços
    const offset = 10*scale;      // distância dos traços do pino

    // Posições dos traços verticais
    const t1x = p1.x + ux*offset;
    const t1y = p1.y + uy*offset;
    const t2x = p2.x - ux*offset;
    const t2y = p2.y - uy*offset;

    // linha do pino1 até traço vertical
    pdf.line(p1.x, p1.y, t1x, t1y);

    // traços verticais (perpendiculares à linha entre os pinos)
    pdf.line(t1x - perpX*plateHeight/2, t1y - perpY*plateHeight/2, t1x + perpX*plateHeight/2, t1y + perpY*plateHeight/2);
    pdf.line(t2x - perpX*plateHeight/2, t2y - perpY*plateHeight/2, t2x + perpX*plateHeight/2, t2y + perpY*plateHeight/2);

    // linha horizontal conectando os dois traços
    pdf.line(t1x, t1y, t2x, t2y);

    // linha do traço vertical até pino2
    pdf.line(t2x, t2y, p2.x, p2.y);

    // bolinhas nos pinos
    pdf.circle(p1.x, p1.y, 0.8*scale,'FD');
    pdf.circle(p2.x, p2.y, 0.8*scale,'FD');

    // 🔹 Desenha ícone de GND (3 riscos) nos pinos que têm net "GND"
part.pins.forEach((pin, idx) => {
    if(pin.net && pin.net.toUpperCase() === "GND") {
        const px = part.origin.x + pin.x;
        const py = part.origin.y + pin.y;
        const p = scaleCoord(px, py);

        const tickLength = 5*scale; // comprimento do traço de conexão
        const base = 4*scale;        // comprimento do maior risco
        const spacing = 1.5*scale;   // espaçamento entre os riscos

        // outro pino do resistor
        const otherPin = part.pins[1 - idx];
        const otherX = part.origin.x + otherPin.x;
        const otherY = part.origin.y + otherPin.y;
        const otherP = scaleCoord(otherX, otherY);

        // vetor do pino GND -> outro pino (invertido para fora)
        let dx = otherP.x - p.x;
        let dy = otherP.y - p.y;
        const len = Math.sqrt(dx*dx + dy*dy);
        const ux = dx/len;
        const uy = dy/len;

        // ponto inicial do GND (para fora do resistor)
        const gndX = p.x - ux*tickLength;
        const gndY = p.y - uy*tickLength;

        // vetor perpendicular unitário (para os riscos)
        const perpX = -uy;
        const perpY = ux;

        // desenha 3 riscos, do maior para o menor, afastando perpendicularmente
        const sizes = [base, base*0.66, base*0.33];
        sizes.forEach((s, i) => {
            // deslocamento ao longo do vetor do resistor, para fora
            const offset = i * spacing;
            const startX = gndX - perpX * (s/2) - ux * offset;
            const startY = gndY - perpY * (s/2) - uy * offset;
            const endX = gndX + perpX * (s/2) - ux * offset;
            const endY = gndY + perpY * (s/2) - uy * offset;

            pdf.line(startX, startY, endX, endY);
        });

        // linha conectando pino ao primeiro risco
        pdf.line(p.x, p.y, gndX, gndY);
    }
});


     drawComponentName(part, scaleCoord, pdf, scale);
        return; // pula o desenho normal
}






// --- COMPONENTES DE 3 A 13 PINOS ---
if (part.pins.length >= 3 && part.pins.length < 13) {
    pdf.setDrawColor(0,0,0);
    pdf.setLineWidth(0.5 * scale);

    // 1. Calcula bounding box dos pinos
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    const pinCoords = [];
    part.pins.forEach(pin => {
        const px = part.origin.x + pin.x;
        const py = part.origin.y + pin.y;
        pinCoords.push({x:px,y:py});
        minX = Math.min(minX, px);
        minY = Math.min(minY, py);
        maxX = Math.max(maxX, px);
        maxY = Math.max(maxY, py);
    });

    // Centro e dimensões
    const centerX = (minX + maxX)/2;
    const centerY = (minY + maxY)/2;
    const fullWidth = maxX - minX;
    const fullHeight = maxY - minY;

    // --- Desenha corpo retangular ---
    const bodyWidth = fullWidth * 0.7;
    const bodyHeight = fullHeight * 1.2;
    const left   = centerX - bodyWidth/2;
    const right  = centerX + bodyWidth/2;
    const top    = centerY - bodyHeight/2;
    const bottom = centerY + bodyHeight/2;

    const tl = scaleCoord(left, top);
    const tr = scaleCoord(right, top);
    const br = scaleCoord(right, bottom);
    const bl = scaleCoord(left, bottom);

    pdf.line(tl.x, tl.y, tr.x, tr.y);
    pdf.line(tr.x, tr.y, br.x, br.y);
    pdf.line(br.x, br.y, bl.x, bl.y);
    pdf.line(bl.x, bl.y, tl.x, tl.y);

    // --- Triângulo menor central apenas para 3 pinos ---
    if(part.pins.length===3){
        const triPts = pinCoords.map(p=>({x:p.x, y:p.y})); // pontos do triângulo
        const triScaled = triPts.map(p => scaleCoord(p.x,p.y));

        // triangulo menor centrado (ajustado para não substituir linhas)
        const triCenter = scaleCoord(centerX, centerY);
        const shrink = 0.3; // escala do triângulo
        const triSmall = triScaled.map(p=>{
            return {
                x: triCenter.x + (p.x - triCenter.x)*shrink,
                y: triCenter.y + (p.y - triCenter.y)*shrink
            };
        });

        pdf.line(triSmall[0].x, triSmall[0].y, triSmall[1].x, triSmall[1].y);
        pdf.line(triSmall[1].x, triSmall[1].y, triSmall[2].x, triSmall[2].y);
        pdf.line(triSmall[2].x, triSmall[2].y, triSmall[0].x, triSmall[0].y);

        // círculo central
        pdf.circle(triCenter.x, triCenter.y, 10.5*scale,'D');
    }

    // --- Linhas dos pinos e GND ---
    part.pins.forEach((pin,index)=>{
        const px = part.origin.x + pin.x;
        const py = part.origin.y + pin.y;
        const pinP = scaleCoord(px, py);

        let bodyP = null;
        if(part.pins.length!==3){
            // Retângulo: calcula ponto do corpo
            const distLeft   = px - left;
            const distRight  = right - px;
            const distTop    = py - top;
            const distBottom = bottom - py;
            const minDist = Math.min(distLeft, distRight, distTop, distBottom);

            if(minDist===distLeft){bodyP = scaleCoord(left, py);}
            else if(minDist===distRight){bodyP = scaleCoord(right, py);}
            else if(minDist===distTop){bodyP = scaleCoord(px, top);}
            else{bodyP = scaleCoord(px, bottom);}
        } else {
            // Para 3 pinos, conecta ao triângulo central menor
            const triCenter = scaleCoord(centerX, centerY);
            const shrink = 0.3;
            bodyP = {
                x: triCenter.x + (pinP.x - triCenter.x)*shrink,
                y: triCenter.y + (pinP.y - triCenter.y)*shrink
            };
        }

        // Linhas em L ou diagonal para o triângulo central
        pdf.line(bodyP.x, bodyP.y, pinP.x, pinP.y);

        // Bolinha no pino
        pdf.circle(pinP.x, pinP.y, 0.0*scale,'FD');

        // 🔹 Desenha ícone de GND se o pino for GND
        if(pin.net && pin.net.toUpperCase() === "GND") {
            const tickLength = 5*scale;
            const base = 4*scale;
            const spacing = 1.5*scale;

            // vetor do pino -> corpo (para projetar para fora)
            const dx = bodyP.x - pinP.x;
            const dy = bodyP.y - pinP.y;
            const len = Math.sqrt(dx*dx + dy*dy);
            const ux = dx/len;
            const uy = dy/len;

            // ponto inicial do GND (fora do corpo)
            const gndX = pinP.x - ux*tickLength;
            const gndY = pinP.y - uy*tickLength;

            // vetor perpendicular unitário (para os riscos)
            const perpX = -uy;
            const perpY = ux;

            // desenha 3 riscos do maior para o menor
            const sizes = [base, base*0.66, base*0.33];
            sizes.forEach((s, i) => {
                const offset = i * spacing;
                const startX = gndX - perpX * (s/2) - ux * offset;
                const startY = gndY - perpY * (s/2) - uy * offset;
                const endX = gndX + perpX * (s/2) - ux * offset;
                const endY = gndY + perpY * (s/2) - uy * offset;
                pdf.line(startX, startY, endX, endY);
            });

            // linha conectando pino ao primeiro risco
            pdf.line(pinP.x, pinP.y, gndX, gndY);
        }

        // nome do pino
        const pinName = pin.name || `P${index+1}`;
        pdf.setFontSize(4.5 * scale);
        pdf.setTextColor(55,55,255);
        const offsetX = (pinP.x - bodyP.x) * 0.25 + 1;
        const offsetY = (pinP.y - bodyP.y) * 0.25 + 1;
        pdf.text(pinName, pinP.x + offsetX, pinP.y + offsetY, {align:"left", baseline:"middle"});
    });

    // 4. nome do componente no centro do corpo
    const c = scaleCoord(centerX, centerY);
    pdf.setFontSize(6.5 * scale);
    pdf.setTextColor(0,0,0);
    pdf.text(part.name || "", c.x, c.y, {align:"center", baseline:"middle"});

    return; // não desenha outline normal
}






// --- COMPONENTES J (FPC) ---
if (part.pins.length >= 3 && part.pins.length < 1399 && 
    (part.name.startsWith("J") || part.name.startsWith("CON"))) {
    pdf.setDrawColor(0,0,0);
    pdf.setLineWidth(0.5 * scale);

    // 1. Calcula bounding box dos pinos
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    const pinCoords = [];
    part.pins.forEach(pin => {
        const px = part.origin.x + pin.x;
        const py = part.origin.y + pin.y;
        pinCoords.push({x:px, y:py});
        minX = Math.min(minX, px);
        minY = Math.min(minY, py);
        maxX = Math.max(maxX, px);
        maxY = Math.max(maxY, py);
    });

    // Centro e dimensões
    const centerX = (minX + maxX)/2;
    const centerY = (minY + maxY)/2;

    // --- Quadrado central sem shrink ---
    const shrink = 1.0; // agora quadrado = bounding box
    const bodyLeft = centerX - (maxX-minX)/2*shrink;
    const bodyRight = centerX + (maxX-minX)/2*shrink;
    const bodyTop = centerY - (maxY-minY)/2*shrink;
    const bodyBottom = centerY + (maxY-minY)/2*shrink;

    const tl = scaleCoord(bodyLeft, bodyTop);
    const tr = scaleCoord(bodyRight, bodyTop);
    const br = scaleCoord(bodyRight, bodyBottom);
    const bl = scaleCoord(bodyLeft, bodyBottom);

    pdf.line(tl.x, tl.y, tr.x, tr.y);
    pdf.line(tr.x, tr.y, br.x, br.y);
    pdf.line(br.x, br.y, bl.x, bl.y);
    pdf.line(bl.x, bl.y, tl.x, tl.y);

    // --- Linhas dos pinos (riscos) e GND ---
    part.pins.forEach((pin,index)=>{
        const px = part.origin.x + pin.x;
        const py = part.origin.y + pin.y;
        const pinP = scaleCoord(px, py);

        // --- Determina borda mais próxima do quadrado ---
       let bodyP = {x:centerX, y:centerY};

// distância extra para fora
const out = 25 * scale; // ajuste este valor p/ aumentar o quanto sai

const distances = [
    {side:'top',    absDist: Math.abs(bodyTop - py)},
    {side:'bottom', absDist: Math.abs(bodyBottom - py)},
    {side:'left',   absDist: Math.abs(bodyLeft - px)},
    {side:'right',  absDist: Math.abs(bodyRight - px)}
];

const nearest = distances.reduce((prev,curr)=> curr.absDist < prev.absDist ? curr : prev, distances[0]);

switch(nearest.side){
    case 'top':
        bodyP.x = Math.min(Math.max(px, bodyLeft), bodyRight);
        bodyP.y = bodyTop - out; // agora para fora
        break;
    case 'bottom':
        bodyP.x = Math.min(Math.max(px, bodyLeft), bodyRight);
        bodyP.y = bodyBottom + out;
        break;
    case 'left':
        bodyP.x = bodyLeft - out;
        bodyP.y = Math.min(Math.max(py, bodyTop), bodyBottom);
        break;
    case 'right':
        bodyP.x = bodyRight + out;
        bodyP.y = Math.min(Math.max(py, bodyTop), bodyBottom);
        break;
}

const bodyScaled = scaleCoord(bodyP.x, bodyP.y);

// Linha do corpo até o pino (riscos saindo para fora)
if(bodyScaled && pinP && !isNaN(bodyScaled.x) && !isNaN(bodyScaled.y) && !isNaN(pinP.x) && !isNaN(pinP.y)){
    pdf.line(pinP.x, pinP.y, bodyScaled.x, bodyScaled.y);
}

        // 🔹 GND (mantém igual)
        if(pin.net && pin.net.toUpperCase() === "GND") {
            const tickLength = 5*scale;
            const base = 4*scale;
            const spacing = 1.5*scale;

                  // vetor para fora do corpo
// vetor para fora do corpo (invertido)
let dx = pinP.x - bodyScaled.x;
let dy = pinP.y - bodyScaled.y;

let len = Math.sqrt(dx*dx + dy*dy);
if(len>0){
    const ux = dx/len;
    const uy = dy/len;
    // mais para fora do ponto externo
    const gndX = bodyScaled.x + ux*tickLength;
    const gndY = bodyScaled.y + uy*tickLength;
    pdf.line(bodyScaled.x,bodyScaled.y,gndX,gndY);


                const perpX = -uy;
                const perpY = ux;

                const sizes = [base, base*0.66, base*0.33];
                sizes.forEach((s,i)=>{
                    const offset = i*spacing;
                    const startX = gndX - perpX*(s/2) - ux*offset;
                    const startY = gndY - perpY*(s/2) - uy*offset;
                    const endX   = gndX + perpX*(s/2) - ux*offset;
                    const endY   = gndY + perpY*(s/2) - uy*offset;
                    if([startX,startY,endX,endY].every(v=>!isNaN(v))){
                        pdf.line(startX,startY,endX,endY);
                    }
                });
                if(!isNaN(gndX) && !isNaN(gndY)){
                    pdf.line(pinP.x,pinP.y,gndX,gndY);
                }
            }
        }

        // Nome do pino
        const pinName = pin.name || `P${index+1}`;
        pdf.setFontSize(4.5 * scale);
        pdf.setTextColor(55,55,255);
       const offsetX = (bodyScaled.x - pinP.x)*0.1; // pequeno ajuste
const offsetY = (bodyScaled.y - pinP.y)*0.1;
pdf.text(pinName, bodyScaled.x + offsetX, bodyScaled.y + offsetY,
  {align:"left", baseline:"middle"});

    });

    // --- Nome do componente no centro ---
    const c = scaleCoord(centerX, centerY);
    pdf.setFontSize(20.5*scale);
    pdf.setTextColor(0,0,0);
    pdf.text(part.name || "", c.x, c.y, {align:"center", baseline:"middle"});

    return;
}






        // --- Desenho normal de outline ---
        if (part.outline && part.outline.length >= 2) {
            pdf.setDrawColor(0,0,0);
            pdf.setLineWidth(0.5 * scale);
            for (let i = 0; i < part.outline.length; i += 2) {
                const x1 = part.origin.x + part.outline[i];
                const y1 = part.origin.y + part.outline[i+1];
                const j = (i+2 < part.outline.length) ? i+2 : 0;
                const k = (i+3 < part.outline.length) ? i+3 : 1;
                const x2 = part.origin.x + part.outline[j];
                const y2 = part.origin.y + part.outline[k];
                const p1 = scaleCoord(x1, y1);
                const p2 = scaleCoord(x2, y2);
                pdf.line(p1.x, p1.y, p2.x, p2.y);
            }
        }
        if(part.name && part.outline && part.outline.length >= 4){
    // Calcula o bounding box do componente
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for(let i=0;i<part.outline.length;i+=2){
        const px = part.origin.x + part.outline[i];
        const py = part.origin.y + part.outline[i+1];
        if(px < minX) minX = px;
        if(py < minY) minY = py;
        if(px > maxX) maxX = px;
        if(py > maxY) maxY = py;
    }

    // Posição do texto: ligeiramente acima ou à direita dependendo da orientação
    const width = maxX - minX;
    const height = maxY - minY;
    let textX = (minX + maxX)/2;
    let textY = (minY + maxY)/2;

    const offset = 5; // em coordenadas do desenho, será escalado
    if(width < height){ // vertical, nome à direita
        textX = maxX + offset;
        textY = (minY + maxY)/2;
    } else { // horizontal, nome acima
        textX = (minX + maxX)/2;
        textY = maxY + offset;
    }

    // Converte para coordenadas do PDF
    const pos = scaleCoord(textX, textY);

    // Define tamanho da fonte proporcional à escala
    pdf.setFontSize(20*scale);
    pdf.setTextColor(55,55,255);
    pdf.text(part.name, pos.x, pos.y, {align:"center", baseline:"middle"});
}

        // --- Desenho normal de pinos ---
        part.pins.forEach(pin => {
            let fill=[255,255,255], stroke=[0,0,0];
            if((pin.net||"").toUpperCase().includes("GND")) fill=[180,180,180], stroke=[80,80,80];
            else if((pin.net||"").toUpperCase().includes("NC")) fill=[150,150,255], stroke=[0,0,0];

            const isSelected = selectedNets.some(sel => (pin.net||"").toUpperCase()===sel.net.toUpperCase());
            if(isSelected) fill=[255,255,255];

            pdf.setFillColor(...fill);
            pdf.setDrawColor(...stroke);
            pdf.setLineWidth(0.5*scale);

            let center;
            if(pin.outlineRelative && pin.outlineRelative.length>=4){
                const points = [];
                for(let i=0;i<pin.outlineRelative.length;i+=2){
                    const px = part.origin.x + pin.x + pin.outlineRelative[i];
                    const py = part.origin.y + pin.y + pin.outlineRelative[i+1];
                    points.push(scaleCoord(px, py));
                }
                pdf.lines(points.map((p,i)=>[points[(i+1)%points.length].x - p.x, points[(i+1)%points.length].y - p.y]), points[0].x, points[0].y, [1,1], 'FD');
                const sumX = points.reduce((a,p)=>a+p.x,0)/points.length;
                const sumY = points.reduce((a,p)=>a+p.y,0)/points.length;
                center = {x:sumX, y:sumY};
            } else {
                center = scaleCoord(part.origin.x + pin.x, part.origin.y + pin.y);
                pdf.circle(center.x, center.y, (pin.radius||2)*scale, 'FD');
            }

            if(pin.name){
                pdf.setFontSize(6*scale);
                pdf.setTextColor(55,55,255);
                pdf.text(pin.name, center.x, center.y, {align:"center", baseline:"middle"});
            }
            
            
        });
           
 
});



// Função para verificar se a linha entre p0 e p1 cruza algum componente
function intersectsComponent(p0, p1, partsArray) {
    for (const part of partsArray) {
        const left = part.left, right = part.right;
        const top = part.top, bottom = part.bottom;

        // Checa cruzamento com o retângulo do componente (simples)
        if (Math.min(p0.x,p1.x) < right && Math.max(p0.x,p1.x) > left &&
            Math.min(p0.y,p1.y) < bottom && Math.max(p0.y,p1.y) > top) {
            return true;
        }
    }
    return false;
}


// --- 6️⃣ Desenha linhas em L para cada net e bolinhas em cada pino ---
let netIndex = 0;
const partsArray = parts.map(part => ({
    left: part.left,
    right: part.right,
    top: part.top,
    bottom: part.bottom
}));

// Array para guardar posições de textos já desenhados
const drawnTextPositions = [];
const minDist = 80*scale; // distância mínima entre textos

// Função para criar rota em L sem passar pelos componentes
function routeLine(p0, p1, partsArray){
    let points = [];
    points.push(p0);

    let mid;
    if(Math.abs(p1.x - p0.x) > Math.abs(p1.y - p0.y)){
        mid = {x: p1.x, y: p0.y}; // horizontal primeiro
    } else {
        mid = {x: p0.x, y: p1.y}; // vertical primeiro
    }

    if(intersectsComponent(p0, mid, partsArray)){
        if(mid.x === p1.x){
            mid = {x: p1.x, y: p0.y};
        } else {
            mid = {x: p0.x, y: p1.y};
        }
    }

    points.push(mid);
    points.push(p1);
    return points;
}
// Função para gerar cor escura aleatória
function randomDarkColor() {
    return [
        Math.floor(Math.random() * 125) + 55, // 55 a 180
        Math.floor(Math.random() * 125) + 55,
        Math.floor(Math.random() * 125) + 55
    ];
}

// Array para cores de cada net (para painel)
const netColors = {};

// Desenha as nets
for(const netName in netPinsMap){
    const netPins = netPinsMap[netName];
    if(netPins.length < 2) continue;

    // Ordena pinos pelo mais próximo
    const remaining = netPins.slice();
    const path = [];
    remaining.sort((a,b) => a.center.x**2 + a.center.y**2 - (b.center.x**2 + b.center.y**2));
    let current = remaining.shift();
    path.push(current);

    while(remaining.length > 0){
        let nearestIndex = 0, nearestDist = Infinity;
        remaining.forEach((p,i)=>{
            const dx = p.center.x - current.center.x;
            const dy = p.center.y - current.center.y;
            const dist = dx*dx + dy*dy;
            if(dist < nearestDist){
                nearestDist = dist;
                nearestIndex = i;
            }
        });
        current = remaining.splice(nearestIndex,1)[0];
        path.push(current);
    }

    // Cor aleatória para a net
    // Cor aleatória escura
    const color = randomDarkColor();
    netColors[netName] = color;

    pdf.setLineWidth(1*scale);
    pdf.setDrawColor(...color);
    pdf.setFillColor(...color);
    // Desenha linhas em L
    for(let i=1;i<path.length;i++){
        const p0 = path[i-1].center;
        const p1 = path[i].center;
        const route = routeLine(p0, p1, partsArray);

        for(let j=1;j<route.length;j++){
            let start = route[j-1];
            let end = route[j];

            let offset = 0;
            if(intersectsComponent(start,end,partsArray)){
                offset = (j % 2 === 0 ? 1 : -1) * scale * 5;
            }

            pdf.line(start.x + offset, start.y + offset, end.x + offset, end.y + offset);
        }

        // bolinhas nos pinos
        pdf.circle(p0.x, p0.y, 1.5*scale, 'FD');
        pdf.circle(p1.x, p1.y, 1.5*scale, 'FD');
    }

    // 🔹 Desenha o nome da net apenas se não tiver texto próximo
    const lastPin = path[path.length-1].center;
    const textOffsetX = 5*scale;
    const textOffsetY = -5*scale;

    let canDrawText = true;
    for(const pos of drawnTextPositions){
        const dx = (lastPin.x + textOffsetX) - pos.x;
        const dy = (lastPin.y + textOffsetY) - pos.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < minDist){
            canDrawText = false;
            break;
        }
    }

    if(canDrawText){
        pdf.setTextColor(55,55,255);
        pdf.setFontSize(8*scale);
        pdf.text(netName, lastPin.x + textOffsetX, lastPin.y + textOffsetY);
        drawnTextPositions.push({x: lastPin.x + textOffsetX, y: lastPin.y + textOffsetY});

        // seta do texto
        const arrowStart = {x: lastPin.x + textOffsetX - 1, y: lastPin.y + textOffsetY - 1};
        const arrowEnd = {x: lastPin.x, y: lastPin.y};
        const arrowSize = 2*scale;
        const angle = Math.atan2(arrowEnd.y - arrowStart.y, arrowEnd.x - arrowStart.x);
        const arrowLeft = {x: arrowEnd.x - arrowSize*Math.cos(angle - Math.PI/6), y: arrowEnd.y - arrowSize*Math.sin(angle - Math.PI/6)};
        const arrowRight = {x: arrowEnd.x - arrowSize*Math.cos(angle + Math.PI/6), y: arrowEnd.y - arrowSize*Math.sin(angle + Math.PI/6)};
        pdf.setLineWidth(0.5*scale);
        pdf.setDrawColor(55,55,255);
        pdf.line(arrowStart.x, arrowStart.y, arrowEnd.x, arrowEnd.y);
        pdf.line(arrowEnd.x, arrowEnd.y, arrowLeft.x, arrowLeft.y);
        pdf.line(arrowEnd.x, arrowEnd.y, arrowRight.x, arrowRight.y);
    }

    netIndex++;
}
// --- Painel com cores das nets (maior) ---
pdf.setFontSize(21*scale); // 3x maior que antes
const panelX = 10*scale;
let panelY = 30*scale; // topo 3x mais distante

for(const netName in netColors){
    if(netName.toUpperCase().startsWith("NET")) continue; // ignora nomes que começam com "NET"

    const color = netColors[netName];

    // Desenha o fundo colorido com borda preta
    pdf.setFillColor(...color);
    pdf.setDrawColor(0,0,0); // borda preta
    const textWidth = pdf.getTextWidth(netName) + 8*scale; // margem maior
    const rectHeight = 24*scale; // 3x maior que antes
    pdf.rect(panelX, panelY - 18*scale, textWidth, rectHeight, 'FD'); // F=fill, D=draw

    // Escreve o nome em branco no centro do retângulo
    pdf.setTextColor(255,255,255);
    pdf.text(netName, panelX + 4*scale, panelY); 

    panelY += rectHeight + 6*scale; // próximo item, com espaçamento maior
}








    pdf.save("nets_selecionadas.pdf");
}




function drawComponentName(part, scaleCoord, pdf, scale){
    if(!part.name || !part.outline || part.outline.length < 4) return;

    // calcula bounding box da outline
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for(let i=0;i<part.outline.length;i+=2){
        const px = part.origin.x + part.outline[i];
        const py = part.origin.y + part.outline[i+1];
        minX = Math.min(minX, px);
        minY = Math.min(minY, py);
        maxX = Math.max(maxX, px);
        maxY = Math.max(maxY, py);
    }

    const centerX = (minX + maxX)/2;
    const centerY = (minY + maxY)/2;

    const offset = 4*scale;
    let nameX = centerX + offset;
    let nameY = centerY;

    const width = maxX - minX;
    const height = maxY - minY;
    if(width < height){ 
        nameX = maxX + offset;
        nameY = centerY;
    } else {
        nameX = centerX;
        nameY = maxY + offset;
    }

    const pos = scaleCoord(nameX, nameY);
    pdf.setFontSize(6.5*scale);
    pdf.setTextColor(0,0,0);
    pdf.text(part.name, pos.x, pos.y, {align:"center", baseline:"middle"});
}


// Botão para exportar net selecionada
const btnExportarNet = document.createElement("button");
btnExportarNet.textContent = "📐 Exportar Net Selecionada";
btnExportarNet.style.position = "fixed";
btnExportarNet.style.top = "130px";
btnExportarNet.style.left = "430px";
btnExportarNet.style.padding = "10px 20px";
btnExportarNet.style.backgroundColor = "#673AB7";
btnExportarNet.style.color = "#fff";
btnExportarNet.style.border = "none";
btnExportarNet.style.borderRadius = "6px";
btnExportarNet.style.cursor = "pointer";
btnExportarNet.onclick = exportarNetSelecionadaPDF;
document.body.appendChild(btnExportarNet);



