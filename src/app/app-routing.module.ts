import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontPageComponent } from './shared/components/front-page/front-page.component';
import { CircuitosComponent } from './shared/components/circuitos/circuitos.component';
import { PilotosComponent } from './shared/components/pilotos/pilotos.component';
import { TemporadasComponent } from './shared/components/temporadas/temporadas.component';
import { EscuderiasComponent } from './shared/components/escuderias/escuderias.component';

const routes: Routes = [
  {path:'', component: FrontPageComponent},
  {path:'circuitos', component: CircuitosComponent},
  {path:'pilotos', component: PilotosComponent},
  {path:'temporadas', component: TemporadasComponent},
  {path:'escuderias', component: EscuderiasComponent},
  {path:'**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
