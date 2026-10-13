import { ModuleWithProviders, NgModule } from "@angular/core";
import {
  FROALA_EDITOR_CONFIG,
  FroalaEditorConfig,
} from "./editor/editor.config";
import { FroalaEditorModule } from "./editor/editor.module";
import { FroalaViewModule } from "./view/view.module";

@NgModule({
  imports: [FroalaEditorModule, FroalaViewModule],
  exports: [FroalaEditorModule, FroalaViewModule],
})
export class FERootModule {
  public static forRoot(
    config: FroalaEditorConfig = {},
  ): ModuleWithProviders<FERootModule> {
    return {
      ngModule: FERootModule,
      providers: [{ provide: FROALA_EDITOR_CONFIG, useValue: config }],
    };
  }
}
