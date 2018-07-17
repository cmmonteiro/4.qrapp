import { StatusBar } from '@ionic-native/status-bar';


export class ScanData{

info:string; //vamos a almacenar lo que nos devuelve al scanear el qr
tipo:string; //define si escanee un mapa o card,, etc


  constructor(texto:string){

    this.tipo = "No definido";
    this.info = texto;
    if(texto.startsWith("http")){
      this.tipo = "http"
    }
  }
}
