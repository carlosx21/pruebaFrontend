import { Detail } from "./detail.model";
import { Maplocation } from "./maplocation.model";

export class Propiedad {
   public address!: string;
   public currency!: string;
   public description!: string;
   public id!: number;
   public price!: number;
   public tags!: string[] ;
   public title!: string;
   public details!: Detail;
   public location!: Maplocation; 
   public helperid!: number;
}