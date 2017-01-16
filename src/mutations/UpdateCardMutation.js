import Relay from 'react-relay'

export default class UpdateCardMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation{updatePokemon}`
  }

  // specifies the data that may have changed due to the mutation
  getFatQuery() {
    return Relay.QL`
    fragment on UpdatePokemonPayload {
      viewer
      pokemon
    }
    `
  }

  getOptimisticResponse() {
    return {
      model: {
        id: this.props.pokemonId,
        name: this.props.name,
        url: this.props.url,
      },
    }
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        pokemon: this.props.pokemonId,
      },
    }]
  }

  // input to constructor
  getVariables() {
    return {
      id: this.props.pokemonId,
      name: this.props.name,
      url: this.props.url,
    }
  }
}
