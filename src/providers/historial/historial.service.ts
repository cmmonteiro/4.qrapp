import { ScanData } from './../../models/scan-data.modal';
import { Injectable } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ModalController, Platform, ToastController } from 'ionic-angular';
import { MapaPage } from '../../pages/mapa/mapa';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';


@Injectable()
export class HistorialService {

  private _historial: ScanData[] = [];



  constructor(private iab: InAppBrowser, private modalCtrl: ModalController,
    private contacts: Contacts, private platform: Platform,
    private toastController: ToastController) {
    console.log('Hello HistorialService');

  }


  add_historial(info: string) {
    let historial = new ScanData(info);
    this._historial.unshift(historial);
    this.open_scan(0);
    console.log(this.get_historial());

  }

  get_historial() {
    return this._historial;
  }

  open_scan(index: number) {

    let scan = this._historial[index];
    switch (scan.tipo) {

      case "http":
        this.iab.create(scan.info, "_system");
        console.log("scaneando http"); break;


      case "mapa":
        this.modalCtrl.create(MapaPage, { coords: scan.info }).present();
        console.log("scaneando mapa");
        break;

      case "contacto":
        console.log("scaneando contacto");

        this.crear_contacto(scan.info);
        break;

      default:
        console.error("Tipo no soportado");
        break;
    }

  }

  crear_contacto(texto: string) {

    let campos: any = this.parse_vcard(texto);
    console.log(campos);
    let name = campos.fn;
    let tel = campos.tel[0].value[0];

    if (!this.platform.is('cordova')) {
      console.warn("Estoy en la computadora no puedo crear contacto.")
      return;

    };

    let contact: Contact = this.contacts.create();

    contact.name = new ContactName("null", name);
    contact.phoneNumbers = [new ContactField("mobile", tel)];

    contact.save()
      .then(() => this.crear_toast("Contacto" + name + "creado!"),
        (error) => this.crear_toast("Error" + error));

  }



  private crear_toast(mensaje: string) {
    this.toastController.create({ message: mensaje, duration: 2500 }).present();
  }

  private parse_vcard(input: string) {

    var Re1 = /^(version|fn|title|org):(.+)$/i;
    var Re2 = /^([^:;]+);([^:]+):(.+)$/;
    var ReKey = /item\d{1,2}\./;
    var fields = {};

    input.split(/\r\n|\r|\n/).forEach(function (line) {
      var results, key;

      if (Re1.test(line)) {
        results = line.match(Re1);
        key = results[1].toLowerCase();
        fields[key] = results[2];
      } else if (Re2.test(line)) {
        results = line.match(Re2);
        key = results[1].replace(ReKey, '').toLowerCase();

        var meta = {};
        results[2].split(';')
          .map(function (p, i) {
            var match = p.match(/([a-z]+)=(.*)/i);
            if (match) {
              return [match[1], match[2]];
            } else {
              return ["TYPE" + (i === 0 ? "" : i), p];
            }
          })
          .forEach(function (p) {
            meta[p[0]] = p[1];
          });

        if (!fields[key]) fields[key] = [];

        fields[key].push({
          meta: meta,
          value: results[3].split(';')
        })
      }
    });

    return fields;
  };

}
