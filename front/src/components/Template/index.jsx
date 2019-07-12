import React from "react";
import DayPickerContainer from "../DayPickerContainer";
import ChartContainer from "../ChartContainer";

export default ({ title }) => (
  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h2>{title}</h2>
    <div className="btn-toolbar mb-2 mb-md-0">
      <DayPickerContainer />
      <ChartContainer />
    </div>
  </div>
);
