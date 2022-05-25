import React from 'react';

class Datos extends React.Component {
    render() {
        
        return (
        <div className="row my-2 text-center">
                <div className="col-12">
                    <h1 className="underline"><u>{this.props.name}</u></h1>

                </div>
                <div className="col-12">
                    <p className="lead font-italic">{this.props.address}</p>
                </div>
            </div>
        )
    }
}

export default Datos;