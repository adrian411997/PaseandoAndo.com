import React, {Component} from "react"
import "./Destino.css"

class Destino extends Component {
    constructor(props){
        super(props)
        this.state = {
            travel: "DRIVING"
        }
    }
    
    handleSelect = (event) => {
        this.setState({
            travel: event.target.value
        })
    }
    render(){
        return (
            <div className=" container text-center">
                <div className=" w-100 d-inline-flex my-5 text-center">
                <form className="form-inline col-12">
                    <div className="row">
                    <div className="col-6">
                    <p className="text-info">Origen:</p>
                    <input type="text" className=" mb-2 mr-sm-2" placeholder="Lugar de partida" id="origenx" />
                    </div>
                    <div className="col-6">
                    <p className="text-info">Destino:</p>
                    <input type="text" className="mb-2 mr-sm-2" id="destino" />
                    </div>
                    </div>
                    <div className="col-4">
                        <select className="" onChange={this.handleSelect} value={this.state.travel}>
                            <option value="DRIVING">Vehiculo</option>
                            <option value="TRANSIT">Transporte Publico</option>
                            <option value="WALKING">A pie</option>
                            <option value="BICYCLING">Bicicleta</option>
                        </select>   
                    </div>
                </form> 
                </div>
                <button className="my-3 col-12 btn btn-primary" onClick={(e) => this.props.calcularDestino(this.state.travel, e)}>Ir al Destino</button> 
            </div>
        )
    }
}

export default Destino