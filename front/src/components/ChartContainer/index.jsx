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
    this.state = {
      clicked: false,
      style: {
        data: { fill: "tomato" }
      }
    };
  }

  render() {
    return (
      <div className="row">
        <div className="col-6">
          <VictoryChart
            domainPadding={{ x: 50, y: [0, 20] }}
            scale={{ x: "linear" }}
          >
            <VictoryBar
              dataComponent={<Bar />}
              style={this.state.style}
              data={[
                { x: `Total: ${this.props.total.length}`, y: this.props.total.length },
                { x: `Total: ${this.props.success.length}`, y: this.props.success.length },
                { x: `Total: ${this.props.failed.length}`, y: this.props.failed.length }
              ]}
            />
          </VictoryChart>
        </div>
        <div className="col-6">
          <svg viewBox="0 0 400 400">
            <VictoryPie
              standalone={false}
              data={[{ x: `Success`, y: this.props.success.length }, { x: `Failed`, y: this.props.failed.length },]}
              innerRadius={50}
              labelRadius={100}
              style={{ labels: { fontSize: 15, fill: "white" } }}
            />
            <VictoryLabel
              textAnchor="middle"
              style={{ fontSize: 20 }}
              x={200}
              y={200}
              text={"Total: " + this.props.total.length}
            />
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
