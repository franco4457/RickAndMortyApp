/* eslint-disable  */ 
import React from "react";
import { connect } from "react-redux";
import Cards from "../cards/Cards";
import { filterCards, orderCards, resetFavorites } from "../../redux/actions";
import styles from "./Favorites.module.css";

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
    };
  }
  componentWillUnmount() {
    this.props.resetFavorites();
  }

  render() {
    const handleOrden = (event) => {
      this.props.orderCards(event.target.value);
      this.setState({ ...this.state, refresh: !this.state.refresh });
    };
    const handleFiltrar = (event) => {
      const gender = event.target.value;
      gender === "All genders"
        ? this.props.resetFavorites()
        : this.props.filterCards(gender);
      this.setState({ ...this.state, refresh: !this.state.refresh });
    };
    return (
      <>
        <div className={styles.divSelects}>
          <div>
            <label htmlFor="orden">Orden:</label>
            <select
              name="orden"
              onChange={handleOrden}
              className={styles.selecOrd}
            >
              <option value="Ascendente">Ascendente</option>
              <option value="Descendiente">Descendiente</option>
            </select>
          </div>
          <div>
            <label htmlFor="gender">Filter:</label>
            <select
              name="gender"
              onChange={handleFiltrar}
              className={styles.selecGender}
            >
              <option value="All genders">All genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Genderless">Genderless</option>
              <option value="unknown">unknown</option>
            </select>
          </div>
        </div>
        <Cards characters={this.props.myFavorites} />
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    filterCards: (gender) => dispatch(filterCards(gender)),
    orderCards: (orden) => dispatch(orderCards(orden)),
    resetFavorites: () => dispatch(resetFavorites()),
  };
};

const mapStateToProps = (state) => {
  return {
    myFavorites: state.myFavorites,
    allCharacters: state.allCharacters,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
