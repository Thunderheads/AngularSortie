import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ModifierSortieComponent } from 'src/app/sortie/modifier-sortie/modifier-sortie.component';


@Injectable({
  providedIn: 'root'
})
export class SortieGuard implements CanDeactivate<ModifierSortieComponent> {
  canDeactivate(component: ModifierSortieComponent): boolean {
    // si un élément du formulaire est renseigné
    if(component.sortieForm.dirty){
      const sortieName = (component.sortieForm.get('nom'))!.value
      return confirm(`Voulez-vous annuler les changements effectués sur ${sortieName} ?`)
    }
    return true;
  }

}
