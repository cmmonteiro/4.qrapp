import { ScanData } from './../../models/scan-data.modal';
import { Injectable } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Injectable()
export class HistorialService {

  private _historial:ScanData[] =[];


  constructor(private iab : InAppBrowser) {
    console.log('Hello HistorialService');
  }


  add_historial(info: string){
    let historial = new ScanData(info);
    this._historial.unshift(historial);
    this.open_scan(0);
    console.log(this.get_historial());

  }

  get_historial(){
    return this._historial;
  }

  open_scan(index:number){

    let scan = this._historial[index];
    switch(scan.tipo){

      case "http":
        this.iab.create(scan.info, "_system");
      break;


      case "mapa":
          console.log("scan mapa");
      break;

      default:
        console.error("Tipo no soportado");
      break;


    }



  }

}
