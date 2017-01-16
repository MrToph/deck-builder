import React from 'react'
import Relay from 'react-relay'
import { Link } from 'react-router'
import CardView from '../components/CardView'
import CreateCardMutation from '../mutations/CreateCardMutation'
import DeleteCardMutation from '../mutations/DeleteCardMutation'
import UpdateCardMutation from '../mutations/UpdateCardMutation'
import styles from './CardPage.scss'

class CardPage extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object,
    params: React.PropTypes.object, // from react-router
  }

  constructor(props) {
    super(props)
    this.state = {
      name: this.isAddNew() ? '' : this.props.viewer.Pokemon.name,
      url: this.isAddNew() ? '' : this.props.viewer.Pokemon.url,
    }
  }

  onSubmit = () => {
    if (this.isAddNew()) this.addCard()
    else this.updateCard()
  }

  onDelete = () => {
    Relay.Store.commitUpdate(
      new DeleteCardMutation({
        pokemonId: this.props.params.id,
        viewerId: this.props.viewer.id,
      }), {
        onSuccess: () => {
          console.log('onDeleteCardMutationSuccess:', this.props.router)
          this.props.router.push('/')
        },
        onFailure: transaction => console.log(transaction),
      },
    )
  }

  addCard = () => {
    Relay.Store.commitUpdate(
      new CreateCardMutation({
        name: this.state.name,
        url: this.state.url,
        viewerId: this.props.viewer.id,
      }), {
        onSuccess: () => {
          console.log('onCreateCardMutationSuccess:', this.props.router)
          this.props.router.push('/')
        },
        onFailure: transaction => console.log(transaction),
      },
    )
  }

  updateCard = () => {
    Relay.Store.commitUpdate(
      new UpdateCardMutation({
        name: this.state.name,
        url: this.state.url,
        pokemonId: this.props.params.id,
      }), {
        onSuccess: () => {
          console.log('onUpdateCardMutationSuccess:', this.props.router)
          this.props.router.push('/')
        },
        onFailure: transaction => console.log(transaction),
      },
    )
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
                  onClick={this.onDelete}
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
    prepareVariables: (prevVariables) => {
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
