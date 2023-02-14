import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Nav.module.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";


const disP = { display: "none" };

class Nav extends React.Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={this.props.loc === "/" ? disP : { display: "flex" }}>
        <nav className={styles.navContainer}>
          <div style={this.props.loc !== "/home" ? disP : {}}>
            <NavLink to="/about">
              <button className={styles.btnAbout}><span>About</span>👨🏻‍💻</button>
            </NavLink>
          </div>
          <div style={this.props.loc !== "/home" ? disP : {}}>
            <NavLink to="/favorites">
              <button className={styles.btnFav}>
                <span>Favorites</span>⭐
              </button>
            </NavLink>
          </div>
          <NavLink to="/home" style={this.props.loc === "/home" ? disP : {}}>
            <button className={styles.botonH}> <h2>Back To Home🏠</h2> </button>
          </NavLink>
          <div
            className={styles.bienvenido}
            style={this.props.loc !== "/home" ? disP : {}}
          >
            <h2>Bienvenido {this.props.userName}</h2>
          </div>

          <button
            className={styles.botonR}
            onClick={() => this.props.onSearch(Math.floor(Math.random() * 826))}
            style={this.props.loc !== "/home" ? disP : {}}
          >
            <span>Random</span> 🔀
          </button>

          <SearchBar
            className={styles.searchBar}
            key={"searchBar"}
            onSearch={this.props.onSearch}
            characters={this.props.characters}
            loc={this.props.loc}
          />
        </nav>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userName: state.userName,
  };
};

export default connect(mapStateToProps, null)(Nav);
