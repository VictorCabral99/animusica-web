import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AnimeListComponent } from './user/anime-list/anime-list.component';
import { AnimeDetailComponent } from './user/anime-detail/anime-detail.component';
import { AdminComponent } from './admin/admin.component';

import { AnimeListService } from './user/anime-list/anime-list.service';
import { AnimeDetailService } from './user/anime-detail/anime-detail.service';
import { UserService } from './user/user.service'
import { RegisterService } from './register/register.service';

import { InsertAnimeComponent } from './admin/insert-anime/insert-anime.component';
import { InsertMusicComponent } from './admin/insert-music/insert-music.component';
import { EditMusicComponent } from './admin/edit-music/edit-music.component';
import { EditAnimeComponent } from './admin/edit-anime/edit-anime.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    UserComponent,
    AnimeListComponent,
    AnimeDetailComponent,
    AdminComponent,
    InsertAnimeComponent,
    InsertMusicComponent,
    EditMusicComponent,
    EditAnimeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule
  ],
  providers: [
    AnimeListService,
    AnimeDetailService,
    UserService,
    RegisterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
