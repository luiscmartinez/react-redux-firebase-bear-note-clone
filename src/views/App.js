import React, { Component, Fragment } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import NoteListContainer from './NoteListContainer'
import CreateNote from './CreateNote'

class App extends Component {
  render () {
    return (
      <Fragment>
        <Switch>
          <Route
            exact
            path='/'
            render={props => <NoteListContainer {...props} />}
          />
          <Route path='/create' render={props => <CreateNote {...props} />} />
        </Switch>
      </Fragment>
    )
  }
}

export default withRouter(App)
