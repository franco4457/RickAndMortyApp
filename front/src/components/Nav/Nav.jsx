
import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import styles from './Nav.module.css'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from '../../redux/actions'

const disP = { display: 'none' }
class Nav extends React.Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props)
  }
  render() {
    const { loc, onSearch, characters,userName, logOut } = this.props //eslint-disable-line
    const handlerLogOut = () => {window.localStorage.removeItem('user')
logOut()
    }
    return (
      <div style={ loc === '/' ? disP : { display: 'flex' }}>
        <nav className={styles.navContainer}>
          <div style={loc !== '/home' ? disP : {}}>
            <button onClick={handlerLogOut} className={styles.logOut}>
            🔙<span>Log Out</span>
            </button>
          </div>
          <div style={loc !== '/home' ? disP : {}}>
            <NavLink to="/about">
              <button className={styles.btnAbout}>
                <span>About</span>👨🏻‍💻
              </button>
            </NavLink>
          </div>
          <div style={loc !== '/home' ? disP : {}}>
            <NavLink to="/favorites">
              <button className={styles.btnFav}>
                <span>Favorites</span>⭐
              </button>
            </NavLink>
          </div>
          <NavLink to="/home" style={loc === '/home' ? disP : {}}>
            <button className={styles.botonH}>
              {' '}
              <h2>Back To Home🏠</h2>{' '}
            </button>
          </NavLink>
          <div
            className={styles.bienvenido}
            style={loc !== '/home' ? disP : {}}
          >
            <h2>Bienvenido {userName}</h2>
          </div>

          <button
            className={styles.botonR}
            onClick={() => onSearch(Math.floor(Math.random() * 826))}
            style={loc !== '/home' ? disP : {}}
          >
            <span>Random</span> 🔀
          </button>

          <SearchBar
            className={styles.searchBar}
            key={'searchBar'}
            onSearch={onSearch}
            characters={characters}
            loc={loc}
          />
        </nav>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    userName: state.userName,
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
logOut:()=>dispatch(logOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
