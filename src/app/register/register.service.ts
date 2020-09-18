import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Globals } from '../shared/globals';
import { Usuario } from '../shared/models/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    constructor(private http: HttpClient, private globals: Globals) { }

    postUsuario(usuario: Usuario) {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.post(`${this.globals.animeAPI}/user/register`,  usuario, { headers });
    }
}