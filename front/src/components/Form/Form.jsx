import React from 'react'
import styles from './Form.module.css'
import { useEffect, useState } from 'react'
import validate from '../helpers/validate'
import fyer from './titulorymnobg.png'
import Login from '../Login/Login'

const malNombre = 'Tu nombre debe comenzar con una mayuscula'
const malEmail = 'Tu email no es valido'
const malapass =
  'Tu contraseña debe tener entre 6 y 20 caracteres, una mayuscula, una minuscula y un número c:'

const Form = ({ handlerLogin }) => {//eslint-disable-line
  const [userData, setUserData] = useState({
    nombre: '',
    email: '',
    password: '',
  })
  const [errores, setErrores] = useState({
    nombre: '',
    email: '',
    password: '',
  })

  const [toggleLogin, setToggleLogin] = useState(false)

  useEffect(() => {
    setErrores(validate(userData))
  }, [userData])
  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    if (!userData.nombre || !userData.email || !userData.password) {
      alert('Todos los campos son obligatorios')
    } else {
      handlerLogin(userData)
    }
  }

  return (
    <div className={styles.contianer}>
      <div className={styles.img}>
        <img src={fyer} alt="titulopng" />
      </div>
      <div className={styles.divContainer}>
        <h1 className={styles.titleh1}>{toggleLogin ? 'Login' : 'Register'}</h1>
        {toggleLogin ? (
          <Login />
        ) : (
          <form onSubmit={handleSubmit}>
            <div className={styles.divFormContainer}>
              <div className={styles.inputsContainer}>
                <div className={styles.nombre}>
                  <label htmlFor="nombre">Nombre </label>
                  <input
                    onChange={handleChange}
                    value={userData.nombre}
                    type="text"
                    name="nombre"
                    placeholder="Tu nombre..."
                    className={errores.nombre && styles.inpRed}
                    autoComplete="off"
                  />
                </div>
                {userData.nombre && (
                  <div>
                    <span
                      className={
                        errores.nombre ? styles.badines : styles.goodines
                      }
                    >
                      {errores.nombre ? malNombre : 'Nombre valido'}
                    </span>
                  </div>
                )}

                <br />

                <div className={styles.email}>
                  <label htmlFor="email">Email </label>
                  <input
                    onChange={handleChange}
                    value={userData.email}
                    type="email"
                    name="email"
                    placeholder="email@gmail.com"
                    className={errores.email && styles.inpRed}
                    autoComplete="disabled"
                  />
                </div>
                {!!userData.email && (
                  <div>
                    <span
                      className={
                        errores.email ? styles.badines : styles.goodines
                      }
                    >
                      {errores.email ? malEmail : 'Email valido'}
                    </span>
                  </div>
                )}

                <br />

                <div className={styles.pass}>
                  <label htmlFor="password">Contraseña </label>
                  <input
                    autoComplete="off"
                    onChange={handleChange}
                    value={userData.password}
                    type="password"
                    name="password"
                    placeholder="*******"
                    className={errores.password && styles.inpRed}
                  />
                </div>
                {!!userData.password && (
                  <div>
                    <span
                      className={
                        errores.password ? styles.badines : styles.goodines
                      }
                    >
                      {errores.password ? malapass : 'Password valida'}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <br />
            <div>
              <button type="submit" className={styles.btnLogin}>
                Register
              </button>
            </div>
          </form>
        )}
        <br />
        <button
          onClick={() => setToggleLogin(!toggleLogin)}
          className={styles.btnSwitch}
        >
          {toggleLogin ? 'Register' : 'Login'}
        </button>
      </div>
    </div>
  )
}

export default Form
