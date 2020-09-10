import { Component, OnInit } from '@angular/core';
import { AnimeDetailService } from './anime-detail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Anime } from 'src/app/shared/models/anime.model';
import { Musica } from 'src/app/shared/models/musica.model';

@Component({
  selector: 'app-anime-detail',
  templateUrl: './anime-detail.component.html',
  styleUrls: ['./anime-detail.component.css']
})
export class AnimeDetailComponent implements OnInit {

  constructor(private animeDetailService: AnimeDetailService, private router: Router, private route: ActivatedRoute) { }

  idAnime: string;
  anime: Anime;
  musicas: Musica[];
  ngOnInit() {
    this.idAnime = this.route.snapshot.params['id'];
    if(this.idAnime){
      this.animeDetailService.getAnimeDetailsById(this.idAnime).subscribe(res => {
        this.anime = res.anime;
        this.musicas = res.musicas;
      });
    } else {
      this.router.navigate(['user/list']);
    }
  }

  mostrarMusicas(ev){
    let dropdownMenu = ev.target.nextElementSibling.querySelector('.music-list'); 
    let estaFechado = dropdownMenu.classList.contains('close');
    estaFechado ? dropdownMenu.classList.remove('close') : dropdownMenu.classList.add('close')
  }
}
