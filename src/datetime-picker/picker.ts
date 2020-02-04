import {Component, forwardRef, Input, OnDestroy, OnInit, Renderer2} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { DateFormat } from '../date-picker/utils/format'
import {ElDataPicker} from '../date-picker/picker';

@Component({
  selector: 'el-datetime-picker',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ElDataPicker),
    multi: true
  }, DateFormat],
  template: `
    <div (click)="propagationHandle($event)">
      <el-input [class]="'el-date-editor ' + 'el-date-editor--' + type"
        [readonly]="!editable || readonly"
        [elDisabled]="elDisabled"
        [size]="size" [placeholder]="placeholder"
        [icon]="iconShowClose ? 'close' : 'date'"
        [model]="model"
        (icon-click)="iconClickHandle($event)"
        (modelChange)="changeHandle($event)"
        (icon-mouseenter)="iconMouseActionHandle(true)"
        (icon-mouseleave)="iconMouseActionHandle(false)"
        (focus)="focusHandle()">
      </el-input>
      <el-data-time-picker-panel *ngIf="showPanelPicker" [show]="showPanelPicker"  [hidden-day]="hiddenDay"
        [panel-absolute]="panelAbsolute" [panel-index]="panelIndex" [width]="panelWidth"
        [model]="value" (modelChange)="dateChangeHandle($event)" (closePanel)="showPanelPicker = false" >
      </el-data-time-picker-panel>
    </div>
  `,
})
export class ElDataTimePicker extends ElDataPicker implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() format: string = 'yyyy-MM-dd hh:mm';

  /**
   *
   * @param time
   */
  dateChangeHandle(time: number): void {
      super.dateChangeHandle(time);
      this.showPanelPicker = true
  }
}
