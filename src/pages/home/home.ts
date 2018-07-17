import { HistorialService } from './../../providers/historial/historial.service';
import { Component } from '@angular/core';
import { NavController, ToastController, Platform } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private barcodeScanner: BarcodeScanner,
    private toastCtrl:ToastController,
    private platform:Platform,
    private historialService: HistorialService
  ) {}

  scan(){
    console.log("Realizando Scan...");
    if(!this.platform.is('cordova')){
      this.historialService.add_historial("http://www.google.com");
    }
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data: ', barcodeData);

    if(barcodeData.text != null){

      this.historialService.add_historial(barcodeData.text);
    }

     }).catch(err => {
        console.log('Error: ', err);
        this.mostrar_error('Error: '+err);
     });

  }

  mostrar_error(err:string){
    let toast = this.toastCtrl.create({
      message: err,
      duration: 3000
    });
    toast.present();
  }

}
