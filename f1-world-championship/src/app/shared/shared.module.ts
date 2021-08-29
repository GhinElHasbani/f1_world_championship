import { ModuleWithProviders, NgModule } from '@angular/core';
import { ComponentsModule } from './modules/components.module';
import { InterceptorsModule } from './modules/interceptors.module';
import { ServicesModule } from './modules/services.module';

@NgModule({
  imports: [ComponentsModule],
  exports: [
    ComponentsModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        ServicesModule.forShared(),
        InterceptorsModule.forShared()
      ]
    };
  }
}
