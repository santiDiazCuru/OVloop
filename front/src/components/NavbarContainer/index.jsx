import React from 'react'
import Navbar from './Navbar'
import {endSession} from '../../redux/actions/userActions'
import { connect } from "react-redux";

class NavbarContainer extends React.Component {
    constructor(){
        super();
        this.state = {}
        this.logOut = this.logOut.bind(this)
    }
    logOut(e){
        e.preventDefault()
        this.props.endSession()
        .then(()=>window.location.reload())
    }

    render(){
       return <Navbar logOut={this.logOut}/>
    }
}

const mapDispatchToProps = function(dispatch){
    return {
      endSession: () => dispatch(endSession())
    }
}
export default connect(
  null,
  mapDispatchToProps
)(NavbarContainer);