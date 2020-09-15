import { Component } from '@angular/core';
import { Globals } from './shared/globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'animusica';

  constructor(private globals: Globals){
    this.globals.animeAPI = "http://localhost:8080"
  }
}
