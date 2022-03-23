/**
 * Interface en charge de typer les données reçues
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

