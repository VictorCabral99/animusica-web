import { Component, OnInit, ViewChild, ElementRef, DebugEventListener } from '@angular/core';
import { Musica } from '../shared/models/musica.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  
  @ViewChild('player') player:ElementRef;
  tocando: boolean = false;
  playlistArray: Musica[] = [];
  indicePlaylist: number = 0;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.playlistArray = this.pegarMusicasLocais();
    
    if(!this.playlistArray)
      this.carregarPlaylistPeloId('1k0JrH1nKyVfzPw7E8hS');
  }

  playPause(){
    this.tocando = !this.tocando;
    
    this.tocando 
      ? this.iniciarMusica(this.playlistArray[this.indicePlaylist].urlMusica) 
      : this.pausarMusica();

  }

  iniciarMusica(url?){
    if(this.player.nativeElement.src != url){
      this.player.nativeElement.src = url
    } 
    this.player.nativeElement.play();
  }

  pausarMusica(){
    this.player.nativeElement.pause();
  }

  proximaMusica(){
    this.indicePlaylist === this.playlistArray.length - 1
      ? this.indicePlaylist = 0 
      : this.indicePlaylist++;
  
    this.iniciarMusica(this.playlistArray[this.indicePlaylist].urlMusica);
  }

  musicaAnterior(){
    this.indicePlaylist === 0 
      ? this.indicePlaylist = this.playlistArray.length - 1 
      : this.indicePlaylist--;
    
    this.iniciarMusica(this.playlistArray[this.indicePlaylist].urlMusica);
  }

  carregarPlaylistPeloId(id: string){
    this.userService.getMusicsByPlaylist(id).subscribe(res => this.salvarMusicasLocais(res));
  }
  
  salvarMusicasLocais(musicas: Musica[]){
    this.playlistArray = musicas
    localStorage.setItem("playlistData", JSON.stringify(musicas));
  }

  pegarMusicasLocais(): Musica[]{
    return JSON.parse(localStorage.getItem("playlistData"));
  }
}
