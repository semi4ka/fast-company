import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import Users from "./layouts/users";
import Main from "./layouts/main";

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/users/:userId?" component={Users} />
                <Route path="/login/:type?" component={Login} />
                <Route exact path="/" component={Main} />
                <Redirect to="/" />
            </Switch>
        </>
    );
};

export default App;
