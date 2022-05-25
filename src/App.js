import React , { Component }from "react";
import './App.css';
import Header from "./components/Header"
import Body from "./components/body"

class App extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            latOrigin: 4.624335,
            lngOrigin: -64.064644
        };
    }
    componentDidMount() {
        if ( navigator.geolocation ) {
            navigator.geolocation.getCurrentPosition( (position) => {
                this.setState( { latOrigin: position.coords.latitude, lngOrigin: position.coords.longitude } );
            } );
        }
    }
    render() {
        return (
            <>
                <Header title="PASEANDOANDO.COM" />
                <Body lat={
                        this.state.latOrigin
                    }
                    lng={
                        this.state.lngOrigin
                    }/>
                <footer className="bg-primary text-center mt-2"><h5 className="py-2">®Derechos Reservados</h5></footer>
            </>);
        }   
}
export default App;
