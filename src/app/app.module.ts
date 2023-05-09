import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { FrontPageComponent } from './shared/components/front-page/front-page.component';
import { MaterialModule } from './material.module';
import { TemporadasComponent } from './shared/components/temporadas/temporadas.component';
import { EscuderiasComponent } from './shared/components/escuderias/escuderias.component';
import { PilotosComponent } from './shared/components/pilotos/pilotos.component';
import { CircuitosComponent } from './shared/components/circuitos/circuitos.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FrontPageComponent,
    TemporadasComponent,
    EscuderiasComponent,
    PilotosComponent,
    CircuitosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[]
})
export class AppModule {
}