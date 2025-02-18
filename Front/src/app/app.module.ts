import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // Correctement importé ici

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { EntreprisesComponent } from './pages/entreprises/entreprises.component';
import { EntreprisesService } from './pages/entreprises/entreprises-service.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    
    EntreprisesComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule // Ajouté ici dans imports, et non dans declarations
  ],
  providers: [
    provideClientHydration(),
    EntreprisesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
