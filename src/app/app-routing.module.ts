import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewClientComponent } from './new-client/new-client.component';
import { ListClientsComponent } from './list-clients/list-clients.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'nuevo-cliente',
    component: NewClientComponent
  },
  {
    path: 'listado-clientes',
    component: ListClientsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
