import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ElInputsModule } from '../input/module'
import { ElDataTimePicker } from './picker'
import {ElDateModule} from '../date-picker/module';
import {ElDateTimePickerPanel} from './picker-panel';
import {ElRowModule} from '../row/module';
import {ElColModule} from '../col/module';
import {ElSelectModule} from '../select/module';
import {ElButtonsModule} from '../button/module';

@NgModule({
  declarations: [ElDataTimePicker, ElDateTimePickerPanel],
  exports: [ElDataTimePicker, ElDateTimePickerPanel],
  imports: [CommonModule, FormsModule,ElInputsModule, ElButtonsModule, ElDateModule, ElRowModule, ElColModule, ElSelectModule],
  entryComponents: [ElDataTimePicker],
})
export class ElDateTimeModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: ElDateTimeModule, providers: [] }
  }
}
