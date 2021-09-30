import React from "react";
import Users from "./components/users";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import MainPage from "./components/mainPage";
import LoginPage from "./components/loginPage";
import UserPage from "./components/userPage";

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
