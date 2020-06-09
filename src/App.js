import React from 'react'
import './App.css'
import Shuffler from './Shuffle'
import SetUp from './SetUp'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import Home from './home'
import Register from './register'
import Login from './login'
import NavBar from './Nav'
import Profile from './profiles/profile'

function App(props) {
  console.log(props)
  return(
  <>
    <NavBar />
    <Route exact path = '/' component ={Home} />
    <Route exact path = '/profile/:id' component={Profile} />
    <Route exact path = '/Register' component ={Register} />
    <Route exact path = '/Login' component ={Login} />
    <Route exact path='/play' component={SetUp} />
  </>
  )
}

function mapStateToProps(state) {
  return {
    complete: state.setup,
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(App)
