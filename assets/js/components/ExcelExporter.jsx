import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExcelExporter = ({ dataSet, label, value, name, children }) => {
    return (<>
        <ExcelFile element={<button>Download Data</button>}>
            <ExcelSheet data={dataSet} name={name}>
                {children}
            </ExcelSheet>
        </ExcelFile>
    </>);
}

export default ExcelExporter;


