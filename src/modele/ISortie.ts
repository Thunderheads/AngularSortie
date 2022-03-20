/**
 * Interface en charge de typer les données reçu
 */
export interface ISortie {

  id : number,
  nom : string,
  dateHeureDebut : Date,
  duree : number,
  dateLimiteInscription : Date,
  nbInscriptionsMax : number,
  infosSortie : string,

}

