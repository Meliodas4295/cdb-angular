import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { HeaderModule } from './header/header.module';
import { ComputerModule } from './computer/computer.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomMaterialModule,
    HeaderModule,
    ComputerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
