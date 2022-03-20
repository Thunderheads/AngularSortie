import {Sortie} from "./Sortie";
import {Ville} from "./Ville";

export class Lieu{

  private _idLieu : number;
  private _nom : string;
  private _rue : string;
  private _latitude : number;
  private _longitude : number;
  private _ville : Ville;
  private sorties : Sortie[];




  get idLieu(): number {
    return this._idLieu;
  }

  set idLieu(value: number) {
    this._idLieu = value;
  }

  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
  }

  get rue(): string {
    return this._rue;
  }

  set rue(value: string) {
    this._rue = value;
  }

  get latitude(): number {
    return this._latitude;
  }

  set latitude(value: number) {
    this._latitude = value;
  }

  get longitude(): number {
    return this._longitude;
  }

  set longitude(value: number) {
    this._longitude = value;
  }

  get ville(): Ville {
    return this._ville;
  }

  set ville(value: Ville) {
    this._ville = value;
  }



}
