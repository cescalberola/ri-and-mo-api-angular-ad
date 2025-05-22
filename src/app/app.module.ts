import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Módulos centrales y de routing
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

// Core & Shared
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

// Formularios y HTTP
import { ReactiveFormsModule } from '@angular/forms';

// Componentes raíz y de nivel aplicación
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { CharactersModule } from './features/characters/characters.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }), // si usas SSR
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    ReactiveFormsModule,
    CharactersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
