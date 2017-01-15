import React from 'react'
import Relay from 'react-relay'
import { Link } from 'react-router'
import CardView from '../components/CardView'
import styles from './CardPage.scss'

class CardPage extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object,
    params: React.PropTypes.object, // from react-router
  }

  constructor(props) {
    super(props)
    console.log('CardPage.props.params.id', props.params)
    this.state = {
      name: this.isAddNew() ? '' : this.props.viewer.Pokemon.name,
      url: this.isAddNew() ? '' : this.props.viewer.Pokemon.url,
    }
  }

  onSubmit = () => {

  }

  isAddNew = () => typeof this.props.params.id !== 'string'

  render() {
    return (
      <div className={styles.root}>
        <div className="content">
          <CardView
            addNew={this.isAddNew()}
            name={this.state.name}
            url={this.state.url}
            onNameChange={newName => this.setState({ name: newName })}
            onUrlChange={newUrl => this.setState({ url: newUrl })}
          />
          <div className="buttonContainer">
            <div>
              {!this.isAddNew() &&
                <img
                  src="https://raw.githubusercontent.com/learnrelay/pokedex/master/branch-step-04-solution/src/assets/delete.svg"
                  className="deleteIcon"
                  alt="Delete"
                />
              }
            </div>
            <div className="actionButtonContainer">
              <Link className="button cancelButton link" to={'/'}>
                Cancel
              </Link>
              <button className="button saveButton" onClick={this.onSubmit}>
                {this.isAddNew() ? 'Add' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Relay.createContainer(
  CardPage,
  {
    initialVariables: {
      id: null,
      idNotNull: false,
    },
    prepareVariables: prevVariables => {
      console.log(prevVariables)
      return { ...prevVariables, idNotNull: typeof prevVariables.id === 'string' }
    },
    fragments: {
      viewer: () => Relay.QL`
        fragment on Viewer {
          id
            Pokemon(id: $id) @include( if: $idNotNull ) {
              id
              name
              url
          }
        }
      `,
    },
  },
)
