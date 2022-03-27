import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {ISortie} from "../../modele/interface/ISortie";
import {IUser} from "../../modele/interface/IUser";

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

export class UserData {

  constructor(private http: HttpClient) { }

  /**
   * Fonction en charge de recuperer un utilisateur
   * @param url
   */
  public getUser(url: string): Observable<IUser> {

    return this.http.get<IUser>(url)
  }
}
