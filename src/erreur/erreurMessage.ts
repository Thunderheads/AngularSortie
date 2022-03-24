import {Injectable} from "@angular/core";
import {AbstractControl, ValidatorFn} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
/**
 * Service contenant la liste des messages d'erreurs personnalisées pour chaque champs.
 * Ici on met a disposition uniquement des getter et pas de setter
 */
export class ErreurMessage{


  private _validationNameMsg  = {
    // clé => valeur (message d'erreur)
    'required' :'Entrez un nom à votre sortie',
    'minlength' : 'Le nom doit faire au moins 8 caractères'
  };


  /**
   * Fonction en charge de renvoyer la liste des messages d'erreurs pré-définits pour le nom.
   */
  get validationNameMsg(): { minlength: string; required: string } {
    return this._validationNameMsg;
  }



  public compareDate() : ValidatorFn{

    // key de type string
    return (c : AbstractControl) : {[key:string] : boolean} | null => {

      if((this.toTimestamp(c.value) < Date.now())){
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
