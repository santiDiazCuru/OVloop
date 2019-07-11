import React from 'react'

export default () => (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
            <ul className="nav flex-column">
                <li className="nav-item">
                    <a className="nav-link active" href="#">
                        <span data-feather="home"></span>
                        Dashboard <span className="sr-only">(current)</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <span data-feather="file"></span>
                        Orders
          </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <span data-feather="shopping-cart"></span>
                        Products
          </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <span data-feather="users"></span>
                        Customers
          </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <span data-feather="bar-chart-2"></span>
                        Reports
          </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <span data-feather="layers"></span>
                        Integrations
          </a>
                </li>
            </ul>
        </div>
    </nav>
)