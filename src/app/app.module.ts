import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule} from "../routing/app-routing.module";
import { CreerSortieComponent } from './creer-sortie/creer-sortie.component';
import { AnnulerSortieComponent } from './annuler-sortie/annuler-sortie.component';
import { ModifierSortieComponent } from './modifier-sortie/modifier-sortie.component';
import { AfficherSortieComponent } from './afficher-sortie/afficher-sortie.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SortieData} from "../api/sortie.data";
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreerSortieComponent,
    AnnulerSortieComponent,
    ModifierSortieComponent,
    AfficherSortieComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [SortieData],
  bootstrap: [AppComponent]
})
export class AppModule { }
