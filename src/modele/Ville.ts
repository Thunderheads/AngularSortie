import {Lieu} from "./Lieu";

export class Ville{

  private _idVille : number;
  private _nom : string;
  private _codePostal : string;
  private lieux : Lieu[];


  get idVille(): number {
    return this._idVille;
  }

  set idVille(value: number) {
    this._idVille = value;
  }

  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
  }

  get codePostal(): string {
    return this._codePostal;
  }

  set codePostal(value: string) {
    this._codePostal = value;
  }

}
