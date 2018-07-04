import { Component } from '@angular/core';
import { NavController, ToastController, Platform } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private barcodeScanner: BarcodeScanner, private toastCtrl:ToastController, private platform:Platform) {}

  scan(){
    console.log("Realizando Scan...");
    if(!this.platform.is('cordova')){
      return;
    }
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data: ', barcodeData);
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
