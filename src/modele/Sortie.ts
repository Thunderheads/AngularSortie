// creation d'un classe sortie pour stocker les options selectionnées dans un objet de type sortie

import {Etat} from "./Etat";
import {Campus} from "./Campus";
import {Lieu} from "./Lieu";
import {Participant} from "./Participant";
import {ISortie} from "./interface/ISortie";

export class Sortie implements ISortie{

  private _id : number;
  private _nom : string;
  private _dateHeureDebut : Date;
  private _duree : number;
  private _dateLimiteInscription : Date;
  private _nbInscriptionsMax : number;
  private _infosSortie : string;
  private _etat : Etat;
  private _campus : Campus;
  private _lieu : Lieu;
  private _organisateur : Participant;
  //TODO gerer la liste des participants
  private _participants : Participant[];



  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
  }

  get dateHeureDebut(): Date {
    return this._dateHeureDebut;
  }

  set dateHeureDebut(value: Date) {
    this._dateHeureDebut = value;
  }

  get duree(): number {
    return this._duree;
  }

  set duree(value: number) {
    this._duree = value;
  }

  get dateLimiteInscription(): Date {
    return this._dateLimiteInscription;
  }

  set dateLimiteInscription(value: Date) {
    this._dateLimiteInscription = value;
  }

  get nbInscriptionsMax(): number {
    return this._nbInscriptionsMax;
  }

  set nbInscriptionsMax(value: number) {
    this._nbInscriptionsMax = value;
  }

  get infosSortie(): string {
    return this._infosSortie;
  }

  set infosSortie(value: string) {
    this._infosSortie = value;
  }

  get etat(): Etat {
    return this._etat;
  }

  set etat(value: Etat) {
    this._etat = value;
  }

  get campus(): Campus {
    return this._campus;
  }

  set campus(value: Campus) {
    this._campus = value;
  }

  get lieu(): Lieu {
    return this._lieu;
  }

  set lieu(value: Lieu) {
    this._lieu = value;
  }

  get organisateur(): Participant {
    return this._organisateur;
  }

  set organisateur(value: Participant) {
    this._organisateur = value;
  }




}

