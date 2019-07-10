import React from 'react'
import Template from '../Template'



export default class SidebarContainer extends React.Component {
    constructor(){
        super();
        this.state = {}
    }

    render(){
       return <Template title={'General stats'}/>
    }
}