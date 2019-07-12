import React from "react";
import Template from "../Template";
import { connect } from "react-redux";
import { fetchMessages } from "../../redux/actions/messageActions";
import ChartContainer from "../ChartContainer";

class GeneralContainer extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Template title={"General stats"} />
        <div>
          <ChartContainer />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.fetchMessages();
  }
}

const mapStateToProps = function(state) {
  return {
    messages: state.messages.list
  };
};
const mapDispatchToProps = function(dispatch) {
  return {
    fetchMessages: () => dispatch(fetchMessages())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralContainer);
