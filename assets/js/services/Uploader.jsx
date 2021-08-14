import React from 'react';
import $ from "jquery";
import XLSX from "xlsx";
const Uploader = () => {
    const handleUpload = () => {
        $(document).ready(function () {
            $("#fileUploader").change(function (evt) {
                var selectedFile = evt.target.files[0];
                var reader = new FileReader();
                reader.onload = function (event) {
                    var data = event.target.result;
                    var workbook = XLSX.read(data, {
                        type: 'binary'
                    });
                    workbook.SheetNames.forEach(function (sheetName) {

                        var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                        console.log(XL_row_object);


                    })
                };

                reader.onerror = function (event) {
                    console.error("File could not be read! Code " + event.target.error.code);
                };

                reader.readAsBinaryString(selectedFile);
            });
        });
    }

    return (
        <>
            <input type="file" id="fileUploader" name="fileUploader" accept=".xls, .xlsx" /> <br />
            <div className="d-grid gap-2">
                <button onClick={() => handleUpload()} className="btn btn-primary" type="button">SFOGLIA</button>

            </div>
        </>
    )
}



export default Uploader;

