import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "../app/home/home.component";
import {AppComponent} from "../app/app.component";
import {CreerSortieComponent} from "../app/creer-sortie/creer-sortie.component";
import {ModifierSortieComponent} from "../app/modifier-sortie/modifier-sortie.component";
import {AfficherSortieComponent} from "../app/afficher-sortie/afficher-sortie.component";
import {AnnulerSortieComponent} from "../app/annuler-sortie/annuler-sortie.component";
import { DetailSortieComponent } from 'src/app/detail-sortie/detail-sortie.component';

const routes: Routes =[
  //chemin d'accès aux différents composants
  // quand le chemin est vide on redirige vers le composant home
  { path : "", component: AppComponent},
  { path : 'home', component : HomeComponent},
  { path : 'sortie/creer', component : CreerSortieComponent},
  { path : 'sortie/modifier/:id', component : ModifierSortieComponent},
  { path : 'sortie/detail/:id', component : DetailSortieComponent },
  { path : 'sortie/annuler', component : AnnulerSortieComponent},
  { path : 'sortie/afficher', component : AfficherSortieComponent},
  { path : '**', redirectTo : 'home', pathMatch: 'full' }
];



@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})

export class AppRoutingModule{ }

