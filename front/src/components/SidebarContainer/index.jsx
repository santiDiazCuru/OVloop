import React from "react";
import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import { fetchListChannel } from "../../redux/actions/messageActions";

class SidebarContainer extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <Sidebar channels={this.props.channel}/>;
  }

  componentDidMount() {
    this.props.fetchListChannel();
  }
}

const mapStateToProps = function(state) {
  return {
    channel: state.messages.listChannel
  };
};
const mapDispatchToProps = function(dispatch) {
  return {
    fetchListChannel: () => dispatch(fetchListChannel())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarContainer);
