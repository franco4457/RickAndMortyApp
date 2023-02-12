import styles from "./Form.module.css";
import { useEffect, useState } from "react";
import validate from "../helpers/validate";

const malNombre = "Tu nombre debe comenzar con una mayuscula";
const malEmail = "Tu email no es valido";
const malapass =
  "Tu contraseña debe tener entre 6 y 20 caracteres, una mayuscula, una minuscula y un número c:";
const disPlay = { display: "none" };

const Form = ({ login, acceso }) => {
  const [userData, setUserData] = useState({
    nombre: "",
    email: "",
    password: "",
  });
  // eslint-disable-next-line
  const [errores, setErrores] = useState({
    nombre: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    setErrores(validate(userData));
  }, [userData]);

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userData.nombre || !userData.email || !userData.password) {
      alert("Todos los campos son obligatorios");
    } else {
      login(userData);
    }
  };

  return (
    <>
      <div className={styles.divContainer}>
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
                  autocomplete="off"
                />
              </div>

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
                  autocomplete="off"
                />
              </div>

              <br />

              <div className={styles.pass}>
                <label htmlFor="password">Contraseña </label>
                <input
                  autocomplete="off"
                  onChange={handleChange}
                  value={userData.password}
                  type="password"
                  name="password"
                  placeholder="*******"
                  className={errores.password && styles.inpRed}
                />
              </div>
            </div>
            <div className={styles.erroresContiner}>
              <div
                className={errores.nombre ? styles.badines : styles.goodines}
                style={!userData.nombre ? disPlay : {}}
              >
                <span>{malNombre}</span>
              </div>
              <div
                className={errores.email ? styles.badines : styles.goodines}
                style={!userData.email ? disPlay : {}}
              >
                <span>{malEmail}</span>
              </div>
              <div>
                <div
                  className={
                    errores.password ? styles.badines : styles.goodines
                  }
                  style={!userData.password ? disPlay : {}}
                >
                  <span>{malapass}</span>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div>
            <button type="submit" className={styles.btnLogin} >
              Log in
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
