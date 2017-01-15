import React from 'react'
import { Link } from 'react-router'
import './AddNew.scss'

export default class AddNew extends React.Component {
  static propTypes = {
  }
  render() {
    return (
      <Link className="addNew" to="/create">
      Add new Pokemon
      </Link>
    )
  }
}
