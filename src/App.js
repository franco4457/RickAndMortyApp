import React from "react";
import "./App.css";
import Cards from "./components/cards/Cards.jsx";
import Detail from "./components/Detail/Detail";
import About from "./components/About/About";
import Nav from "./components/Nav/Nav";
import { Route, Routes } from "react-router-dom";
import Form from "./components/Form/Form";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Favorites from "./components/Favorites/Favorites";
import { useDispatch } from "react-redux";
import { setUsername } from "./redux/actions";
// eslint-disable-next-line
const dPlay = "display: none;";

function App() {
  const [access, setAccess] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const countAccess = {
    email: "email@gmail.com",
    password: "Contraseña123",
  };
  function login(userData) {
    if (
      userData.password === countAccess.password &&
      userData.email === countAccess.email
    ) {
      dispatch(setUsername(userData.nombre));
      setAccess(true);
      navigate("/home");
    } else {
      alert(`De momento no esta implementada la base de datos. 
      email valido: ${countAccess.email} 
      password valida: ${countAccess.password}`);
    }
  }

  useEffect(() => {
    !access && navigate("/");
  }, [access, navigate]);

  const [characters, setCharacters] = React.useState([]);

  const onSearch = (character) => {
    const contains = characters.filter((char) => char.id === Number(character));

    if (contains.length === 0) {
      fetch(`https://rickandmortyapi.com/api/character/${character}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
          } else {
            window.alert("No hay personajes con ese ID");
          }
        });
    } else {
      window.alert("Ya existe un personaje con ese ID");
    }
  };

  const onClose = (id) => {
    setCharacters(characters.filter((character) => character.id !== id));
  };

  return (
    <>
      <Nav
        onSearch={onSearch}
        characters={characters}
        loc={location.pathname}
      />
      <div className="App">
        <Routes>
          <Route path="/" element={<Form login={login} acceso={access} />} />
          <Route
            path="/home"
            element={<Cards characters={characters} onClose={onClose} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/detail/:detailId" element={<Detail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
