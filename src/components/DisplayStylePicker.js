import React, { PropTypes } from 'react'
import classnames from 'classnames'
import classes from './DisplayStylePicker.scss'


export default class DisplayStylePicker extends React.Component {
  static propTypes = {
    onChanged: PropTypes.func.isRequired,
  }
  state = {
    active: 'Cards',
  }

  handleClick = (event) => {
    this.setState({
      active: event.target.name,
    })
    this.props.onChanged(event.target.name)
  }

  render() {
    return (
      <div className={classes.container}>
        <button onClick={this.handleClick} name="Cards" className={classnames('mdl-button mdl-js-button mdl-button--raised', { 'mdl-button--colored': this.state.active === 'Cards' })}>Cards</button>
        <button onClick={this.handleClick} name="Table" className={classnames('mdl-button mdl-js-button mdl-button--raised', { 'mdl-button--colored': this.state.active === 'Table' })}>Table</button>
      </div>
    )
  }
}
