import React from 'react';
import "./Imagenes.css"
class Imagenes extends React.Component{
    render(){ // Cuando detecte imagenes, a cada una de ellas y con un limite de 6, se creará con un row de photos con una columna de 4 
        return (
            <div className="row imagenestourist my-3">
                {this.props.photos.map((valor, index) => {
                    return index < 6 &&
                        <div className="container col-lg-4 col-md-6 col-sm-12 cont-galeria text-center" key={index}>
                            <img src={valor.getUrl()} alt={index} className="bg-primary img-thumbnail galeria my-3" width ="300" height="300" />
                        </div>   
                })}
            </div>
        );
    }
}

export default Imagenes;