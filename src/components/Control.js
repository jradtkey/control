import React, { PureComponent } from 'react';
import '../style/Control.css';
import Number from './Number'
import scrollTo from '../scrollTo'

class Control extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      minValue: 1,
      maxValue: 10,
      list: [],
      currentValue: 0,
      setValue: 1
    }


    //CREATE LIST OF NUMBERS
    for (var i = this.state.minValue; i <= this.state.maxValue; i++) {
      this.state.list.push(i)
    }
    this.decrease = this.decrease.bind(this)
    this.increase = this.increase.bind(this)

    this.scrollToSetValue = this.scrollToSetValue.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.makeChange = this.makeChange.bind(this);

    this.state.currentValue = this.state.minValue

  }


  //DECREASE BY ONE
  decrease(e) {

    if (this.state.currentValue !== this.state.minValue) {
      this.setState({
        currentValue: this.state.currentValue -= 1
      })
    }
    const { controlViewport } = this.refs
    var widthOfNumber = 100
    var newPosition = controlViewport.scrollLeft - widthOfNumber
    var timeToMoveOneNumber = this.state.maxValue
    var totalTimeToMove = timeToMoveOneNumber*(this.state.list.length+1)
    var listLength = this.state.list.length
    // controlViewport.scrollLeft = newPosition


    //SEE ../scrollTo.js
    scrollTo({element: controlViewport, to: newPosition, duration: totalTimeToMove, scrollDirection: 'scrollLeft', listLength: listLength})
  }

  //INCREASE BY ONE
  increase(e) {

    document.getElementById("right").disabled = true;
    setTimeout(function(){document.getElementById("right").disabled = false;},1000)

    if (this.state.currentValue !== this.state.maxValue) {
      this.setState({
        currentValue: this.state.currentValue += 1
      })
    }

    const { controlViewport } = this.refs
    var widthOfNumber = 100
    var newPosition = controlViewport.scrollLeft + widthOfNumber
    var timeToMoveOneNumber = this.state.maxValue
    var totalTimeToMove = timeToMoveOneNumber*(this.state.list.length+1)
    var listLength = this.state.maxValue

    //SEE ../scrollTo.js
    scrollTo({element: controlViewport, to: newPosition, duration: totalTimeToMove, scrollDirection: 'scrollLeft', listLength: listLength})
  }


  //GENERATES A DIV OF RANGE
  createNumList(number) {
    return <Number number={number} key={number}/>;
  }

  createNumbers(numbers) {
    return numbers.map(this.createNumList);
  }


  //ON KEYDOWN
  handleChange(event) {
    // this.setState({setValue: this.state.setValue += event.target.value});
    // console.log(this.state.setValue);
    this.makeChange(event.target.value)
  }

  //SET STATE OF CHOSEN VALUE
  makeChange(num) {
    if(num > this.state.maxValue) {
      this.setState({
        setValue: this.state.setValue -= this.state.setValue
      })
      this.setState({
        setValue: this.state.setValue += this.state.currentValue
      })
    }
    else if (num < this.state.minValue) {
      this.setState({
        setValue: this.state.setValue -= this.state.setValue
      })
      this.setState({
        setValue: this.state.setValue += this.state.currentValue
      })
    }
    else {
      this.setState({
        setValue: this.state.setValue -= this.state.setValue
      })
      this.setState({
        setValue: this.state.setValue += num
      })
    }
  }


  //BASED ON CHOSEN VALUE, SCROLL TO VALUE
  scrollToSetValue(e) {

    const { controlViewport } = this.refs
    var widthOfNumber;
    var newPosition;
    var timeToMoveOneNumber;
    var totalTimeToMove;
    var listLength = this.state.maxValue

    if (this.state.currentValue <= this.state.setValue) {
      var difference = this.state.setValue - this.state.currentValue
      this.setState({
        currentValue: this.state.currentValue += difference
      })
      widthOfNumber = difference * 100
      newPosition = controlViewport.scrollLeft + widthOfNumber
      timeToMoveOneNumber = this.state.maxValue
      totalTimeToMove = timeToMoveOneNumber*(this.state.list.length+1)
      scrollTo({element: controlViewport, to: newPosition, duration: totalTimeToMove, scrollDirection: 'scrollLeft', listLength: listLength})
    }

    else if (this.state.currentValue >= this.state.setValue) {
      var change = this.state.currentValue-this.state.setValue
      this.setState({
        currentValue: this.state.currentValue -= change
      })
      widthOfNumber = change * 100
      newPosition = controlViewport.scrollLeft - widthOfNumber
      timeToMoveOneNumber = this.state.maxValue
      totalTimeToMove = timeToMoveOneNumber*(this.state.list.length+1)
      scrollTo({element: controlViewport, to: newPosition, duration: totalTimeToMove, scrollDirection: 'scrollLeft', listLength: listLength})
    }

  }


  render() {

    return (
      <div>
        <div className="control-container">

          <button
            className="control-nav control-left-nav"
            onClick={this.decrease}
          >&#60;</button>

          <div className="control-viewport text-center" ref="controlViewport">
            {this.createNumbers(this.state.list)}
          </div>

          <button
            className="control-nav control-right-nav"
            onClick={this.increase}
            id="right"
          >&#62;</button>

        </div>
        <div className="control-range">
          <p>Range: {this.state.minValue} - {this.state.maxValue}</p>
        </div>
        <div className="control-form">
          <input className="valueInput" type="text" href="/" onChange={this.handleChange} value={this.state.setState} />
          <button onClick={this.scrollToSetValue} id="button">Go</button>

        </div>

      </div>
    )
  }
}

export default Control;
