import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "../app/sortie/home/home.component";
import {AppComponent} from "../app/app.component";
import {CreerSortieComponent} from "../app/sortie/creer-sortie/creer-sortie.component";
import {ModifierSortieComponent} from "../app/sortie/modifier-sortie/modifier-sortie.component";
import {AfficherSortieComponent} from "../app/sortie/afficher-sortie/afficher-sortie.component";
import {AnnulerSortieComponent} from "../app/sortie/annuler-sortie/annuler-sortie.component";
import { DetailSortieComponent } from 'src/app/sortie/detail-sortie/detail-sortie.component';
import {LoginComponent} from "../app/login/login.component";
import {SortieComponent} from "../app/sortie/sortie.component";

const routes: Routes =[
  //chemin d'accès aux différents composants
  // quand le chemin est vide on redirige vers le composant home
 // { path : "root", component: AppComponent},
  { path : "login", component: LoginComponent},
  { path : "sortie" , component : SortieComponent, children : [
      { path : 'home', component : HomeComponent},
      { path : 'creer', component : CreerSortieComponent},
      { path : 'modifier/:id', component : ModifierSortieComponent},
      { path : 'detail/:id', component : DetailSortieComponent },
      { path : 'annuler', component : AnnulerSortieComponent},
      { path : 'afficher', component : AfficherSortieComponent},
    ]},
  //{ path : '**', redirectTo : 'sortie/home', pathMatch: 'full' }
];



@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports : [RouterModule]
})

export class AppRoutingModule{ }

