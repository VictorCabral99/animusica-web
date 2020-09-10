import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    UserComponent,
    AnimeListComponent,
    AnimeDetailComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule
  ],
  providers: [
    AnimeListService,
    AnimeDetailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
