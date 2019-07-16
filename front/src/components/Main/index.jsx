import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "../NavbarContainer";
import Sidebar from "../SidebarContainer";
import GeneralContainer from "../GeneralContainer";
import ChannelContainer from "../ChannelContainer";
import OriginContainer from "../OriginContainer";

export default class MainContainer extends React.Component {
  render() {
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
}

// mapStateToProps = function(state){
//     return {

//     }
// }
// mapDispatchToProps = function(dispatch){
//     return {

//     }
// }
