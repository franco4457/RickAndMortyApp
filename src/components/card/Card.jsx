import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addFavorite, deleteFavorite } from "../../redux/actions";
import React from "react";


class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isFav: false };
  }

  handleFavorite(fav) {
    if (fav) {
      this.props.borrarFavorite(this.props.charac.id);
      this.setState({ ...this.state, isFav: false });
    } else {
      this.props.agregarFavorite(this.props.charac);
      this.setState({
        ...this.state,
        isFav: true,
      });
    }
  }
  componentDidMount() {
    for (let i = 0; i < this.props.myFavorites.length; i++) {
      if (this.props.myFavorites[i].id === this.props.id) {
        this.setState({ ...this.state, isFav: true });
      }
    }

  }

  render() {
    const loc=window.location.pathname;
    let dPlay;
    (loc==="/favorites")&&!this.state.isFav&& (dPlay = {display:"none"});

    // const { id, name, species, image, gender, onClose } = this.props;
    return (
      <div className={styles.divCard} id={this.props.id} style={dPlay} >
        {this.state.isFav ? (
          <button className={styles.favbtn} onClick={() => this.handleFavorite(this.state.isFav)}>
            ⭐
          </button>
        ) : (
          <button className={styles.unfavbtn} onClick={() => this.handleFavorite(this.state.isFav)}>
            ⭐
          </button>
        )}
        {this.props.onClose && (
          <button
            className={styles.close}
            onClick={() => {
              this.props.onClose(this.props.id);
              this.state.isFav&&this.handleFavorite(this.state.isFav);
            }}
          >
            X
          </button>
        )}

        <Link to={`/detail/${this.props.id}`}>
          <img src={this.props.image} alt={this.props.name} />
        </Link>
        <h2 className={styles.nombre}>{this.props.name}</h2>
        <div className={styles.divGenSpe}>
          <h2 className={styles.species}>{this.props.species}</h2>
          <h2 className={styles.genero}>{this.props.gender} </h2>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    myFavorites: state.myFavorites,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    agregarFavorite: (char) => dispatch(addFavorite(char)),
    borrarFavorite: (id) => dispatch(deleteFavorite(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);

// function Card({
//   charac,
//   id,
//   name,
//   species,
//   image,
//   gender,
//   onClose,
//   addFavorite,
//   deleteFavorite,
// }) {
//   const [isFav, setIsFav] = useState(false);

//   const handleFavorite = () => {
//     if (isFav) {
//       deleteFavorite(id);
//       setIsFav(false);
//     } else {
//       addFavorite(charac);
//       setIsFav(true);
//     }
//   };

//   return (
//     <div className={styles.divCard} id={id}>
//       {isFav ? (
//         <button onClick={handleFavorite}>❤️</button>
//       ) : (
//         <button onClick={handleFavorite}>🤍</button>
//       )}
//       <button className={styles.close} onClick={() => onClose(id)}>
//         X{" "}
//       </button>
//       <Link to={`/detail/${id}`}>
//         <img src={image} alt={name} />
//       </Link>
//       <h2 className={styles.nombre}>{name}</h2>
//       <div className={styles.divGenSpe}>
//         <h2 className={styles.species}>{species}</h2>
//         <h2 className={styles.genero}>{gender} </h2>
//       </div>
//     </div>
//   );
// }
