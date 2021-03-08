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

  // Url de la API 
  private url = 'https://rtfe-test-default-rtdb.firebaseio.com/';

  // Retorna todas las propiedades
  getPropiedades() {
    return this.http.get<Propiedad[]>(`${this.url}/properties.json`).pipe(
      map(this.crearArrayProperty),
      delay(0)
    );
  }

  // Retorna todas las imagenes de una propiedad
  getImages(id: number) {
    return this.http.get<Image>(`${this.url}/property_images/${id}.json`);
  }


  private crearArrayProperty(propiedadObj: any) {

    const lstProperty: Propiedad[] = [];

    Object.keys(propiedadObj).forEach((key: any) => {

      if (!isNaN(+key)) {
        const propiedad: Propiedad = propiedadObj[key];
        propiedad.helperid = key;
        lstProperty.push(propiedad);
      }
    });

    return lstProperty;

  }
}
