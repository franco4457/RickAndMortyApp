import React from 'react'
import axios from 'axios'
import { useState } from 'react' //eslint-disable-line
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  getAllFavsUser,
  setAccess,
  setUsername,
} from '../../redux/actions'
import styles from './Login.module.css'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  })
  const handlerChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value })
  }

  const handleLogin = (event) => {
    event.preventDefault()
    if (!inputs.email || !inputs.password)
      return alert('Debe rellenar todos los campos.')
    axios
      .post('/user/login', {
        username: inputs.email,
        password: inputs.password,
      })
      .then((res) => res.data)
      .then(({ name, token }) => {
        window.localStorage.setItem(
          'user',
          JSON.stringify( {name,token} )
        )
        dispatch(setUsername(name))
        dispatch(getAllFavsUser())
        dispatch(setAccess(true))
        navigate('home')
      })
      .catch((error) => {
        dispatch(setAccess(false))
        alert(error.response.data.message)
      })
  }
  return (
    <>
      <form onSubmit={handleLogin} className={styles.form}>
        <div className={styles.email}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={handlerChange}
          />
        </div>
        <div className={styles.pass}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={inputs.password}
            onChange={handlerChange}
          />
        </div>
        <button type="submit" className={styles.btnLogin}>
          Login
        </button>
      </form>
    </>
  )
}

export default Login
