import React, {Component} from 'react'
import './Cell.css'


class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
        displayed: this.props.word
    }
    this.handleClick = this.handleClick.bind(this)
   
  }
  

  handleClick() {
   this.setState({displayed: this.props.roll})
  }

  render() {
    //this.setState({displayed: this.props.word})
    return (
        <td 
          className='Cell Cell-lit' 
          onClick={this.handleClick}
        >
          {this.state.displayed}
        </td>
    )
  }
}


export default Cell