import React from "react";
import { Redirect } from "@reach/router";
import storage from '../store/local'
import { useLocation } from '@reach/router'


export const Route = ({ page: Component, path, guest = false, auth = false, ...rest }) => {
    const location = useLocation()
    const BaseRoute = (props) => {
        if (auth && !storage.guard) {
            const redirect = `/login?redirect=${location.pathname}`
            return <Redirect to={redirect} from={location.pathname} noThrow />;
        }
        if (guest && storage.guard)
            return <Redirect to="/" from={props.location} noThrow />;
        return <Component path={path} {...props}  {...rest} />;
    };
    return <BaseRoute />;
};

export const NestedRoute = (props) => {
    return <>{props.children}</>;
};