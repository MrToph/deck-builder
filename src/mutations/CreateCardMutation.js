import Relay from 'react-relay'

export default class CreateCardMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{createPokemon}`
  }

  // specifies the data that may have changed due to the mutation
  getFatQuery() {
    return Relay.QL`
        fragment on CreatePokemonPayload {
            pokemon,
            edge,
            viewer {
                allPokemons
            }
        }`
  }

  getOptimisticResponse() {
    return {
      edge: {
        node: {
          name: this.props.name,
          url: this.props.url,
        },
      },
      viewer: {
        id: this.props.viewerId,
      },
    }
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewerId,
      connectionName: 'allPokemons',
      edgeName: 'edge',
      rangeBehaviors: {
        '': 'append',
      },
    }]
  }

  // input to constructor
  getVariables() {
    return {
      name: this.props.name,
      url: this.props.url,
    }
  }
}
