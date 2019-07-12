import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link className="nav-link active" href="#">
                        General <span className="sr-only">(current)</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" href="#">
                        Canal
                    </Link>
                </li>
            </ul>
        </div>
    </nav>
)