import React from 'react'
import Template from '../Template'



export default class SidebarContainer extends React.Component {
    constructor(){
        super();
        this.state = {}
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        console.log('hola, llegan los cambios')
        e.preventDefault()
        console.log(e.target.value)
    }

    render(){
       return <Template handleChange={this.handleChange} title={'General stats'}/>
    }
}