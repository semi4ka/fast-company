import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import Users from "./layouts/users";
import Main from "./layouts/main";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProffesion";
import { QualityProvider } from "./hooks/useQuality";

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <ProfessionProvider>
                    <QualityProvider>
                        <Route
                            path="/users/:userId?/:edit?"
                            component={Users}
                        />
                        <Route path="/login/:type?" component={Login} />
                    </QualityProvider>
                </ProfessionProvider>
                <Route exact path="/" component={Main} />
                <Redirect to="/" />
            </Switch>
            <ToastContainer />
        </>
    );
};

export default App;
