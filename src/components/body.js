import React from "react"
import Imagenes from "./Imagenes";
import Horarios from "./Horarios";
import Rating from "./Rating"
import Comentarios from "./Comentarios";
import Datos from "./datos";
import Lugares from "./Lugares";
import "./body.css"

class Body extends React.Component {
       constructor(props){
        super(props)
        this.state = {
            name: '',
            address: '',
            location: '',
            hours: '',
            rating: '',
            places: '',
            viewPlaces: false,
            photos: '',
            reviews: "",
            travel: "DRIVING",
           
        }
    }

    map = ''
    service = ''
    directionsService = ''
    directionsRender = ''
    start = ''
    marker = []
    coordOrigenx= ""
    coordDestino= ""
    componentDidMount(){
        const googlePlaceAPILoad = setInterval(() => {
            if (window.google){
                this.google=window.google;
                clearInterval(googlePlaceAPILoad);
                console.log('Load Place API');
                this.map = new this.google.maps.Map(
                    document.getElementById('map'), {
                    center: new this.google.maps.LatLng(this.props.lat,this.props.lng),
                    zoom: 14 });
                this.marker = []
                this.addMarker(this.props.lat, this.props.lng)    
                this.service = new this.google.maps.places.PlacesService(this.map)
                this.directionsService = new this.google.maps.DirectionsService()
                this.directionsRender = new this.google.maps.DirectionsRenderer()
                this.start = new this.google.maps.LatLng(this.props.lat, this.props.lng)
            };
        },100)
    }

    UbicarLugar(coordenadas) { 
        var nuevoLugar = coordenadas
        this.map.setCenter(nuevoLugar)
    }
    addMarker = (lat, lng,map) => {
        let defineMarker = new this.google.maps.Marker({
            position: new this.google.maps.LatLng(lat, lng),
            map: this.map
        })
        this.marker.push(defineMarker)
    }

