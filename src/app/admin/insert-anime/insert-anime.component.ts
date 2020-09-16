import { Component, OnInit } from '@angular/core';
import { Anime } from 'src/app/shared/models/anime.model';

@Component({
  selector: 'app-insert-anime',
  templateUrl: './insert-anime.component.html',
  styleUrls: ['./insert-anime.component.css']
})
export class InsertAnimeComponent implements OnInit {

  caminhoImagem;
  imgURL: any;
  mensagem: string;
  novoAnime: Anime;
  
  constructor() { }

  ngOnInit(): void {
  }

  previsualizarImagem(file){
    if(file.length === 0){
      return;
    }

    var mimeType = file[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.mensagem = "Apenas imagens são permitidas."
      return;
    }

    var reader = new FileReader();
    this.caminhoImagem = file;
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  salvarAnime(ev){
    ev.preventDefault();
    if(this.validarFormulario()){
      this.persistirAnimeNoFirebase().then((idAnime) => {
        console.log(idAnime);
      })
    }
  }

  validarFormulario(): boolean{
    return true;
  }

  async persistirAnimeNoFirebase(): Promise<string>{
    return "id"
  }
}
