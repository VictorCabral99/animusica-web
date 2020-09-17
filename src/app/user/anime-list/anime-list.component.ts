import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { AnimeListService } from './anime-list.service';
import { Anime } from '../../shared/models/anime.model';
import { Globals } from 'src/app/shared/globals';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css']
})
export class AnimeListComponent implements OnInit {

  animes: Anime[] = [];
  erro: string = 'null';
  miniPlayerVisivel: Boolean;

  @ViewChild('fakeInput') fakeInput: ElementRef;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('listAnimes') listAnimes: ElementRef;

  constructor(private animeListService: AnimeListService, private globals: Globals) { }

  ngOnInit() {
    this.globals.visivelMiniPlayer.subscribe(data => this.miniPlayerVisivel = data);
    this.animeListService.getAllAnimes().subscribe(res => this.animes = res);
  }

  filtrarAnime(ev){
    this.animes.filter(function(x){
      if(x.nome.toLowerCase().indexOf(ev.target.value.toLowerCase()) > -1){
        x.visivel = false;
      } else {
        x.visivel = true;
      }
    });
  }

  esconderCampo(ev){
    this.fakeInput.nativeElement.style.display = "block";
    this.searchInput.nativeElement.style.display = "none";
  }

  mostrarCampo(ev){
    this.fakeInput.nativeElement.style.display = "none";
    this.searchInput.nativeElement.style.display = "block";
    this.searchInput.nativeElement.focus();
  }

}
