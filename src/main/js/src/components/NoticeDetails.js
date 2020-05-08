import React from "react";
import axios from "axios";
import { Button, Spinner } from "react-bootstrap";
import localforage from "localforage";

class NoticeDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notice: {},
            loaded: false
        };
    }

    componentDidMount = () => {
        let that = this;
        localforage.getItem('notices-list').then(function(value) {
            if(value != null){
                let noticeById = value.find( obj => {
                    return obj.id === that.props.match.params.id
                })
                if (noticeById != null)
                {
                    that.setState({
                        notice: noticeById,
                        loaded: true
                    })
                    console.log("Notice loaded from indexedDB");
                }
            }
        }).catch(function(err) {
            console.log(err);
        });

        axios.get("https://notice-board-wzas.herokuapp.com/api/notice/" + this.props.match.params.id)
            .then(response => {
                let tempNotice = response.data;
                let d = new Date(tempNotice["added"]);
                tempNotice["added"] = d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
                this.setState({
                    notice: tempNotice,
                    loaded: true
                });
                console.log("Notice loaded from remote");
            }).catch(error => {
            alert(error.response.data);
            this.props.history.goBack();
        });
    };

    render() {
        if (this.state.loaded) {
            return (
                <div>
                    <h1>Notice details</h1>
                    <h5>Title</h5>
                    <p>{this.state.notice["title"]}</p>
                    <hr/>

                    <h5>Description</h5>
                    <p>{this.state.notice["description"]}</p>
                    <hr/>

                    <h5>Posted by</h5>
                    <p>{this.state.notice["publisher"]}</p>
                    <hr/>

                    <h5>Posted at</h5>
                    <p>{this.state.notice["added"]}</p>
                    <hr/>

                    <h5>Phone number</h5>
                    <p>{this.state.notice["phoneNumber"]}</p>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Notice details</h1>
                    <Spinner animation="border"/>
                </div>
            )
        }
    }
}

export default NoticeDetails;
