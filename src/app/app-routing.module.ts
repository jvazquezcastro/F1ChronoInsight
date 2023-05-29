import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { FrontPageComponent } from './shared/components/front-page/front-page.component';
import { CircuitosComponent } from './shared/components/circuitos/circuitos.component';
import { PilotosComponent } from './shared/components/pilotos/pilotos.component';
import { TemporadasComponent } from './shared/components/temporadas/temporadas.component';
import { EscuderiasComponent } from './shared/components/escuderias/escuderias.component';
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';
import { TranslationService } from './services/traduccion.service';

const routes: Routes = [
  {path:'', component: FrontPageComponent},
  {path:'circuitos', component: CircuitosComponent},
  {path:'pilotos', component: PilotosComponent},
  {path:'temporadas', component: TemporadasComponent},
  {path:'escuderias', component: EscuderiasComponent},
  {path:'**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router, private translationService: TranslationService) {
    this.router.events.subscribe(() => {
      const language = this.router.url.split('/')[1]; // Obtener el idioma de la URL

      if (language !== '') {
        this.translationService.setLanguage(language);
      }
    });
  }
 }
