import React from 'react'
import './App.css'
import Shuffler from './Shuffle'
import SetUp from './SetUp'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import Deal from './Deal'


function App(props) {
  console.log(props)
  return(
  <>
    <Route exact path='/' component={SetUp} />
    <Route path='/' component={Shuffler} />
    {/* <Route path='/' component={Deal} /> */}
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
