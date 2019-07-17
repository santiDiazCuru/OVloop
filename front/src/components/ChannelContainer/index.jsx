import React from "react";
import { connect } from "react-redux";
import ChartContainer from "../ChartContainer";
import { fetchMessagesByChannel } from "../../redux/actions/messageActions";
import Template from "../Template";
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
    this.props.fetchMessagesByChannel(this.props.match.params.channel);
  }
}

const mapStateToProps = function(state) {
  return {
    messages: state.messages.list
  };
};
const mapDispatchToProps = function(dispatch) {
  return {
    fetchMessagesByChannel: channel => dispatch(fetchMessagesByChannel(channel))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralContainer);
