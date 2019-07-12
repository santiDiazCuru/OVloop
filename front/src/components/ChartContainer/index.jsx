import React from "react";
import { connect } from "react-redux";
import { VictoryChart, VictoryBar, Bar } from "victory";

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
      <div>
        <VictoryChart
          height={400}
          width={400}
          domainPadding={{ x: 50, y: [0, 20] }}
          scale={{ x: "linear" }}
        >
          <VictoryBar
            dataComponent={<Bar />}
            style={this.state.style}
            data={[
              { x: "Sent:", y: this.props.sent.length },
              { x: "Failed:", y: this.props.failed.length }
            ]}
          />
        </VictoryChart>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    sent: state.messages.sent,
    failed: state.messages.failed
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
