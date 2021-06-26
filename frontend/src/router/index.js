import React from "react";
import { Router } from "@reach/router";
import { Route, NestedRoute } from "./base";


import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotFound from '../pages/404'


const RootRouter = () => {
    return (
        <Router>
            <Route default page={NotFound} />
            <Route path="/" page={Home} auth />
            <Route path="/login" page={Login} guest />
            <Route path="/register" page={Register} />
            {/* <NestedRoute path="/users">
                <Route path="/" page={ListUserPage} auth />
                <Route path="/create" page={CreateUserPage} auth />
                <Route path=":userId" page={ShowUserPage} auth />
            </NestedRoute> */}
        </Router >
    );
};

export default RootRouter