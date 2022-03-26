import {Injectable} from "@angular/core";
import {AbstractControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
/**
 * Service contenant la liste des messages d'erreurs personnalisées pour chaque champs.
 * Ici on met a disposition uniquement des getter et pas de setter
 */
export class ErreurMessage{

  // ATTRIBUTS
  private _validationNameMsg  = {
    // clé => valeur (message d'erreur)
    'required' :'Entrez un nom à votre sortie',
    'minlength' : 'Le nom doit faire au moins 8 caractères'
  };


  private _validationDateMsg = {
    'dateError' : 'veuillez indiquer une date supérieur à la date du jour'
  }

  private _validationNbInscriptionsMax ={
    'min' : 'le nombre minimum d\' inscription est de 1',
    'max' : 'le nombre de participants ne peut excéder 1000',
    'required' : 'Veuillez indiquer un nombre de participant'
  }
  private _validationCodePostal = {
    'required' : 'Veuillez indiquer un code postal',
    'pattern' : 'code postal incorrect'
  }

  // GETTER
  get validationNameMsg(): { minlength: string; required: string } {
    return this._validationNameMsg;
  }

  get validationDateMsg(): { dateError: string } {
    return this._validationDateMsg;
  }

  get validationNbInscriptionsMax(): { min: string; max: string; required: string } {
    return this._validationNbInscriptionsMax;
  }

  get validationCodePostal(): { pattern: string; required: string } {
    return this._validationCodePostal;
  }



  //FONCTIONS

  /**
   * Fonction en charge d'attribuer un message d'erreur
   *
   * @param val
   * @param value
   */
  public setMessage(val : AbstractControl, value : {} ) : string {

      if((val.touched || val.dirty) && val.errors){
        // permet de recuperer les clés des erreurs génerées
        //console.log(this.validationErrorsMessages['required'])
        // ma façon :
        // dans object.key a la position 0 on a le type d'erreur renvoyée (à chaque fois on renvoie une seul erreur donc ça changera pas elle sera toujours a la position 0)
        // le as any est nécessaire sinon on peut pas accéder à l'erreur correspondante dans le tableau crée plus haut
        // ainsi recuperer la clé nous donne accés à la valeur indexée dans le tableau qu'on stocke dans errorMsg
        return (value as any)[Object.keys(val.errors)[0]];
      }
      return "";
  }



  /**
   * Fonction en charge de vérifier que la valeur de type date à contrôler
   * se situe après la date du jour.
   * @returns string : bolean or null
   */
  public compareDate() : ValidatorFn {

    // key de type string
    return (c : AbstractControl) : {[key:string] : boolean} | null => {

      // Date.now renvoit un Timestamp, d'ou l'utilisation du toTimestamp sur la value
      // ajout de la condition c.value === "" car sans ça si la date est initialisée à "" ça ne genère pas d'erreur et le formulaire s'envoie bien ( ce qui devrait pas etre possible)
      if((this.toTimestamp(c.value) < Date.now() || c.value === "" )){
        return{ "dateError" : true}
      }
      return null;
    };
  }

  /**
   * Fonction en charge de transformer une date en timestamp (les millisecondes sont comprises
   * car Date.now les prend en compte aussi
   * En private car utilisée au sein de la classe
   * @param strDate
   */
  private toTimestamp(strDate : any){
    let datum = Date.parse(strDate);
    return datum;
  }



}
