import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Propiedad } from '../models/propiedad.model';
import { map, delay } from 'rxjs/operators';
import { Image } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class ApiPruebaService {

  constructor(private http: HttpClient) { }

  private url = 'https://rtfe-test-default-rtdb.firebaseio.com/';

  getPropiedades() {
    return this.http.get<Propiedad[]>(`${ this.url }/properties.json`).pipe(
      map( this.crearArreglo ),
      delay(0)
    );
  }

  getImages(id: number){
    return this.http.get<Image>(`${ this.url }/property_images/${id}.json`);
  }


  private crearArreglo( propiedadObj: any ) {

    const propiedades: Propiedad[] = [];

    Object.keys( propiedadObj ).forEach( (key: any) => {

      if(!isNaN(+key)){
        const propiedad: Propiedad = propiedadObj[key];
        propiedad.helperid = key;
        propiedades.push(propiedad);
      }
    });

    return propiedades;

  }
}
