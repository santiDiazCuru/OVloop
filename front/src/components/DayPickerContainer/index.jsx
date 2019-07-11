import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {connect} from 'react-redux'
import {setDateTo, setDateFrom} from '../../redux/actions/dateActions'

class DayPickerContainer extends React.Component {
  constructor(props){
    super(props)

    this.handleFrom= this.handleFrom.bind(this)
    this.handleTo= this.handleTo.bind(this)

  }

  handleFrom(day){
    console.log(day)
    this.props.setDateFrom(day)
  }
  handleTo(day){
    console.log(day)
    this.props.setDateTo(day)
  }

  render() {
    return (
      <div >
        <span className="mr-2">Filtrar por fecha:</span>
        <DayPickerInput onDayChange={day => this.handleFrom(day)} />
        &nbsp;
        &nbsp;
        <DayPickerInput onDayChange={day => this.handleTo(day)} />
        <button className="btn btn-sm btn-info ml-2">
          Filtrar
      </button>
      </div>
    );
  }
}

// mapStateToProps = function(state){
//     return {

//     }
// }
const mapDispatchToProps = function(dispatch){
    return {
      setDateFrom: (day) => dispatch(setDateFrom(day)),
      setDateTo: (day) => dispatch(setDateTo(day)),
    }
}
export default connect(null, mapDispatchToProps)(DayPickerContainer)