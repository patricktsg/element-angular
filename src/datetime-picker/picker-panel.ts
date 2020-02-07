import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core'
import { dropAnimation } from '../shared/animation'
import {ElDatePickerPanel} from '../date-picker/picker-panel';

@Component({
  selector: 'el-data-time-picker-panel',
  animations: [dropAnimation],
  styles: [' .el-picker-panel-absolute { position: absolute; } '],
  template: `
    <div [@dropAnimation]="show"
      [ngStyle]="{ width: width ? width + 'px' : 'auto', 'z-index': panelIndex}"
      [class]="'el-picker-panel el-date-picker '"
      [class.has-time]="showTime"
      [class.el-picker-panel-absolute]="panelAbsolute">
      <div class="time-wrapper" style="margin-top: 25px;">
        <ul style="display: table;padding: 0px;">
            <li style="display: table-cell;position: relative;padding-left: 20px;width: 125px;" class="hour-warpper">
                <label style="position: absolute;top: -27px;padding: 5px 1px;color:#5a5e66;font-weight: 400;border-bottom: solid 1px#e6ebf5;font-size: 12px;">Hour:</label>
                <el-select placeholder="Hour:" [model]="hour" size="mini" (modelChange)="onChangeHour($event)">
                    <div style="height: 300px;overflow-y: scroll">
                      <el-option *ngFor="let hour of hours"
                                 [label]="hour"
                                 [value]="hour">
                      </el-option>
                    </div>
                </el-select>
            </li>
            <li style="display: table-cell;position: relative;padding-left: 20px;width: 125px;" class="minute-warpper">
                <label style="position: absolute;top: -27px;padding: 5px 1px;color:#5a5e66;font-weight: 400;border-bottom: solid 1px#e6ebf5;font-size: 12px;">Minute:</label>
                <el-select placeholder="Minute:" [model]="minute" size="mini" (modelChange)="onChangeMinute($event)">
                    <div style="height: 300px;overflow-y: scroll">
                      <el-option style="height: 300px;overflow-y: scroll" *ngFor="let minute of minutes"
                                 [label]="minute"
                                 [value]="minute">
                      </el-option>
                    </div>
                </el-select>
            </li>
        </ul>
      </div>
      <div class="el-picker-panel__body-wrapper">
        <!--<div class="el-picker-panel__sidebar" *ngIf="shortcuts">-->
          <!--<button type="button" class="el-picker-panel__shortcut"-->
            <!--*ngFor="shortcut in shortcuts"-->
            <!--(click)="handleShortcutClick(shortcut)">-->
            <!--{{ shortcut.text }}-->
          <!--</button>-->
        <!--</div>-->
        <div class="el-picker-panel__body">
          <div class="el-date-picker__header">
            <button class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left"
              type="button" (click)="nextYear(-1)">
            </button>
            <button class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-arrow-left"
              type="button" (click)="nextMonth(-1)"
              *ngIf="currentView === 'date'">
            </button>
            
            <!--year label-->
            <span class="el-date-picker__header-label" *ngIf="currentView !== 'year'"
              (click)="showPicker('year')">{{dateShowModels.year}}</span>
            <!--year range label-->
            <span class="el-date-picker__header-label" *ngIf="currentView === 'year'">
              {{dateShowModels.yearRange[0]}} - {{dateShowModels.yearRange[1]}}
            </span>
            
            <span class="el-date-picker__header-label"
              [class.active]="currentView === 'month'"
              (click)="showPicker('month')"
              *ngIf="currentView === 'date'">{{montNames[dateShowModels.month]}}</span>
            <button class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right"
              type="button" (click)="nextYear(1)">
            </button>
            <button class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-arrow-right"
              type="button" (click)="nextMonth(1)"
              *ngIf="currentView === 'date'">
            </button>
          </div>

          <div class="el-picker-panel__content">
            <el-date-table *ngIf="currentView === 'date' && !hiddenDay"
              (modelChange)="datePickChangeHandle($event)"
              [model]="model">
            </el-date-table>
            <el-year-table *ngIf="currentView === 'year'"
              [model]="model"
              (modelChange)="yearPickChangeHandle($event)"
              [disabled-date]="disabledDate">
            </el-year-table>
            <el-month-table *ngIf="currentView === 'month'"
              [model]="model"
              (modelChange)="monthPickChangeHandle($event)"
              [disabled-date]="disabledDate">
            </el-month-table>
          </div>
        </div>
      </div>

      <!--<div class="el-picker-panel__footer" *ngIf="footerVisible && currentView === 'date'">-->
        <!--<a href="JavaScript:" class="el-picker-panel__link-btn" (click)="changeToNow()">556</a>-->
        <!--<button class="el-picker-panel__btn" type="button"-->
          <!--(click)="confirm()">667</button>-->
      <!--</div>-->
      <div class="time-footer-wrapper" style="float: right;padding: 0px 10px 10px 0px;">
          <el-button (click)="emitClose()" size="mini">Ok</el-button>    
      </div>
    </div>
  `
})
export class ElDateTimePickerPanel extends ElDatePickerPanel implements OnInit, OnChanges {

  @Output()
  closePanel : EventEmitter<any> = new EventEmitter();
  public hours: Array<string>;
  public minutes: Array<string>;
  public hour: string;
  public minute: string;

  /**
   * on Init implementation
   * @return void;
   */
  ngOnInit(): void {
    super.ngOnInit();
    this.hours = this.getTimeNumbers(23);
    this.minutes = this.getTimeNumbers(59);

    if(this.model) {
      this.setHourAndMinutesFromTime(this.model);
    }
  }


  /**
   * Event fired when the hours select changes.
   * @param value
   * @return void;
   */
  onChangeHour(value: string): void {
    this.hour = value;
    this.synchronizeHour();
  }

  /**
   * Event fired when the minutes select changes.
   * @param value
   * @return void;
   */
  onChangeMinute(value: string) : void {
    this.minute = value;
    this.synchronizeHour();
  }

  /**
   * Set the hour and minutes to the selected date.
   * @param maxNumber
   * @return void;
   */
  synchronizeHour() : void {
    if(! this.hour || !this.minute) {
        return;
    }

    const time = this.model ? new Date(this.model) : new Date();
    time.setHours(Number(this.hour));
    time.setMinutes(Number(this.minute));
    this.datePickChangeHandle(time.getTime());
  }

  /**
   * Get array of string values for the hours and minutes.
   * @param maxNumber
   * @return Array<string>
   */
  getTimeNumbers(maxNumber : number) : Array<string> {
    const numbers = new Array<string>();

    for(let i = 0; i <= maxNumber; i++) {
        if(i <= 9) {
            numbers.push('0' + i);
            continue;
        }

        numbers.push(String(i));
    }

    return numbers;
  }

  /**
   * Overwrite the date picker updateDate
   */
  updateDate(): void {
    super.updateDate();
  }

  /**
   * Overwrite the date picker event
   * @param time
   * @return void
   */
  datePickChangeHandle(time: number): void {
    this.setHourAndMinutesFromTime(time);
    super.datePickChangeHandle(time);
  }

  /**
   * Overwrite the date picker event
   * @param time
   * @return void
   */
  setHourAndMinutesFromTime(time: number): void {
    const date = new Date(time);

    if(! this.hour) {
        const hour = date.getHours() <= 9 ? '0' + date.getHours() : date.getHours();
        this.hour = String(hour);
    }

    if(! this.minute) {
        const minutes = date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes();
        this.minute = String(minutes);
    }
  }

  /**
   * Close the panel
   * @return void
   */
  emitClose() : void {
    this.closePanel.emit();
  }
}
