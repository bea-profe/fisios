
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
//import { HeaderComponent } from './common-component/header/header.component';
//import { SidebarComponent } from './common-component/sidebar/sidebar.component';
//import { RouterModule } from '@angular/router';

import { MAT_DATE_LOCALE } from '@angular/material/core';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

// Registra el idioma español
registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    
   // HeaderComponent,
   //SidebarComponent,
  // FormsModule,
  // RouterModule,
  ],
  imports: [
    BrowserModule,
   
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
  ],
  providers: [ 
    { provide: MAT_DATE_LOCALE, useValue: 'es' }, // Establece el idioma por defecto para los datepickers
    { provide: LOCALE_ID, useValue: 'es' } // Establece el idioma por defecto para formatear las fechas
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
