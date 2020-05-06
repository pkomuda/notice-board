import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "./ListNotices.css";

class ListNotices extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notices: [],
            columns: [{
                dataField: "id",
                text: "ID",
                sort: true,
                hidden: true
            }, {
                dataField: "title",
                text: "Title",
                sort: true
            }, {
                dataField: "publisher",
                text: "Posted by",
                sort: true
            }, {
                dataField: "added",
                text: "Posted at",
                sort: true
            }, {
                dataField: "details",
                text: "Details",
                isDummyField: true,
                formatter: this.detailsButtonFormatter
            }]
        };
    }

    detailsButtonFormatter = (cell, row) => {
        const handleDetails = (id) => {
            this.props.history.push("/notice/" + id);
        };
        return <Button onClick={() => handleDetails(row["id"])}>Details</Button>;
    };

    componentDidMount = () => {
        axios.get("https://notice-board-wzas.herokuapp.com/api/notices")
            .then(response => {
                let tempNotices = response.data;
                for (let notice of tempNotices) {
                    let d = new Date(notice["added"]);
                    notice["added"] = d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2) + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
                }
                this.setState({
                    notices: tempNotices
                });
            })
            .catch(function (error) {
                console.log(error)
            });
    };

    handleAdd = () => {
        this.props.history.push("/addnotice");
    };

    renderTable = () => {
        const sizes = [{
            text: "10", value: 10
        }, {
            text: "25", value: 25
        }, {
            text: "50", value: 50
        }, {
            text: "100", value: 100
        }];
        return (
            <div>
                <Button style={{marginBottom: "1em"}} onClick={this.handleAdd}>Add notice</Button>
                <BootstrapTable keyField="id" data={this.state.notices} columns={this.state.columns} pagination={paginationFactory({sizePerPageList: sizes})} bootstrap4={true}/>
            </div>
        )
    };

    render() {
        return (
            <div>
                <h1>Notices</h1>
                {this.renderTable()}
                <Button onClick={this.props.history.goBack}>Back</Button>
            </div>
        )
    }
}

export default ListNotices;
