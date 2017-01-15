import React from 'react'
import Relay from 'react-relay'
import CardPreview from '../components/CardPreview'
import './ListPage.scss'

class ListPage extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object,
    allCards: React.PropTypes.object,
    relay: React.PropTypes.object,
  }

  _sortByName() {
    this.props.relay.setVariables({
      sortOrder: this.props.relay.variables.sortOrder === 'name_ASC' ? 'name_DESC' : 'name_ASC',
    })
  }

  render() {
    return (
      <div className="root">
        {`Your viewer id is: ${this.props.viewer.id}`}
        {
          this.props.viewer.allPokemons.edges.map(e => e.node).map(n => <CardPreview key={n.id} card={n} />)
      }
      </div>
    )
  }
}

export default Relay.createContainer(
  ListPage,
  {
    initialVariables: {
      sortOrder: 'id_DESC',
    },
    fragments: {
        // viewer will be exposed to the inner component ListPage as a prop
      viewer: () => Relay.QL`
        fragment on Viewer {
            id
          allPokemons (first: 1000, orderBy: $sortOrder) {
            edges {
              node {
                ${CardPreview.getFragment('card')}
                id
              }
            }
          }
        }
      `,
    },
  },
)
