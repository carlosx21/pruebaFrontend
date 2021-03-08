import { Component } from '@angular/core';
import { Detail } from './models/detail.model';
import { Propiedad } from './models/propiedad.model';
import { ApiPruebaService } from './services/api-prueba.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  // Variable de apoyo para los tabs
  active = 1;

  // Lista de propiedades consultadas
  lstPropiedades: Propiedad[] = [];
  // Variable de propiedad seleccionada
  selectPropiedad: Propiedad = new Propiedad();

  // Contadores para el carosuel
  cantPropiedad = 0;
  countNext: number = 0;
  // variable de apoyo para imagenes
  images: string[] = [];

  // Configuración de Google Maps 
  center = { lat: 0, lng: 0 };
  zoom = 17;
  marker!: any;
  display?: google.maps.LatLngLiteral;

  constructor(private apipruebaServ: ApiPruebaService) { }


  ngOnInit() {

    this.selectPropiedad.details = new Detail();

    // Se traen las propiedades disponibles
    this.apipruebaServ.getPropiedades()
      .subscribe(resp => {
        this.lstPropiedades = resp;
        this.cantPropiedad = this.lstPropiedades.length;
        this.loadPropiedad(this.lstPropiedades[0]);
      });

  }

  loadPropiedad(propiedadSelec: Propiedad) {
    this.selectPropiedad = propiedadSelec;

    this.center.lat = this.selectPropiedad.location.latitude;
    this.center.lng = this.selectPropiedad.location.longitude;

    // Se crea un marcador para el mapa
    this.marker = {
      position: {
        lat: this.selectPropiedad.location.latitude,
        lng: this.selectPropiedad.location.longitude,
      },
      label: {
        color: 'red',
        text: 'Ubicacion de la propiedad  ',
      },
      title: 'Ubicacion de la propiedad ',
      info: 'Ubicacion de la propiedad ',
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    }

    // Se consultan las imagenes de la propiedad seleccionada
    this.apipruebaServ.getImages(this.selectPropiedad.helperid)
      .subscribe(resp => {
        this.images = resp.images;
      });
  }

  // Boton siguiente de propiedades
  nextPropiedad() {
    this.countNext = this.countNext + 1;
    if (this.cantPropiedad > this.countNext) {
      this.loadPropiedad(this.lstPropiedades[this.countNext]);
    } else {
      this.countNext = 0;
      this.loadPropiedad(this.lstPropiedades[this.countNext]);
    }

  }

  // Funcion utilizada para cambiar el tab al mapa
  clickMap() {
    this.active = 2;
  }

}








