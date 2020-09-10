import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Globals } from '../../shared/globals';
import { Anime } from '../../shared/models/anime.model';

@Injectable({
  providedIn: 'root'
})
export class AnimeListService {
  constructor(private http: HttpClient, private globals: Globals) {}
    getAllAnimes(): Observable<Anime[]>{
      const headers = new HttpHeaders().set("Content-Type", "application/json");
      return this.http.get(this.globals.animeAPI+"/animes", {headers}).pipe(map((response: Anime[])=> response));
    }
}
