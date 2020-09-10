import { Routes } from '@angular/router'

import { AuthenticationComponent } from './authentication/authentication.component';
import { AdminComponent } from './admin/admin.component';
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
    { path: 'admin', component: AdminComponent },
    { path: 'login', component: AuthenticationComponent },
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
]