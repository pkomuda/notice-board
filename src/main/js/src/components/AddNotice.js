import React from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import localforage from "localforage";
import swal from 'sweetalert';

class AddNotice extends React.Component {

    constructor(props) {
        super(props);
        window.addEventListener('offline', () => {
            console.log('came offline');
        });
        window.addEventListener('online', () => console.log('came online'));
        this.state = {
            notice: {"title": "", "description": "", "publisher": "", "phoneNumber": 0},
            valid: {"title": true, "description": true, "publisher": true, "phoneNumber": true}
        };
    }

    validateProperty = (property) => {
        let tempValid = {...this.state.valid};
        switch (property) {
            case "title":
                tempValid["title"] = document.getElementById("title").value.length !== 0;
                break;
            case "description":
                tempValid["description"] = document.getElementById("description").value.length !== 0;
                break;
            case "publisher":
                tempValid["publisher"] = document.getElementById("publisher").value.length !== 0;
                break;
            case "phoneNumber":
                tempValid["phoneNumber"] = document.getElementById("phoneNumber").value.toString().length === 9;
                break;
            default:
                break;
        }
        this.setState({valid: tempValid});
    };

    handleChangeProperty = (event, property) => {
        let tempNotice = {...this.state.notice};
        tempNotice[property] = event.target.value;
        this.setState({notice: tempNotice});
        this.validateProperty(property);
    };

    checkValidation = () => {
        let validated = true;
        let tempValid = {...this.state.valid};
        tempValid["title"] = document.getElementById("title").value.length !== 0;
        tempValid["description"] = document.getElementById("description").value.length !== 0;
        tempValid["publisher"] = document.getElementById("publisher").value.length !== 0;
        tempValid["phoneNumber"] = document.getElementById("phoneNumber").value.toString().length === 9;
        for (let key in tempValid) {
            if (tempValid.hasOwnProperty(key) && tempValid[key] === false) {
                this.validateProperty(key);
                validated = false;
                break;
            }
        }
        return validated;
    };

    handleSubmit = () => {
        let tempNotice = {...this.state.notice};
        tempNotice["id"] = uuidv4();
        tempNotice["added"] = new Date();
        let list = [];
        if (this.checkValidation()) {
            if (!navigator.onLine) {
                localforage.getItem("notice-adder").then(function (result) {
                    for(let i = 0 ; i<result.size; i++){
                        list.push(result[i]);
                    }
                })
                list.push(tempNotice);
                console.log(list);
                localforage.setItem('notice-adder', list, function (result) {
                    console.log("Notices saved to indexedDB");
                    swal({
                        title: "Offline",
                        text: "Notice will be cached",
                        icon: "warning",
                        closeOnClickOutside: true
                    });
                });
                this.props.history.goBack();

            }
            window.ononline = () => {
                localforage.getItem('notice-adder').then(function (result) {
                    for (let notice in result) {
                        axios.post("https://notice-board-wzas.herokuapp.com/api/notice", notice)
                            .then(response => {
                                swal(response.data);
                            }).catch(error => {
                            console.log(error);
                        });
                    }
                    localforage.setItem('notice-adder', list);
                });
                axios.post("https://notice-board-wzas.herokuapp.com/api/notice", tempNotice)
                    .then(response => {
                        swal(response.data);
                        this.props.history.goBack();
                    }).catch(error => {
                });
            }
            if(navigator.onLine){
                axios.post("https://notice-board-wzas.herokuapp.com/api/notice", tempNotice)
                    .then(response => {
                        swal(response.data);
                        this.props.history.goBack();
                    }).catch(error => {
                });
            }
        } else {
            swal("Please fill out every field in the form.")
        }
    }

    render() {
        return (
            <div>
                <h1>Add notice</h1>
                <Form>
                    <FormGroup>
                        <FormLabel>Title</FormLabel>
                        <FormControl id="title" value={this.state.notice["title"]} onChange={(event) => this.handleChangeProperty(event, "title")} isInvalid={!this.state.valid["title"]}/>
                        <FormControl.Feedback type="invalid">Please provide a title.</FormControl.Feedback>
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Description</FormLabel>
                        <FormControl id="description" value={this.state.notice["description"]} onChange={(event) => this.handleChangeProperty(event, "description")} isInvalid={!this.state.valid["description"]}/>
                        <FormControl.Feedback type="invalid">Please provide a description.</FormControl.Feedback>
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Your name</FormLabel>
                        <FormControl id="publisher" value={this.state.notice["publisher"]} onChange={(event) => this.handleChangeProperty(event, "publisher")} isInvalid={!this.state.valid["publisher"]}/>
                        <FormControl.Feedback type="invalid">Please provide your name.</FormControl.Feedback>
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Your phone number</FormLabel>
                        <FormControl id="phoneNumber" value={this.state.notice["phoneNumber"]} onChange={(event) => this.handleChangeProperty(event, "phoneNumber")} isInvalid={!this.state.valid["phoneNumber"]} type="number"/>
                        <FormControl.Feedback type="invalid">Phone number must have 9 digits.</FormControl.Feedback>
                    </FormGroup>
                    <Button onClick={this.handleSubmit}>Submit</Button>
                </Form>
                <Button style={{marginTop: "1em"}} onClick={this.props.history.goBack}>Cancel</Button>
            </div>
        )
    }
}

export default AddNotice;
