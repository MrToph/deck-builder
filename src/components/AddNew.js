import React from 'react'
import { Link } from 'react-router'
import add from 'material-design-icons/content/svg/production/ic_add_box_48px.svg'
import classesPreview from './CardPreview.scss'
import classes from './AddNew.scss'

console.log(classes)

export default class AddNew extends React.Component {
  static propTypes = {
  }
  render() {
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
}
