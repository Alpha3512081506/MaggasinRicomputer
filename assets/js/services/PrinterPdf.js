import React, { useRef } from 'react';




const PrinterPdf = ({ dataPrint, handlePrint, componentRef }) => {


    return (
        <div>
            dataPrint={dataPrint} ref={componentRef}
            <button onClick={handlePrint}>STAMPA</button>
        </div>
    );
};
export default PrinterPdf
