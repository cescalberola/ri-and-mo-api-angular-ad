import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
  imports: [
    HttpClientModule    // para HttpClient
  ],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class CoreModule {
  // evita doble importación
  constructor(@Optional() @SkipSelf() parent?: CoreModule) {
    if (parent) {
      throw new Error('CoreModule ya fue cargado. Importar sólo en AppModule');
    }
  }
}
