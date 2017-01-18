import React from 'react'
import Relay from 'react-relay'
import useRelay from 'react-router-relay'
import { Router, Route, browserHistory, applyRouterMiddleware } from 'react-router'
import Logo from './components/Logo'
import ListPage from './views/ListPage'
import CardPage from './views/CardPage'
import classes from './App.scss'

const ViewerQueries = { viewer: (Component, vars) => Relay.QL`
  query {
    viewer {
      ${Component.getFragment('viewer', vars)}
    }
  }
  `,
}

export default class App extends React.Component {
  render() {
    return (
      <div className={`${classes.root}`}>
        <Logo />
        <Router
          forceFetch
          environment={Relay.Store}
          render={applyRouterMiddleware(useRelay)}
          history={browserHistory}
        >
          <Route path="/" component={ListPage} queries={ViewerQueries} />
          <Route path="/create" component={CardPage} queries={ViewerQueries} />
          <Route path="/view/:id" component={CardPage} queries={ViewerQueries} />
        </Router>
      </div>
    )
  }
}
