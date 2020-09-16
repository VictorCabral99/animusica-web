import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Globals } from '../shared/globals';
import { Musica } from '../shared/models/musica.model';
@Injectable({
    providedIn: 'root'
  })

  export class UserService {
    constructor(private http: HttpClient, private globals: Globals) {}

    getMusicsByPlaylist(idPlaylist: string): Observable<Musica[]>{
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.get(this.globals.animeAPI+"/playlists/"+idPlaylist+"/musics", {headers}).pipe(map((response: Musica[])=> response));
    }

    getMusicById(idMusica: string): Observable<Musica> {
      const headers = new HttpHeaders().set("Content-Type", "application/json");
      return this.http.get(this.globals.animeAPI + "/musics/" + idMusica, {headers}).pipe(map((response: Musica) => response));
    }
  }