import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

  coords: any;
  lat:any;
  long:any;

  constructor(private viewCtrl: ViewController, public navParams: NavParams) {
    this.coords = this.navParams.get('coords');
    let coodrArray = this.coords.split(",");
    this.lat  = coodrArray[0].replace("geo:","");
    this.long = coodrArray[1];

  }

  ionViewDidLoad() {
  
  }

  close_modal() {
    this.viewCtrl.dismiss();
  }
}