    buscar = (name, e) => {
        const request = {
            query: name,
            fields: ['place_id']
        };
        this.service.findPlaceFromQuery(request, (result, status) => {
            if(status === this.google.maps.places.PlacesServiceStatus.OK){
                const request_details = {
                    placeId: result[0].place_id,
                    fields: ['name', 'photo', 'formatted_address', 'rating', 'opening_hours', 'review', 'geometry'] 
                }
                this.service.getDetails(request_details, (results, status) => {
                    if(status === this.google.maps.places.PlacesServiceStatus.OK){
                        this.setState({
                            name: results.name,
                            address: results.formatted_address,
                            location: results.geometry.location,
                            hours: results.hasOwnProperty('opening_hours') ? results.opening_hours.weekday_text : "",
                            rating: results.rating,
                            reviews: results.reviews,
                            photos: results.photos,
                            places: '',
                            viewPlaces: false
                        })
                        this.UbicarLugar(this.state.location.lat(), this.state.location.lng())
                        console.log(this.state.location.lat(), this.state.location.lng())
                        this.addMarker(this.state.location.lat(), this.state.location.lng())

                    }
                })
            }
        });
    }
    buscarLugaresCercanos = () => {
        const request = {
            location: this.state.location ? this.state.location : new this.google.maps.LatLng(this.props.lat,this.props.lng),
            radius: '1000'
        }
        return new Promise((resolve => {
            this.service.nearbySearch(request, (results, status) => {
                if(status === this.google.maps.places.PlacesServiceStatus.OK){
                    this.setState({
                        places: results,
                        viewPlaces: true
                    })
                    resolve("ok")
                }
            })
        }))   
    }
    handleSelect = (event) => {
        this.setState({
            travel: event.target.value
        })
    }
    ubicarDestinos = (origin, destiny, e) => {
        const request = {
            query: origin,
            fields: ['place_id']

        };
        const request2 ={
            query:destiny,
            fields: ['place_id']
        }
        this.service.findPlaceFromQuery(request, (result, status) => {
            if(status === this.google.maps.places.PlacesServiceStatus.OK){
                const request_details={
                    placeId: result[0].place_id,
                    fields:["geometry"]
                }
                this.service.getDetails(request_details,(results,status)=>{ //Obtener las coordenadas del Origen
                    if(status === this.google.maps.places.PlacesServiceStatus.OK){
                        this.setState({
                            coordOrigenx : {
                                lat: results.geometry.location.lat(),
                                lng: results.geometry.location.lng()
                            }
                        })
                    }
                })
            }
        })
        this.service.findPlaceFromQuery(request2, (result, status) => { //Obtener las coordenadas del destino
            if(status === this.google.maps.places.PlacesServiceStatus.OK){
                const request_details2={
                    placeId: result[0].place_id,
                    fields:["geometry"]
                }
                this.service.getDetails(request_details2,(results,status)=>{
                    if(status === this.google.maps.places.PlacesServiceStatus.OK){
                        this.setState({
                            coordDestino : {
                                lat: results.geometry.location.lat(),
                                lng: results.geometry.location.lng()
                            }
                        })
                        this.UbicarLugar(this.state.coordDestino)
                    }
                })
            }  
        })
        this.calcDestino(this.state.coordOrigenx, this.state.coordDestino, this.state.travel)
    }
    calcDestino = (mode) => {
        this.directionsRender.setMap(this.map)
        console.log(this.state.coordOrigenx)
        console.log(this.state.coordDestino)
        const request = {
            origin: this.state.coordOrigenx,
            destination: this.state.coordDestino,
            travelMode: mode
        }
        this.directionsService.route(request, (result, status) => {
            if(status === "OK"){
                this.directionsRender.setDirections(result)
            }
        })
        this.limpiarMarkers(this.marker)
    }
    limpiarMarkers = (marcadores) =>{
        for(var i = 0; i<marcadores.length; i++){
            marcadores[i].setMap(null)
        }
        marcadores.length=0;
    }
    render(){
        let datos, galeria, horario, comentarios, rating, destiny, map_destiny, refresh;
        if(this.state.name){
            datos = <Datos name={this.state.name} address={this.state.address} />
        }
        if(this.state.photos){
            galeria = <Imagenes photos={this.state.photos} />
        }
        if(this.state.hours){
            horario = <Horarios hours={this.state.hours} />
        }
        if(this.state.rating){
            rating = <Rating rating={this.state.rating} />
        }
        if(this.state.reviews){
            comentarios = <Comentarios reviews={this.state.reviews}/>
        }
        if(this.state.location){
            destiny = <div className=" container text-center">
                <h1>Ingrese dos ubicaciones para trazar una ruta</h1>
                <div className=" w-100 d-inline-flex my-2 text-center">
                <form className="form-group col-12">
                    <div className="">
                    <div className="form-group two-fields">
                    <div className="input-group">
                    <input type="text" className=" form-control mb-1 mr-sm-2" placeholder="Ingrese un punto de partida" id="origenx" />
                    <input type="text" className="form-control mb-1 mr-sm-2" placeholder="Ingrese un destino" id="destino" />
                    </div>
                    </div>
                    </div>
                    <div className="col-12">
                        <select className="form-control" onChange={this.handleSelect} value={this.state.travel}>
                            <option value="DRIVING">Vehiculo</option>
                            <option value="TRANSIT">Transporte Publico</option>
                            <option value="WALKING">A pie</option>
                            <option value="BICYCLING">Bicicleta</option>
                        </select>   
                    </div>
                </form> 
                </div>
                <button className="my-1 col-12 btn btn-primary" onClick={(e) => this.ubicarDestinos(document.getElementById("origenx").value, document.getElementById("destino").value, e)}>Ir al Destino</button> 
            </div>
        }
        if (this.state.coordDestino && this.state.coordOrigenx){
           map_destiny = this.calcDestino(this.state.travel)
        }
        if (this.state.coordDestino && this.state.coordOrigenx){
           refresh = <a href="location.reload" className="btn btn-primary mb-5"> Buscar otra vez</a>
        }
        return (
            <div className="container mt-5">
                <div className="col-12">
                <h1 className="text-center mb-4">Bienvenido al buscador de sitios turisticos</h1>
                    <div className="form-group container text-center">
                        <input type="text" className="form-control" id="ciudad" placeholder="Ingresar nombre, ciudad o direccion"/>
                        <button className="btn btn-primary my-3" onClick={(e) => this.buscar(document.getElementById('ciudad').value, e)} >Buscar</button>
                    </div>
                </div>
                {datos}
                {galeria}
                {horario}
                {rating}
                {comentarios}
                <Lugares mostrar={this.state.viewPlaces} lugares={this.state.places} buscar={this.buscar} buscarLugaresCercanos={this.buscarLugaresCercanos}/>
                {destiny}
                {map_destiny}
                <div id="map" className="mb-5 mt-3"></div>
                {refresh}
            </div>
        );
    }
}
export default Body;