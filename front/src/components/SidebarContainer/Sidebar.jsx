import React from "react";
import { Link } from "react-router-dom";

export default ({
  channels,
  origins,
  handleChannelSearch,
  handleOriginSearch
}) => (
  <nav className="col-md-2 d-none d-md-block bg-light sidebar">
    <div className="sidebar-sticky">
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link active" to="/" style={{ color: "#3b3d40" }}>
            General
          </Link>
        </li>
        <li className="nav-item nav-link" style={{ color: "#3b3d40" }}>
          Channel
        </li>
        {channels.map(channel => (
          <li className="nav-item" key={channel}>
            <Link
              className="nav-link active ml-4"
              to={`/channel/${channel}`}
              style={{ color: "#AAA" }}
              onClick={() => handleChannelSearch(channel)}
            >
              {channel}
            </Link>
          </li>
        ))}
        <li className="nav-item nav-link" style={{ color: "#3b3d40" }}>
          Origin
        </li>
        {origins.map(origin => (
          <li className="nav-item" key={origin.origin}>
            <Link
              className="nav-link active ml-4"
              to={`/origin/${origin.origin}`}
              style={{ color: "#AAA" }}
              onClick={() => handleOriginSearch(origin.origin)}
            >
              {origin.origin}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </nav>
);
