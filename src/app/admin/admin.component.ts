import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  menuVisivel: boolean = false;

  ngOnInit(): void {
  }

  toggleMenu(): void {
    this.menuVisivel = !this.menuVisivel;
  }
}
