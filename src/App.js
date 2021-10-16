import React from "react";
import Users from "./components/users";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import LoginPage from "./layouts/loginPage";
import UserPage from "./layouts/userPage";
import MainPage from "./layouts/mainPage";

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/users/:userId" component={UserPage} />
                <Route path="/users" component={Users} />
                <Route path="/login" component={LoginPage} />
                <Route exact path="/" component={MainPage} />
            </Switch>
        </>
    );
};

export default App;
