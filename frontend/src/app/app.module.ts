import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoiZG1jcGhhZGVuIiwiYSI6ImNreXg2dHphODBkdHAydXFrdXJiZmUwOTAifQ.XEIjDpMnbLwCmeb_FGOCVQ'    
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
