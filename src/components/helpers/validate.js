const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i;


const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;


const regexNombre = /^[A-Z][a-z]+$/;



const validate = ({ nombre, email, password }) => {
  let errors = {};

  !!nombre && !regexNombre.test(nombre)
    ? (errors.nombre = true)
    : (errors.nombre = "");

  !!email && !regexEmail.test(email)
    ? (errors.email = true)
    : (errors.email = "");

  !!password && !regexPass.test(password)
    ? (errors.password = true)
    : (errors.password = "");
  return errors;
};
export default validate;
