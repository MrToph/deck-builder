import Relay from 'react-relay'

export default class DeleteCardMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{deletePokemon}`
  }

  // specifies the data that may have changed due to the mutation
  getFatQuery() {
    return Relay.QL`
        fragment on DeletePokemonPayload {
            viewer
            deletedId
        }`
  }

  getOptimisticResponse() {
    return {
      deletedId: this.props.pokemonId,
    }
  }

  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewerId,
      connectionName: 'pokemon',
      deletedIDFieldName: 'deletedId',
    }]
  }

  // input to constructor
  getVariables() {
    return {
      id: this.props.pokemonId,
    }
  }
}
