import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Globals } from '../../shared/globals';
import { Anime } from '../../shared/models/anime.model';
import { Musica } from '../../shared/models/musica.model';

@Injectable({
    providedIn: 'root'
})
export class AnimeDetailService {
    constructor(private http: HttpClient, private globals: Globals) {}

    getAnimeDetailsById(idAnime: string): Observable<Anime>{
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.get(this.globals.animeAPI+"/animes/"+idAnime, {headers}).pipe(map((response: Anime)=> response));
    }

    getMusicsByAnimeSeason(idAnime: string, season: number): Observable<Musica[]>{
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.get(this.globals.animeAPI+"/animes/"+idAnime+"/season/"+season+"/musics", {headers}).pipe(map((response: Musica[])=> response));
    }
}