import React from 'react'

export default ({ title }) => (
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h2>{title}</h2>
        <div className="btn-toolbar mb-2 mb-md-0">
            <span>Seleccion Rango</span>
            <div id="reportrange" style={{background: "#fff", cursor: "pointer", padding: "5px 10px", border: "1px solid #ccc", width: "100%"}}>
                <i className="fa fa-calendar"></i>&nbsp;
    <span></span> <i className="fa fa-caret-down"></i>
            </div>
        </div>
    </div>
)