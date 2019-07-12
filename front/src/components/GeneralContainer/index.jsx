import React from 'react'
import Template from '../Template'
import { connect } from 'react-redux';
import { fetchMessages } from '../../redux/actions/messageActions'


class GeneralContainer extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return <Template title={'General stats'} />
    }

    componentDidMount() {
        this.props.fetchMessages()
    }
}

const mapStateToProps = function (state) {
    return {
        messages: state.messages.list
    }
}
const mapDispatchToProps = function (dispatch) {
    return {
        fetchMessages: () => dispatch(fetchMessages())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GeneralContainer)
