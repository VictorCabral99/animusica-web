import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimeDetailService } from './anime-detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Anime } from 'src/app/shared/models/anime.model';
import { Musica } from 'src/app/shared/models/musica.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-anime-detail',
  templateUrl: './anime-detail.component.html',
  styleUrls: ['./anime-detail.component.css']
})
export class AnimeDetailComponent implements OnInit{

  constructor(private animeDetailService: AnimeDetailService, private router: Router, private route: ActivatedRoute) { }

  @ViewChild("title") titulo: ElementRef;

  idAnime: string;
  anime: Anime;
  musicasPorTemporada$: Observable<Musica[]>[] = [];
  
  ngOnInit() {
    this.idAnime = this.route.snapshot.params['id'];
    if(this.idAnime){
      this.animeDetailService.getAnimeDetailsById(this.idAnime).subscribe(res => {
        this.anime = res;
        this.titulo.nativeElement.style.fontSize = this.reduzirTamanhoFonteTitulo(this.anime.nome) + "px";
      });
    } else {
      this.router.navigate(['user']);
    }
  }

  mostrarMusicas(ev, temporada){
    let dropdownMenu = ev.target.nextElementSibling.querySelector('.music-list'); 
    if(dropdownMenu.children.length == 0){
      this.musicasPorTemporada$[temporada] = this.animeDetailService.getMusicsByAnimeSeason(this.anime.id, temporada);
    }
    this.tratarListaMusica(dropdownMenu.classList);    
  }

  reduzirTamanhoFonteTitulo(nome: string){
    let tamanhoFontePadrao = 36;
    let quantidadeDeLinhas = Math.floor(nome.length/12);
    if(quantidadeDeLinhas > 1){
      const porcentagemTamanhoIdeal = 100 - (10 * quantidadeDeLinhas);
      let tamanhoFonte  = tamanhoFontePadrao * (porcentagemTamanhoIdeal / 100);
      return tamanhoFonte;
    }
    return tamanhoFontePadrao;
  }

  tratarListaMusica(elemento: any) {
    elemento.contains('close') ? elemento.remove('close') : elemento.add('close');
  }
}