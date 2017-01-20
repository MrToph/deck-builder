import React from 'react'
import Relay from 'react-relay'
import CardPreview from '../components/CardPreview'
import AddNew from '../components/AddNew'
import DisplayStylePicker from '../components/DisplayStylePicker'
import CardTableItem from '../components/CardTableItem'
import classes from './ListPage.scss'

class ListPage extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object,
    relay: React.PropTypes.object,
  }

  state = {
    displayStyle: 'Cards',
  }

  _sortByName() {
    this.props.relay.setVariables({
      sortOrder: this.props.relay.variables.sortOrder === 'name_ASC' ? 'name_DESC' : 'name_ASC',
    })
  }

  OnDisplayStyleChanged = (displayStyle) => {
    this.setState({
      displayStyle,
    })
  }

  render() {
    const { displayStyle } = this.state
    const cards = this.props.viewer.allPokemons.edges.map(e => e.node)
    return (
      <div className={classes.content}>
        <DisplayStylePicker onChanged={this.OnDisplayStyleChanged} />
        {
          displayStyle === 'Cards' &&
          <div className={`${classes.horizontalContainer}`}>
            {
              cards.map(n => <CardPreview key={n.id} card={n} />)
            }
            <AddNew />
          </div>
        }
        {
          displayStyle === 'Table' &&
          <ul className={`mdl-list ${classes.noBotMargin}`}>
            {
              cards.map(n => <CardTableItem key={n.id} card={n} />)
            }
            <AddNew isListItem />
          </ul>
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
                ${CardTableItem.getFragment('card')}
                id
              }
            }
          }
        }
      `,
    },
  },
)
