import React from "react";
import {Button} from "react-bootstrap";

class Home extends React.Component {

    render() {
        return (
            <div>
                <h1>Welcome</h1>
                <p>This is a progressive web application created by:</p>
                <p>Jakub Bogdan 216728</p>
                <p>Szymon Gruda 216773</p>
                <p>Przemysław Komuda 216802</p>
                <p>Krystian Kowalski 216808</p>
                <p>Gabriel Nowak 216848</p>
                <p>Szymon Rutkowski 216881</p>
                <Button onClick={() => this.props.history.push("/notices")}>Notices</Button>
            </div>
        )
    }
}

export default Home;
