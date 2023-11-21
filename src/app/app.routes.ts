import {Route} from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'webplayer',
        pathMatch: 'full'
    },
    {
        path: 'webplayer',
        title: 'Webplayer',
        loadComponent: () =>
            import('./playlist/playlist.component').then((m) => m.PlaylistComponent),
    },
    {
        path: '**',
        redirectTo: 'webplayer',
    },
];
