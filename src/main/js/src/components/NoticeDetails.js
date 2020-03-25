import React from "react";
import axios from "axios";
import { Button, Spinner } from "react-bootstrap";

class NoticeDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notice: {},
            loaded: false
        };
    }

    componentDidMount = () => {
        axios.get("/api/notice/" + this.props.match.params.id)
            .then(response => {
                let tempNotice = response.data;
                let d = new Date(tempNotice["added"]);
                tempNotice["added"] = d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
                this.setState({
                    notice: tempNotice,
                    loaded: true
                });
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
                    <Button onClick={this.props.history.goBack}>Back</Button>
                </div>
            )
        } else {
            return (
                <div>
                    <Spinner animation="border"/>
                </div>
            )
        }
    }
}

export default NoticeDetails;
