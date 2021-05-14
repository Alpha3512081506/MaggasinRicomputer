<script src="https://cdn.rawgit.com/serratus/quaggaJS/0420d5e0/dist/quagga.min.js"></script>
//Initialisation de la class Audio(javascript resource var audio = new Audio(file.mp3)
const audi = new  Audio("assets/js/services/beep.mp3")

var _scannerIsRunning = false;
function initialization(idElement){
Quagga.init({
    inputStream : {
        name : "Live",
        type : "LiveStream",
        // Or '#yourElement' (optional)
        target: document.querySelector(idElement)
    },
    frequency:2,
    decoder : {
        readers: [
            "code_128_reader",
            "ean_reader",
            "ean_8_reader",
            "code_39_reader",
            "code_39_vin_reader",
            "codabar_reader",
            "upc_reader",
            "upc_e_reader",
            "i2of5_reader"
        ],//Ajouter les decodeurs disponible;
    }
}, function(err) {
    if (err) {
        console.log(err);
        return
    }
    console.log("Initialization finished. Ready to start");
    Quagga.start();
    var _scannerIsRunning = true;
});
}
function execute() {

    Quagga.onProcessed(function (result) {
        var drawingCtx = Quagga.canvas.ctx.overlay,
            drawingCanvas = Quagga.canvas.dom.overlay;

        if (result) {
            if (result.boxes) {
                drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                result.boxes.filter(function (box) {
                    return box !== result.box;
                }).forEach(function (box) {
                    Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
                });
            }

            if (result.box) {
                Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
            }

            if (result.codeResult && result.codeResult.code) {
                Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
            }
        }
    });

}
function detection() {
    Quagga.onDetected(function (result) {
        console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);
    });
    function camera() {
        document.getElementById("btn").addEventListener("click", function () {
            if (_scannerIsRunning) {
                Quagga.stop();
            } else {
                startScanner();
            }
        }, false);

    }
}
export default {
    initialization,
    execute,
    detection,
    camera
}