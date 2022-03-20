import {Sortie} from "./Sortie";
import {Campus} from "./Campus";

export class Participant{

  private _idParticipant : number;
  private _nom : string;
  private _prenom : string;
  private _telephone : string;
  private _mail : string;
  private _motPasse : string;
  private _actif : string
  private _campus : Campus;
  private lstSortieInscrit : Sortie[];
  private lstSortieOragnisees : Sortie[];



  get idParticipant(): number {
    return this._idParticipant;
  }

  set idParticipant(value: number) {
    this._idParticipant = value;
  }

  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
  }

  get prenom(): string {
    return this._prenom;
  }

  set prenom(value: string) {
    this._prenom = value;
  }

  get telephone(): string {
    return this._telephone;
  }

  set telephone(value: string) {
    this._telephone = value;
  }

  get mail(): string {
    return this._mail;
  }

  set mail(value: string) {
    this._mail = value;
  }

  get motPasse(): string {
    return this._motPasse;
  }

  set motPasse(value: string) {
    this._motPasse = value;
  }

  get actif(): string {
    return this._actif;
  }

  set actif(value: string) {
    this._actif = value;
  }

  get campus(): Campus {
    return this._campus;
  }

  set campus(value: Campus) {
    this._campus = value;
  }
}
