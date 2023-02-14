import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

const Detail = () => {
  const { detailId } = useParams();

  const id = detailId;

  const [char, setCharacter] = useState({});

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => response.json())
      .then((char) => {
        if (char.name) {
          setCharacter(char);
        } else {
          window.alert("No hay personajes con ese ID");
        }
      })
      .catch((err) => {
        window.alert("No hay personajes con ese ID");
      });
    return setCharacter({});
  }, [id]);
  return (
    <div key={char.id} className={styles.general}>
      <div className={styles.divName}>
        <h2>Nombre:{char.name}</h2>
      </div>
      <div className={styles.container}>
        <div className={styles.divText}>
          <div className={styles.divStats}>
            <p>Status:{char.status}</p>
            <p>Especie:{char.species}</p>
            <p>Genero:{char.gender}</p>
            <p>Origen:{char?.origin?.name}</p>
            <p>Locación:{char?.location?.name}</p>
          </div>
        </div>
        <div className={styles.divImg}>
          <img src={char.image} alt={char.name} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
