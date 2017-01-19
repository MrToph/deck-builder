import React, { PropTypes } from 'react'
import Relay from 'react-relay'
import { Link } from 'react-router'
import errorImg from '../../assets/qm.jpg'
import classes from './CardPreview.scss'

class CardPreview extends React.Component {
  static propTypes = {
    card: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string,
    }),
  }

  onImageLoadError = (event) => {
    event.target.src = errorImg
  }

  render() {
    return (
      <Link className={classes.link} to={`/view/${this.props.card.id}`}>
        <div className={`${classes.card} mdl-card mdl-shadow--6dp`}>
          <img className={classes.previewImg} src={this.props.card.url || errorImg} alt="card" onError={this.onImageLoadError} />
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
