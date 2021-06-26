import React from 'react'
import { Link, Match } from "@reach/router";

export const NavLink = ({ to, exact, ...rest }) => (
    <Match path={`${to}/*`}>
        {({ location }) => {
            const isActive = exact
                ? location.pathname === to
                : location.pathname.includes(to);
            return <Link to={to} className={isActive ? "active" : ""} {...rest} />;
        }}
    </Match>
);

export const BaseLink = ({
    to,
    className,
    activeClass,
    inactiveClass,
    exact,
    ...rest
}) => (
    <Match path={`${to}/*`}>
        {({ location }) => {
            const isActive = exact
                ? location.pathname === to
                : location.pathname.includes(to);
            const allClass =
                className + (isActive ? ` ${activeClass}` : ` ${inactiveClass}`);
            return <Link to={to} className={allClass} {...rest} />;
        }}
    </Match>
);


const NavItem = ({ children, to, exact }) => {
    return (
        <li>
            <BaseLink
                to={to}
                activeClass="router-link-exact-active"
                exact={exact}
                className="nav__link flex items-center p-4 w-full h-full border-l-2 border-transparent hover:bg-blue-900 hover:bg-opacity-10 cursor-pointer"
            >
                {children}
            </BaseLink>
        </li>
    )

}

export default NavItem