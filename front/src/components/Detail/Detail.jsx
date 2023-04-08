import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './Detail.module.css'
import axios from 'axios'

const Detail = () => {
  const { detailId } = useParams()

  const id = detailId

  const [char, setCharacter] = useState({})

  useEffect(() => {
    axios(`/rickandmorty/detail/${id}`, {
      headers: {
        'Authorization': `Bearer ${
          JSON.parse(window.localStorage.getItem('user')).token
        }`,
      },
    })
      .then(({data}) => {
        if (data.name) {
          setCharacter(data)
        } else {
          window.alert('No hay personajes con ese ID')
        }
      })
      .catch((err) => {   //eslint-disable-line
        window.alert('No hay personajes con ese ID')
      })
    return setCharacter({})
  }, [id])
  return (
    <div key={char.id} className={styles.general}>
      <div className={styles.divName}>
        <h2>Nombre:{char.name}</h2>
      </div>
      <div className={styles.container}>
        <div className={styles.divText}>
          <div className={styles.divStats}>
            <p style={{gridColumnStart:"1",gridColumnEnd:"3"}}><strong>Status:</strong>{char.status}</p>
            <p style={{gridColumnStart:"3",gridColumnEnd:"5"}}><strong>Especie:</strong>{char.species}</p>
            <p style={{gridColumnStart:"5",gridColumnEnd:"7"}}><strong>Genero:</strong>{char.gender}</p>
            <p style={{gridColumnStart:"1",gridColumnEnd:"4"}}><strong>Origen:</strong>{char?.origin}</p>
            <p style={{gridColumnStart:"4",gridColumnEnd:"7"}}><strong>Locación:</strong>{char?.location}</p>
          </div>
        </div>
        <div className={styles.divImg}>
          <img src={char.image} alt={char.name} />
        </div>
      </div>
    </div>
  )
}

export default Detail
