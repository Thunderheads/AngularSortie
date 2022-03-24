import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ISortie} from "../../modele/interface/ISortie";
import {ILieu} from "../../modele/interface/ILieu";

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    }
  )
};

@Injectable({
  providedIn: 'root'
})

export class LieuData {

  constructor(private http: HttpClient) { }

  /**
   * fonction en charge de requeter l'api symfony pour en extraire toute les lieux
   * @param url
   */
  public getLieux(url: string): Observable<ILieu> {

    return this.http.get<ILieu>(url, httpOptions)
  }

  /**
   * fonction en charge de requeter l'api symfony pour en extraire un lieu
   * @param url
   */
  public getLieu(url: string): Observable<ILieu> {

    return this.http.get<ILieu>(url, httpOptions)
  }
}
