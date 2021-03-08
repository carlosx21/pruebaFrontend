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
  title = 'pruebaFrontend';
  active = 1;

  lstPropiedades: Propiedad[] = [];
 
  selectPropiedad: Propiedad = new Propiedad();

  cantidadPropiedad = 0;
  countNext: number = 0;

  images: string[] = [];

   // Configuración de Google Maps 
   
   center = {lat:0, lng: 0};   
   zoom = 17;
   marker!: any ;
   display?: google.maps.LatLngLiteral;

  constructor( private apipruebaServ: ApiPruebaService ) { }


  ngOnInit() {

    this.selectPropiedad.details = new Detail();

    this.apipruebaServ.getPropiedades()
      .subscribe( resp => {
        this.lstPropiedades = resp;
        console.log(this.lstPropiedades);
        this.cantidadPropiedad = this.lstPropiedades.length;
        this.loadPropiedad(this.lstPropiedades[0]);
      });

  }

  loadPropiedad(propiedadSelec: Propiedad){
    this.selectPropiedad = propiedadSelec;

     this.center.lat = this.selectPropiedad.location.latitude;
     this.center.lng = this.selectPropiedad.location.longitude;

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
      info: 'Ubicacion de la propiedad ' ,
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    }

    this.apipruebaServ.getImages(this.selectPropiedad.helperid)
      .subscribe( resp => {
          this.images = resp.images;
      });
  }

  siguientePropiedad(){
    this.countNext = this.countNext+1;
    if(this.cantidadPropiedad > this.countNext ) {
      this.loadPropiedad(this.lstPropiedades[this.countNext]);
    } else {
      this.countNext = 0;
      this.loadPropiedad(this.lstPropiedades[this.countNext]);
    }
    
  }

  clickvermapa(){
    this.active =2;
  }

}








