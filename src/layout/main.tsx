import React from 'react'
import Drawer from '../components/drawer'
import MainSection from '../components/main-section'
import './layout.scss'

export default class Main extends React.Component {
  constructor(props:any) {
    super(props)
    this.state = { pathname: props.pathname }
  }

  render () {
    return (
      <div className='main'>
        <Drawer />
        <MainSection />
      </div>
    )
  }
}