import React from "react";
import { Link } from "react-router-dom";

export default ({ channels }) => (
  <nav className="col-md-2 d-none d-md-block bg-light sidebar">
    <div className="sidebar-sticky">
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link active" to="/general">
            General <span className="sr-only">(current)</span>
          </Link>
        </li>
        <Link className="nav-link" to="#" style={{ cursor: "default" }}>
          Channel
        </Link>
        {channels[0] &&
          channels.map(channel => {
            return (
              <li className="nav-item" key={channel}>
                <Link className="nav-link active" to={`/channel/${channel}`}>
                  {channel}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  </nav>
);
