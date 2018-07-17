import { ScanData } from './../../models/scan-data.modal';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HistorialService } from '../../providers/historial/historial.service';


@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
})
export class HistorialPage {

  public historial : ScanData[];

  constructor(private hs: HistorialService) {
  }

  ionViewDidLoad() {
    this.historial = this.hs.get_historial();
    console.log('HistorialPage:{}',this.historial);

  }


  open_scan(index:number){
    this.hs.open_scan(index);
  }
}
