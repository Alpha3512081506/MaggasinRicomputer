import React, { Component } from 'react';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';
import { Col, Input, InputGroup, InputGroupAddon, FormGroup, Label, Button, Fade, FormFeedback, Container, Card } from 'reactstrap';

class ExcelExporter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            dataLoaded: false,
            isFormInvalid: false,
            rows: null,
            cols: null
        }
        this.fileHandler = this.fileHandler.bind(this);
        this.toggle = this.toggle.bind(this);
        this.openFileBrowser = this.openFileBrowser.bind(this);
        this.renderFile = this.renderFile.bind(this);
        this.fileInput = React.createRef();
    }

    renderFile = (fileObj) => {
        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                this.setState({
                    dataLoaded: true,
                    cols: resp.cols,
                    rows: resp.rows
                });
            }
        });
    }

    fileHandler = (event) => {
        if (event.target.files.length) {
            let fileObj = event.target.files[0];
            let fileName = fileObj.name;


            //check for file extension and pass only if it is .xlsx and display error message otherwise
            if (fileName.slice(fileName.lastIndexOf('.') + 1) === "xlsx") {
                this.setState({
                    uploadedFileName: fileName,
                    isFormInvalid: false
                });
                this.renderFile(fileObj)
            }
            else {
                this.setState({
                    isFormInvalid: true,
                    uploadedFileName: ""
                })
            }
        }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    openFileBrowser = () => {
        this.fileInput.current.click();
    }



    render() {
        return (

            <div>

                <Container>
                    <form>
                        <FormGroup row>

                            <Col xs={4} sm={8} lg={10}>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <Button color="success" style={{ color: "white", zIndex: 0 }} onClick={this.openFileBrowser.bind(this)}><i className="cui-file"></i> Sfoglia&hellip;</Button>
                                        <input type="file" hidden onChange={this.fileHandler.bind(this)} ref={this.fileInput} onClick={(event) => { event.target.value = null }} style={{ "padding": "10px" }} />
                                    </InputGroupAddon>
                                    <Input type="text" className="form-control" defaultValue={this.state.uploadedFileName} readOnly invalid={this.state.isFormInvalid} />
                                    <FormFeedback>
                                        <Fade in={this.state.isFormInvalid} tag="h6" style={{ fontStyle: "italic" }}>
                                            Seleziona solo un file .xlsx !
                                        </Fade>
                                    </FormFeedback>
                                </InputGroup>
                            </Col>
                        </FormGroup>
                    </form>

                    {this.state.dataLoaded &&
                        <div>
                            <Card body outline color="secondary" className="restrict-card">

                                <OutTable data={this.state.rows} columns={this.state.cols} tableClassName=" table thead-dark table-bordered table-hover table-responsive table-sm" tableHeaderRowClass="heading" />

                            </Card>
                        </div>}
                </Container>
            </div>
        );
    }
}


export default ExcelExporter;


