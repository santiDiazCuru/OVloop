import React from "react";
import DayPickerContainer from "../DayPickerContainer";

export default ({ title }) => (
  <div className="d-flex  flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h2 className="mr-5" >{title}</h2>
    <div className="btn-toolbar mb-2 mb-md-0">
      <DayPickerContainer />
    </div>
  </div>
);
