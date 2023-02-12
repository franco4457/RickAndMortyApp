import React from "react";
import styles from "./About.module.css";
import fotoImg from "./img/fotcv.png";
import htmlImg from "./img/html.png";
import jsImg from "./img/javascript.png";
import reactImg from "./img/react.png";
import reduxImg from "./img/redux.png";

class About extends React.Component {
  render() {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.divYo}>
            <div>
              <div>
                <h3>App creada por Franco Gutierrez</h3>
              </div>
            </div>
            <img src={fotoImg} alt="imgAbout" />
          </div>
          <div className={styles.divSkills}>
            <h4>Skills</h4>
            <ul>
              <li>
                <div>
                  <img src={jsImg} alt="JSlogo" />
                  <span>Javascript</span>
                </div>
              </li>
              <li>
                <div>
                  {/* <img src="https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_640.png" alt="htmlLogo" /> */}
                  <img src={htmlImg} alt="htmlLogo" />
                  <span>HTML</span>
                </div>
              </li>
              {/* <img src="https://w7.pngwing.com/pngs/4/808/png-transparent-css3-css3-logo-logo-language-programming-language-css-3d-icon.png" alt="JSLogo" />
              <li>CSS</li> */}
              <li>
                <div>
                  <img src={reactImg} alt="reactlogo" />
                  <span>React</span>
                </div>
              </li>
              <li>
                <div>
                  <img src={reduxImg} alt="reduxlogo" />
                  <span> Redux</span>
                </div>
              </li>
            </ul>
          </div>
          <div className={styles.divText}>
            <br />
            <span>
              Soy Franco Gutierrez, estudiante de SoyHenry. Soy de
              Resistencia,Chaco,Argentina.Soy desarrollador FullStack con
              hablilidades en desarrollo web y BBDD.
            </span>
            <p>
              <a href="https://www.linkedin.com/in/francoegi/">LinkedIn</a>{" "}
              <a href="https://github.com/franco4457">GitHub</a>
            </p>
          </div>
        </div>
      </>
    );
  }
}
export default About;
