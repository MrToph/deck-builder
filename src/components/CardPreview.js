import React from 'react'
import Relay from 'react-relay'
import { Link } from 'react-router'
import classes from './CardPreview.scss'

class CardPreview extends React.Component {
  static propTypes = {
    card: React.PropTypes.object,
  }
  render() {
    return (
      <Link className={classes.link} to={`/view/${this.props.card.id}`}>
        <div className={`${classes.card} mdl-card mdl-shadow--6dp`}>
          <img className={classes.previewImg} src={this.props.card.url} alt="card" />
          <div className={`mdl-card__title ${classes.stickToBottom}`}>
            <h2 className="mdl-card__title-text">{this.props.card.name}</h2>
          </div>
        </div>
      </Link>
    )
  }
}


export default Relay.createContainer(
  CardPreview,
  {
    fragments: {
      card: () => Relay.QL`
        fragment on Pokemon {
          id
          name
          url
        }
      `,
    },
  },
)
