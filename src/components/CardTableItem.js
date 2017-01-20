import React, { PropTypes } from 'react'
import Relay from 'react-relay'
import { Link } from 'react-router'
import classnames from 'classnames'
import qm from '../../assets/qm.jpg'
import classes from './CardTableItem.scss'

function CardTableItem({ card }) {
  return (
    <li className="mdl-list__item">
      <Link className={classes.noDecoration} to={`/view/${card.id}`}>
        <span className="mdl-list__item-primary-content">
          { card.url ?
            <div className={classnames(classes.bg, classes.imgSize)} style={{ backgroundImage: `url('${card.url}')` }} />
              :
            <div className={classnames(classes.bg, classes.imgSize)} style={{ backgroundImage: `url('${qm}')` }} />
          }
          { card.name }
        </span>
      </Link>
    </li>
  )
}

CardTableItem.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string,
  }).isRequired,
}

export default Relay.createContainer(
  CardTableItem,
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
