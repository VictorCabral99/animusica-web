import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AnimeListService } from './anime-list.service';
import { Anime } from '../../shared/models/anime.model';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css']
})
export class AnimeListComponent implements OnInit {

  animes: Anime[] = [];
  erro: string = 'null';

  @ViewChild('fakeInput') fakeInput: ElementRef;
  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('listAnimes') listAnimes: ElementRef;

  constructor(private animeListService: AnimeListService) { }

  ngOnInit() {
    this.animeListService.getAllAnimes().subscribe(res => {
      this.animes = res;
    }, (error) => {
      this.erro = error;
    });
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
