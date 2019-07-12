import React from "react";
import ChartContainer from "../ChartContainer";
import Template from "../Template";
import { connect } from "react-redux";
import { fetchMessages } from "../../redux/actions/messageActions";


class GeneralContainer extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Template title={"Channel stats"} />
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
