import React from "react";
import { connect } from "react-redux";
import {
  VictoryChart,
  VictoryBar,
  Bar,
  VictoryPie,
  VictoryLabel
} from "victory";

class ChartContainer extends React.Component {
  constructor() {
    super();
  }

  render() {
    var successPercent = Math.round(
      (this.props.success.length * 100) / this.props.total.length
    );
    var failedPercent = Math.round(
      (this.props.failed.length * 100) / this.props.total.length
    );
    return (
      <div className="row">
        <div className="col-6">
          <VictoryChart
            // domainPadding={{ x: 50, y: [0, 20] }}
            domainPadding={25}
            alignment="start"
            scale={{ x: "linear" }}
          >
            <VictoryBar
              dataComponent={<Bar />}
              categories={{ x: ["Total", "Success", "Failed"] }}
              // style={{data: { fill: "" }}}
              style={{
                data: {
                  fill: d => d.fill,
                  opacity: d => d.opacity
                }
              }}
              data={[
                {
                  x: `Total`,
                  y: this.props.total.length,
                  label: this.props.total.length
                },
                {
                  x: `Success`,
                  y: this.props.success.length,
                  label: this.props.success.length
                },
                {
                  x: `Failed`,
                  y: this.props.failed.length,
                  label: this.props.failed.length,
                  fill: "tomato"
                }
              ]}
            />
          </VictoryChart>
        </div>
        {/* //////////////// */}
        {/* //////////////// */}
        <div className="col-6">
          <svg viewBox="0 0 400 400">
            <VictoryPie
              standalone={false}
              data={[
                {
                  x: `Success: ${successPercent}%`,
                  y: this.props.success.length
                },
                { x: `Failed: ${failedPercent}%`, y: this.props.failed.length }
              ]}
              // innerRadius={50}
              labelRadius={90}
              style={{ labels: { fontSize: 13, fill: "white" } }}
            />
            {/* <VictoryLabel
              textAnchor="middle"
              style={{ fontSize: 20, fill: "white" }}
              x={200}
              y={200}
              // text={"Total: " + this.props.total.length}
            /> */}
          </svg>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    success: state.messages.success,
    failed: state.messages.failed,
    total: state.messages.list
  };
};
const mapDispatchToProps = function(dispatch) {
  return {
    setDateFrom: day => dispatch(setDateFrom(day)),
    setDateTo: day => dispatch(setDateTo(day))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartContainer);
