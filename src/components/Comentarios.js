import React from "react"
import "./Comentarios.css"

class Comentarios extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isComment: true
        }
    }

    handleMostrarComment = (event) => {
        this.setState({
            isComment: false
        })
    }

    handleOcultarComment = (event) => {
        this.setState({
            isComment: true
        })
    }

    render(){
        let button
        if (this.state.isComment) {
            button = <button className="btn btn-primary" onClick={this.handleMostrarComment}>Mostrar Comentarios</button>
        }else{
            button = <button className="btn btn-outline-primary" onClick={this.handleOcultarComment}>Ocultar Comentarios</button>
        }
        return (
            <div className="comments mx-auto">
                <div className="row my-4">
                    <div className="">
                        {button}
                        </div>
                    </div>
                {
                    !this.state.isComment && 
                        <div className="row my-2">
                            <div className="col m-0">
                                {
                                    this.props.reviews.map((valor, index) => {
                                        return  <div className="w-100 row border-bottom p-3 bg-light" key={index}>
                                                    <div className="col-md-2 col-12 p-0">
                                                        <div className="imagenContenedor mx-auto">
                                                            <img src={valor.profile_photo_url} alt={valor.author_name} className="rounded-circle " />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-10 col-12">
                                                        <div className="d-flex justify-content-between">
                                                            <p className="lead">{valor.author_name}</p>
                                                            <p className="text-muted"><small>{valor.relative_time_description}</small></p>
                                                        </div>
                                                        <p className="text-wrap">{valor.text}</p>
                                                    </div>
                                                </div>
                                        
                                    })
                                }
                            </div>
                        </div>
                }
            </div>
        )
    }
}

export default Comentarios