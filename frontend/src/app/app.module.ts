import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import { HttpClientModule } from '@angular/common/http';

import { environment } from './../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapbox_token
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
