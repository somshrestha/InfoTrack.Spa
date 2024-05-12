import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { SearchHistoryComponent } from './search-history/search-history.component';

export const routes: Routes = [
    { path: '', component: SearchComponent, pathMatch: 'full'},
    { path: 'history', component: SearchHistoryComponent, pathMatch: 'full'},
];
