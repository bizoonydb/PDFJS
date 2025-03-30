// worker.js
self.onmessage = function (e) {
    console.log("Processando:", e.data);
    let resultado = e.data * 2; // Simulação de processamento
    self.postMessage(resultado);
};
