import React from "react";
import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import {
  fetchChannelsList,
  fetchOriginList,
  fetchMessagesByChannel,
  fetchMessagesByOrigin
} from "../../redux/actions/messageActions";

class SidebarContainer extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.handleChannelSearch = this.handleChannelSearch.bind(this);
    this.handleOriginSearch = this.handleOriginSearch.bind(this);
  }

  handleChannelSearch(channel) {
    this.props.fetchMessagesByChannel(channel);
  }

  handleOriginSearch(origin) {
    this.props.fetchMessagesByOrigin(origin);
  }

  render() {
    return (
      <Sidebar
        channels={this.props.channels}
        origins={this.props.origins}
        handleChannelSearch={this.handleChannelSearch}
        handleOriginSearch={this.handleOriginSearch}
      />
    );
  }
  componentDidMount() {
    this.props.fetchChannelsList();
    this.props.fetchOriginList();
  }
}

const mapStateToProps = function(state) {
  return {
    channels: state.messages.channels,
    origins: state.messages.origins
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    fetchChannelsList: () => dispatch(fetchChannelsList()),
    fetchOriginList: () => dispatch(fetchOriginList()),
    fetchMessagesByChannel: channel =>
      dispatch(fetchMessagesByChannel(channel)),
    fetchMessagesByOrigin: channel => dispatch(fetchMessagesByOrigin(channel))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarContainer);
