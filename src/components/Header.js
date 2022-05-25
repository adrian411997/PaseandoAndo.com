import React, { Component } from "react";
import maleta from "../img/mlet.png";
import "./Header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      display: "none",
    };
  }
  mostrar() {
    this.setState({
      display: "show",
    });
  }

  render() {
    return (
      <header>
        <nav className="navbar navbar-dark bg-primary">
          <div className="text-left">
            <a className="navbar-brand d-inline-flex" href="/">
              <img
                src={maleta}
                alt="#"
                width="50"
                height="50"
                className="icon"
              />
              <h3 className="titulo pt-2">{this.state.title}</h3>
            </a>
          </div>
          <div className="text-right">
            <ul className="d-inline-flex">
              <li className="bg-primary justify-content-between m-2">
                <button
                  type="button"
                  className="btn-primary modal-button"
                  data-toggle="modal"
                  data-target="#desc"
                >
                  Acerca de la App
                </button>
                <div
                  className="modal fade"
                  id="desc"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Descripción
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body text-left">
                        <p>
                          Una app pensada para aquellas personas que desean
                          saber acerca de los lugares que desean visitar asi
                          como tambien buscar opiniones acerca de la calidad de
                          los servicios, ambientes, etc.
                        </p>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-primary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="bg-primary justify-content-between m-2">
                <button
                  type="button"
                  className="btn-primary modal-button"
                  data-toggle="modal"
                  data-target="#desc1"
                >
                  Herramientas
                </button>
                <div
                  className="modal fade"
                  id="desc1"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Herramientas utilizadas
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body text-left">
                        <ul>
                          <li>Html</li>
                          <li>Css</li>
                          <li>Bootstrap</li>
                          <li>React</li>
                          <li>Google Place Api</li>
                        </ul>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-primary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="bg-primary justify-content-between m-2">
                <button
                  type="button"
                  className="btn-primary modal-button"
                  data-toggle="modal"
                  data-target="#desc2"
                >
                  Agradecimientos
                </button>
                <div
                  className="modal fade"
                  id="desc2"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          Agradecimientos
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body text-left">
                        <p>
                          Agradezco profundamente a los tutores de NextU cuyo
                          material me ayudan a seguir avanzando, paso a paso,
                          hacia mis metas y sueños de adentrarme aun mas en el
                          mundo de la programación en general. Muchas Gracias.
                        </p>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-primary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
