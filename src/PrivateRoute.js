import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.getItem('PokerToken')) {
          return <Component {...props} />
        } else {
          return <Redirect to='/Login' />
        }
      }}
    />
  )
}