import { Routes } from '@angular/router'

import { AuthenticationComponent } from './authentication/authentication.component';
import { AdminComponent } from './admin/admin.component';
import { InsertAnimeComponent } from './admin/insert-anime/insert-anime.component';
import { EditAnimeComponent } from './admin/edit-anime/edit-anime.component';
import { InsertMusicComponent } from './admin/insert-music/insert-music.component';
import { EditMusicComponent } from './admin/edit-music/edit-music.component';

import { UserComponent } from './user/user.component';
import { AnimeListComponent } from './user/anime-list/anime-list.component';
import { AnimeDetailComponent } from './user/anime-detail/anime-detail.component';

export const ROUTES: Routes = [
    { path: '', component:AuthenticationComponent, pathMatch: 'full' },
    { path: 'user', component: UserComponent,
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: AnimeListComponent },
            { path: 'detail/:id', component: AnimeDetailComponent },
        ]
    },
    { path: 'admin', component: AdminComponent,
        children: [
            { path: 'anime', redirectTo: 'anime/insert', pathMatch: 'full' },
            { path: 'anime/insert', component: InsertAnimeComponent },
            { path: 'anime/edit', component: EditAnimeComponent },
            { path: 'music', redirectTo: 'music/insert', pathMatch: 'full' },
            { path: 'music/insert', component: InsertMusicComponent },
            { path: 'music/edit', component: EditMusicComponent }
        ]
    },
    { path: 'login', component: AuthenticationComponent },
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
]