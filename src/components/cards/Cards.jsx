import Card from "../card/Card";
import styles from "./Cards.module.css";
import { useLocation } from "react-router-dom";

const marg={marginTop:"20vh"}

export default function Cards({ characters, onClose }) {
  const loc=useLocation()
    return (
    <div className={styles.divCards} style={loc.pathname==="/favorites"?marg:{}} >
      {characters.map(({ id, name, species, image, gender }, index) => {
        return (
          <Card
            charac={characters[index]}
            characters={characters}
            key={index + id}
            id={id}
            name={name}
            species={species}
            image={image}
            gender={gender}
            onClose={onClose}
          />
        );
      })}
    </div>
  );
}
