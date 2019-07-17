import React from "react";
import Login from "./Login";
import { connect } from "react-redux";
import {logInUser} from '../../redux/actions/userActions'


class LoginContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      usernameInput: '',
      passwordInput: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }


  handleSubmit(e){
    e.preventDefault()
    this.props.logInUser(this.state.usernameInput, this.state.passwordInput)
  }
  handleChange(e){
    e.preventDefault()
    e.target.name=='username'? this.setState({usernameInput: e.target.value}) : this.setState({passwordInput: e.target.value})
  }

  render() {
    return (
      <div>
          <Login handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    
  };
};
const mapDispatchToProps = function(dispatch) {
  return {
    logInUser: (user, password) => dispatch(logInUser(user, password))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);

