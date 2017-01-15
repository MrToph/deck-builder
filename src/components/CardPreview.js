import React from 'react'
import Relay from 'react-relay'
import { Link } from 'react-router'
import './CardPreview.scss'

class CardPreview extends React.Component {
  static propTypes = {
    card: React.PropTypes.object,
  }
  render() {
    return (
      <Link className="link" to={`/view/${this.props.card.id}`}>
        <div className="previewPage">
          <img className="previewImg" src={this.props.card.url} alt="card" />
          <div className="previewName">
            {this.props.card.name}
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
