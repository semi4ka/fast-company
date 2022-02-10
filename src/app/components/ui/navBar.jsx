import React from "react";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/users";
import NavProfile from "./navProfile";

const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());

    return (
        <nav className="navbar bg-light mb-3">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <a
                            className="nav-link active"
                            aria-current="page"
                            href="/"
                        >
                            Main
                        </a>
                    </li>
                    {isLoggedIn && (
                        <li className="nav-item">
                            <a className="nav-link" href="/users">
                                Users
                            </a>
                        </li>
                    )}
                </ul>
                <div className="d-flex">
                    {isLoggedIn ? (
                        <NavProfile />
                    ) : (
                        <a className="nav-link" href="/login">
                            Login
                        </a>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
