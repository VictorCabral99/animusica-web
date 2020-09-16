import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-insert-anime',
  templateUrl: './insert-anime.component.html',
  styleUrls: ['./insert-anime.component.css']
})
export class InsertAnimeComponent implements OnInit {

  caminhoImagem;
  imgURL: any;
  mensagem: string;
  
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

}
