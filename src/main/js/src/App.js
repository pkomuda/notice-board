import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./components/Home";
import ListNotices from "./components/ListNotices";
import NoticeDetails from "./components/NoticeDetails";
import AddNotice from "./components/AddNotice";
import NotFound from "./components/NotFound";

class App extends React.Component {

    render() {
        return (
            <Router>
                <Container>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/notices" component={ListNotices}/>
                        <Route path="/notice/:id" component={NoticeDetails}/>
                        <Route path="/addnotice" component={AddNotice}/>
                        <Route component={NotFound}/>
                    </Switch>
                </Container>
            </Router>
        );
    }
}

export default App;
