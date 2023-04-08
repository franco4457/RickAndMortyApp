/* eslint-disable  */ 
import styles from "./SearchBar.module.css";
import React from "react";


const disP = { display: "none" };

export default function SearchBar(props) {
  let [char, setChar] = React.useState("");
  

  const handleChange = (event) => {
    const value = event.target.value;
    setChar((char = value));
  };

  return (
    <div className={styles.searchBar}  style={props.loc !== "/home" ? disP : {}}>
      <div className={styles.barra}>
        <input
          className={styles.input}
          id="busca"
          type="search"
          value={char}
          onChange={handleChange}
          placeholder="ID"
        />
        <button
          type="submit"
          className={styles.boton}
          onClick={() => {
            props.onSearch(char);
            setChar("");
          }}
        >
          🔍<span>Search</span>
        </button>
      </div>
    </div>
  );
}
