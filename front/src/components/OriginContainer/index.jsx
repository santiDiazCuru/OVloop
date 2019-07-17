import React from "react";
import { connect } from "react-redux";
import ChartContainer from "../ChartContainer";
import { fetchMessagesByOrigin } from "../../redux/actions/messageActions";
import Template from "../Template";
class GeneralContainer extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Template title={"Origin stats"} />
        <div>
          <ChartContainer />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.fetchMessagesByOrigin(this.props.match.params.origin);
  }
}

const mapStateToProps = function(state) {
  return {
    messages: state.messages.list
  };
};
const mapDispatchToProps = function(dispatch) {
  return {
    fetchMessagesByOrigin: origin => dispatch(fetchMessagesByOrigin(origin))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralContainer);
