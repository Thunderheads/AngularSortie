import {Injectable} from "@angular/core";
import {AbstractControl, FormGroup, ValidatorFn} from "@angular/forms";
import { debounceTime } from "rxjs";

@Injectable({
  providedIn: 'root'
})
/**
 * Service contenant la liste des messages d'erreurs personnalisées pour chaque champs.
 * Ici on met a disposition uniquement des getter et pas de setter
 */
export class ErreurMessage{

  // Associer un message à chaque champs de formulaire
  // public errorMsg : string;
  private errorMsg = {
    'name' : "",
  }


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


  /**
   * Fonction permetant de controler le nom dans le formulaire et d'afficher un message
   * @param name
   */
  public formControlName(name : AbstractControl) : string {
    name.valueChanges.pipe(
      //permet de définir un temps avant de lancer la suite
      debounceTime(1000)
    ).subscribe( val  => {
      return this.setMessage(name, 'name');
    });
    return "";
  }

  /**
   * Fonction en charge d'attribuer un message d'erreur
   * @param val // champ à contrôler
   * @param errorKey // clé du truc qui ressemble à un tableau s'appellant errorMsg
   * @private
   */
     private setMessage(val : AbstractControl, errorKey : string) : string {
      //(this.errorMsg as any)[errorKey] ="";
      if((val.touched || val.dirty) && val.errors){
        // permet de recuperer les clés des erreurs génerées
        //console.log(this.validationErrorsMessages['required'])
        // ma façon :
        // dans object.key a la position 0 on a le type d'erreur renvoyée (à chaque fois on renvoie une seul erreur donc ça changera pas elle sera toujours a la position 0)
        // le as any est nécessaire sinon on peut pas accéder à l'erreur correspondante dans le tableau crée plus haut
        // ainsi recuperer la clé nous donne accés à la valeur indexée dans le tableau qu'on stocke dans errorMsg
        return (this.validationNameMsg as any)[Object.keys(val.errors)[0]];
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
