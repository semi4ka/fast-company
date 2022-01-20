import React from "react";
import { useAuth } from "../../hooks/useAuth";
import NavProfile from "./navProfile";

const NavBar = () => {
    const { currentUser } = useAuth();

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
                    {currentUser && (
                        <li className="nav-item">
                            <a className="nav-link" href="/users">
                                Users
                            </a>
                        </li>
                    )}
                </ul>
                <div className="d-flex">
                    {currentUser ? (
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
