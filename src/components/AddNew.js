import React from 'react'
import { Link } from 'react-router'
import classesPreview from './CardPreview.scss'
import classesTableItem from './CardTableItem.scss'
import classes from './AddNew.scss'


export default function AddNew({ isListItem }) {
  if (!isListItem) {
    return (
      <Link className={classesPreview.link} to="/create">
        <div className={`${classesPreview.card} mdl-card mdl-shadow--6dp`}>
          <div className={`${classesPreview.previewImg} ${classes.centerContainer}`}>
            <i className={`material-icons ${classes.md70} ${classes.mdSvgLight}`}>add_box</i>
          </div>
          <div className={`mdl-card__title ${classesPreview.stickToBottom}`}>
            <h2 className="mdl-card__title-text">New Card</h2>
          </div>
        </div>
      </Link>
    )
  }
  return (
    <Link className={classesPreview.link} to="/create">
      <li className="mdl-list__item">
        <span className="mdl-list__item-primary-content">
          <span className={`${classesTableItem.imgSize} ${classes.centerContainer}`}>
            <i className={'material-icons mdl-list__item-icon}'}>add_box</i>
          </span>
          New Card
        </span>
      </li>
    </Link>
  )
}

AddNew.propTypes = {
  isListItem: React.PropTypes.bool,
}
