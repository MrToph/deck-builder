import React from 'react'
import Relay from 'react-relay'
import { Link } from 'react-router'
import CardView from '../components/CardView'
import CreateCardMutation from '../mutations/CreateCardMutation'
import DeleteCardMutation from '../mutations/DeleteCardMutation'
import UpdateCardMutation from '../mutations/UpdateCardMutation'
import classes from './CardPage.scss'

class CardPage extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object,
    params: React.PropTypes.object, // from react-router
    router: React.PropTypes.object,
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
      <div>
        <CardView
          addNew={this.isAddNew()}
          name={this.state.name}
          url={this.state.url}
          onNameChange={newName => this.setState({ name: newName })}
          onUrlChange={newUrl => this.setState({ url: newUrl })}
        />
        <div className={classes.buttonContainer}>
          <Link className="button cancelButton link" to={'/'}>
            <button className={`mdl-button mdl-js-button mdl-button--fab ${classes.button}`}>
              <i className="material-icons">arrow_back</i>
            </button>
          </Link>
          {!this.isAddNew() &&
            <button className={`mdl-button mdl-js-button mdl-button--fab ${classes.button}`} onClick={this.onDelete}>
              <i className="material-icons">delete</i>
            </button>
          }
          <button className={`mdl-button mdl-js-button mdl-button--fab ${classes.button}`} onClick={this.onSubmit}>
            <i className="material-icons">{this.isAddNew() ? 'add' : 'save'}</i>
          </button>
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
    prepareVariables: prevVariables => ({ ...prevVariables, idNotNull: typeof prevVariables.id === 'string' }),
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
