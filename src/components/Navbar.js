// rcep --start
import React from 'react';
import { Link } from "react-router-dom";

// impo
const Navbar = () => {
    const clickAnchor = (event) =>  {

        let arr = document.querySelectorAll("a.dropdown-item");
        for (let index = 0; index < 7; index++) {
            arr[index].classList.remove('active');
        }
        event.currentTarget.classList.add('active');
    }

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">verifiednews.com</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href='33' role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Category
                            </a>
                            <ul className="dropdown-menu">
                                <li> <Link className="dropdown-item" onClick={clickAnchor} to="/business">business</Link>           </li>
                                <li> <Link className="dropdown-item" onClick={clickAnchor} to="/entertainment">entertainment</Link> </li>
                                <li> <Link className="dropdown-item" onClick={clickAnchor} to="/general">general</Link>             </li>
                                <li> <Link className="dropdown-item" onClick={clickAnchor} to="/health">health</Link>               </li>
                                <li> <Link className="dropdown-item" onClick={clickAnchor} to="/science">science</Link>             </li>
                                <li> <Link className="dropdown-item" onClick={clickAnchor} to="/sports">sports</Link>               </li>
                                <li> <Link className="dropdown-item" onClick={clickAnchor} to="/technology">technology</Link>       </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );

}

export default Navbar

// rcep --end