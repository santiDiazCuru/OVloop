import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "../NavbarContainer";
import Sidebar from "../SidebarContainer";
import GeneralContainer from "../GeneralContainer";
import LoginContainer from "../LoginContainer";
import { validateSession } from "../../redux/actions/userActions"

import ChannelContainer from "../ChannelContainer";
import OriginContainer from "../OriginContainer";

class MainContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }
  componentWillMount() {
    this.setState({ loading: true })
    this.props.validateSession()
    setTimeout(() => { this.setState({ loading: false }) }, 500)
  }

  render() {
    if (this.state.loading) {
      return <div className='loader'></div>
    }
    else {
      if (this.props.isLoggedIn) {
        return (
          <div>
            <Navbar />
            <div className="container-fluid">
              <div className="row">
                <div className="col-2">
                  <Sidebar />
                </div>
                <div className="col-10">
                  <Switch>
                    <Route path="/general" component={GeneralContainer} />
                    <Route path="/channel/:channel" component={ChannelContainer} />
                    <Route path="/origin/:origin" component={OriginContainer} />
                    <Redirect from="/" to="/general" />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        );
      }
      else {

        return (
          <LoginContainer />
        )
      }
    }
  }
}

const mapStateToProps = function (state) {
  return {
    isLoggedIn: state.user.isLoggedIn
  }
}
const mapDispatchToProps = function (dispatch) {
  return {
    validateSession: () => dispatch(validateSession())
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);