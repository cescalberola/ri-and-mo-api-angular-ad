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
import { AdminPanelComponent } from './features/admin-panel/admin-panel.component';
import { CharactersListComponent } from './features/characters/characters-list/characters-list.component';
import { CharacterDetailComponent } from './features/characters/character-detail/character-detail.component';
import { LoginComponent } from './features/login/login.component';
import { UserPanelComponent } from './features/user-panel/user-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminPanelComponent,
    UserPanelComponent,
    CharactersListComponent,
    CharacterDetailComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }), // si usas SSR
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
