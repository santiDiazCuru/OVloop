import React from "react";
import Template from "../Template";
import { connect } from "react-redux";

class GeneralContainer extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return <Template title={"General stats"} />;
  }

  componentDidMount() {
    console.log("aa");
  }
}

const mapStateToProps = function(state) {
  return {};
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
)(GeneralContainer);
