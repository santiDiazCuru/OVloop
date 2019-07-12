import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { connect } from 'react-redux'
import { setDateTo, setDateFrom } from '../../redux/actions/dateActions'
import { fetchMessagesByDate } from '../../redux/actions/messageActions'
class DayPickerContainer extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleFrom = this.handleFrom.bind(this)
    this.handleTo = this.handleTo.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.fetchMessagesByDate(this.props.from, this.props.to)
  };

  handleFrom(day) {
    // console.log(day, this.props.to>day.toISOString())
    // this.props.setDateFrom(day.toISOString())
    if(this.props.to){
      if(day.toISOString()<this.props.to){
        this.props.setDateFrom(day.toISOString())
      }
      else{
        // alert ('No')
      }
    }
    else{
      this.props.setDateFrom(day.toISOString())
    }
    //day<this.props.to? this.props.setDateFrom(day.toISOString()) : alert ('No')
  };

  handleTo(day) {
    if(this.props.from){
      if(day.toISOString()>this.props.from){
        this.props.setDateTo(day.toISOString())
      }
      else{
        // alert ('No')
      }
    }
    else{
      this.props.setDateTo(day.toISOString())
    }
    // day>this.props.from? this.props.setDateTo(day.toISOString()) : alert('No')
  };

  render() {
    return (
      <div >
        <span className="mr-2">Filtrar por fecha:</span>
        <DayPickerInput onDayChange={day => this.handleFrom(day)} />
        &nbsp;
        &nbsp;
        <DayPickerInput onDayChange={day => this.handleTo(day)} />
        <button className="btn btn-sm btn-info ml-2" onClick={this.handleSubmit}>
          Filtrar
      </button>
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    from: state.date.from,
    to: state.date.to
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    setDateFrom: (day) => dispatch(setDateFrom(day)),
    setDateTo: (day) => dispatch(setDateTo(day)),
    fetchMessagesByDate: (from, to) => dispatch(fetchMessagesByDate(from, to))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DayPickerContainer)