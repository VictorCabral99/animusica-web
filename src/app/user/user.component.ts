import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Globals } from '../shared/globals';
import { Musica } from '../shared/models/musica.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  
  @ViewChild('player') player:ElementRef;
  @ViewChild('miniPlayer') playerController: ElementRef;
  tocando: boolean = false;
  playlistArray: Musica[] = [];
  indicePlaylist: number = 0;
  miniPlayerVisivel: Boolean;

  constructor(private userService: UserService, private globals: Globals) { }

  ngOnInit(): void {
    this.globals.visivelMiniPlayer.subscribe(data => this.miniPlayerVisivel = data);
    this.playlistArray = this.pegarMusicasLocais();
    if(this.playlistArray.length === 0)
      this.carregarPlaylistPeloId('1k0JrH1nKyVfzPw7E8hS');
  }

  playPause(tocar?:boolean){
    this.tocando = tocar || !this.tocando;
    
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
  
      this.playPause(this.tocando);
  }

  musicaAnterior(){
    this.indicePlaylist === 0 
      ? this.indicePlaylist = this.playlistArray.length - 1 
      : this.indicePlaylist--;
    
      this.playPause(this.tocando);
  }

  carregarPlaylistPeloId(id: string){
    this.userService.getMusicsByPlaylist(id).subscribe(res => this.salvarMusicasLocais(res));
  }
  
  salvarMusicasLocais(musicas: Musica[]){
    this.playlistArray = musicas
    localStorage.setItem("playlistData", JSON.stringify(musicas));
  }

  pegarMusicasLocais(): Musica[]{
    return JSON.parse(localStorage.getItem("playlistData")) || [];
  }

  onActivate(componentReference){
    componentReference.eventoPlayer?.subscribe((data) => this.carregarMusicaPeloId(data))
  }
  
  carregarMusicaPeloId(idMusica: string){
    this.userService.getMusicById(idMusica).subscribe(res =>{
       this.salvarMusicaLocal(res);
       this.indicePlaylist = 0;
       this.playPause(this.tocando);
    });
  }

  salvarMusicaLocal(musica: Musica){
    this.playlistArray.splice(0, 0, musica);
    localStorage.setItem("playlistData", JSON.stringify(this.playlistArray));
  }
}
