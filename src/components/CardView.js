/* global componentHandler */
import React from 'react'
import classes from './CardView.scss'

export default class CardView extends React.Component {
  static propTypes = {
    addNew: React.PropTypes.bool,
    url: React.PropTypes.string,
    name: React.PropTypes.string,
    onNameChange: React.PropTypes.func,
    onUrlChange: React.PropTypes.func,
  }

  // Fix needed for using MDL in React: http://stackoverflow.com/questions/32918834/issue-while-rendering-mdl-text-field-with-react-js
  componentDidMount() {
    componentHandler.upgradeDom()
  }

  componentDidUpdate() {
    componentHandler.upgradeDom()
  }

  render() {
    return (
      <div className={classes.content}>
        <h4 style={{ textAlign: 'center' }}>{this.props.addNew ? 'Add new Card' : `Edit ${this.props.name}`}</h4>
        <div className={`mdl-textfield mdl-js-textfield mdl-textfield--floating-label ${classes.fullWidth}`}>
          <input className={'mdl-textfield__input'} type="text" id="name" pattern="[A-Z,a-z, ,0-9]*" value={this.props.name} onChange={e => this.props.onNameChange(e.target.value)} />
          <label className="mdl-textfield__label" htmlFor="name">Name...</label>
        </div>
        <div className={`mdl-textfield mdl-js-textfield mdl-textfield--floating-label ${classes.fullWidth}`}>
          <input className="mdl-textfield__input" type="text" id="imageUrl" value={this.props.url} onChange={e => this.props.onUrlChange(e.target.value)} />
          <label className="mdl-textfield__label" htmlFor="imageUrl">Image URL...</label>
        </div>
        <div className={classes.cardImageWrapper}>
          <img className={classes.cardImage} src={this.props.url} alt="Card" />
        </div>
      </div>
    )
  }
}
