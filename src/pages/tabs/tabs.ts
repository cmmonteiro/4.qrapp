import { HomePage, HistorialPage } from '../index.paginas';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  historial:any = HistorialPage;
  scan:any = HomePage;

  constructor() {
  }


}
