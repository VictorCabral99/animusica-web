import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AnimeDetailService } from './anime-detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Anime } from 'src/app/shared/models/anime.model';
import { Musica } from 'src/app/shared/models/musica.model';
import { Observable } from 'rxjs';
import { Globals } from 'src/app/shared/globals';

@Component({
  selector: 'app-anime-detail',
  templateUrl: './anime-detail.component.html',
  styleUrls: ['./anime-detail.component.css']
})
export class AnimeDetailComponent implements OnInit{

  constructor(private animeDetailService: AnimeDetailService, private router: Router, private route: ActivatedRoute, private globals: Globals) { }

  @Output() eventoPlayer: EventEmitter<any> = new EventEmitter();

  @ViewChild("title") titulo: ElementRef;

  anime: Anime;
  musicasPorTemporada$: Observable<Musica[]>[] = [];
  tamanhoFonte: number = 36;
  miniPlayerVisivel: Boolean;
  
  ngOnInit() {
    this.globals.visivelMiniPlayer.subscribe(data => this.miniPlayerVisivel = data);
    const idAnime = this.pegarParametroDaUrl("id")
    
    idAnime
      ? this.carregarAnimePeloId(idAnime) 
      : this.router.navigate(['user']);
  }
  
  pegarParametroDaUrl(nomeParametro: string): string{
    return this.route.snapshot.params[nomeParametro]
  }

  carregarAnimePeloId(idAnime: string): void{
    this.animeDetailService.getAnimeDetailsById(idAnime).subscribe(res => {
      this.salvarAnime(res)
      this.reduzirTamanhoFonteTitulo(this.anime.nome)
    });
  }
  
  salvarAnime(dadosAnime: Anime){
    this.anime = dadosAnime;
  }

  reduzirTamanhoFonteTitulo(nome: string): void{
    let quantidadeDeLinhas = Math.floor(nome.length / 12);
  
    if(quantidadeDeLinhas > 1){
      const porcentagemTamanhoIdeal = 100 - (10 * quantidadeDeLinhas);
      this.tamanhoFonte  = this.tamanhoFonte * (porcentagemTamanhoIdeal / 100);
      
      this.definirTamanhoFonteTitulo(this.tamanhoFonte)
    }
  }

  definirTamanhoFonteTitulo(tamanhoFonte: number){
    this.titulo.nativeElement.style.fontSize = tamanhoFonte + "px";
  }  

  mostrarMusicas(ev, temporada){
    let dropdownMenu = ev.target.nextElementSibling.querySelector('.music-list'); 
    if(dropdownMenu.children.length == 0){
      this.musicasPorTemporada$[temporada] = this.animeDetailService.getMusicsByAnimeSeason(this.anime.id, temporada);
    }
    this.controleVisibilidadeListaMusica(dropdownMenu.classList);    
  }

  controleVisibilidadeListaMusica(elemento: any) {
    elemento.contains('close') ? elemento.remove('close') : elemento.add('close');
  }

  tocarMusica(idMusica: any){
    this.globals.visivelMiniPlayer.next(true);
    this.eventoPlayer.emit(idMusica)
  }
}