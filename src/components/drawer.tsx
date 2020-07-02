import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { List, ListItem, ListSubheader, ListItemText, Collapse } from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import LaunchIcon from '@material-ui/icons/Launch'
import { DropdownMenu } from '../assets/models/dropdown.interface'
import MenuTree from '../assets/mock-data/drawer.mock'
import './drawer.scss'
import { setQueue, toggleMenu } from '../store/actions'
import { connect } from 'react-redux'
import store from "../index"

const Drawer = (props:any) => {
  const [drawerOpen, setDrawer] = useState(true)

  const subHeader = () => {
    return (
      <ListSubheader component='div' id='nested-list-subheader'>
        {drawerOpen ? 'Opciones' : ''}
        <ListItem className= {drawerOpen ? 'btn' : 'btn rotate'} button onClick= {() => {setDrawer(!drawerOpen) }}>
          <ChevronLeftIcon fontSize='large' />
        </ListItem>
      </ListSubheader>
    )
  }

  const [itemOpen, setItem] = useState(true)
  const renderItemChildren = (item: DropdownMenu) => {
    const toggleItem = (itemId: any) => {
      setItem(!itemOpen)
      props.itemArray[itemId] = !props.itemArray[itemId]
    }
    if (item.children) {
      return (
        <div key={item.id}>
          <ListItem button onClick={() => toggleItem(item.id)}>
            <ChevronRightIcon className={props.itemArray[item.id] ? 'menuOpen' : '' } />
            <ListItemText primary={item.name} />
          </ListItem>
          <Collapse in={props.itemArray[item.id]} timeout='auto' unmountOnExit style={{ paddingLeft: '2rem' }}>
            {item.children.map((itemChild:any) => (renderItemChildren(itemChild)))}
          </Collapse>
        </div>
      )
    } else {
      return (
        <NavLink activeStyle={{color:'#f50057', textDecoration: 'underline'}}
        key={item.id} to={{ pathname: item.path || '/'}}
        style={{ textDecoration: 'none', color: '#00695f', display: 'flex', alignItems: 'center', marginLeft: '1rem' }}
        onClick={() => props.setQueue({ path: item.path, name: item.name })}>
          <LaunchIcon style={{ marginRight: 7}} fontSize='small' />
          &nbsp;
          <ListItemText primary={item.name} />
        </NavLink>
      )
    }
  }

  return (
    <List className={drawerOpen ? 'drawer' : 'drawer minimized'}
    component='nav' aria-labelledby='nested-list-subheader'
    subheader={subHeader()}>
    {MenuTree.map((item, i) => (
      <div key={item.id}>
        {renderItemChildren(item)}
      </div>
    ))}
    </List>
  )
}

const mapState = () => ({ itemArray: store.getState().toggleMenu})

const mapDispatch = {
  toggleMenu: (itemArray:{}) => toggleMenu(itemArray),
  setQueue: (itemName: { path: string, name: string}) => setQueue(itemName)
}

export default connect<any, any, any> (mapState, mapDispatch)(Drawer)