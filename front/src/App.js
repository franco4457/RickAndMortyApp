import React from 'react'
import './App.css'
import Cards from './components/cards/Cards.jsx'
import Detail from './components/Detail/Detail'
import About from './components/About/About'
import Nav from './components/Nav/Nav'
import { Route, Routes } from 'react-router-dom'
import Form from './components/Form/Form'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Favorites from './components/Favorites/Favorites'
import { useDispatch, useSelector } from 'react-redux'
import { setUsername, setAccess, getAllFavsUser } from './redux/actions'
import axios from 'axios'

function App() {
  // const [access, setAccess] = React.useState(false);
  const { access, allCharacters } = useSelector((s) => s)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  function login(userData) {
    axios
      .post('/user', {
        name: userData.nombre,
        username: userData.email,
        password: userData.password,
      })
      .then((res) => {
        window.localStorage.setItem('user', JSON.stringify(res.data))
        dispatch(setUsername(userData.name))
        dispatch(setAccess(true))
        navigate('/home')
      })
      .catch((err) => {
        alert(err.response.data.error)
      })
  }

  useEffect(() => {
    !access && navigate('/')
  }, [access, navigate])

  useEffect(() => {
    if ((allCharacters.length && !characters.length) || !allCharacters.length) {
      setCharacters(allCharacters)
    }
  }, [allCharacters])

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user) {
      dispatch(setUsername(user.name))
      dispatch(getAllFavsUser())
      dispatch(setAccess(true))
      navigate('/home')
    }
  }, [])

  const [characters, setCharacters] = React.useState([])

  const onSearch = (character) => {
    const contains = characters.filter((char) => char.id === Number(character))

    if (contains.length === 0) {
      axios(`/rickandmorty/character/${character}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(window.localStorage.getItem('user')).token
          }`,
        },
      }).then(({ data }) => {
        if (data.name) {
          setCharacters((oldChars) => [...oldChars, data])
        } else {
          window.alert('No hay personajes con ese ID')
        }
      })
    } else {
      window.alert('Ya existe un personaje con ese ID')
    }
  }

  const onClose = (id) => {
    setCharacters(characters.filter((character) => character.id !== id))
  }

  return (
    <>
      <Nav
        onSearch={onSearch}
        characters={characters}
        loc={location.pathname}
      />
      <div className="App">
        <Routes>
          <Route path="/" element={<Form handlerLogin={login} />} />
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
  )
}

export default App
