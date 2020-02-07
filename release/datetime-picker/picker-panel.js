var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, EventEmitter, Output } from '@angular/core';
import { dropAnimation } from '../shared/animation';
import { ElDatePickerPanel } from '../date-picker/picker-panel';
var ElDateTimePickerPanel = /** @class */ (function (_super) {
    __extends(ElDateTimePickerPanel, _super);
    function ElDateTimePickerPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.closePanel = new EventEmitter();
        return _this;
    }
    /**
     * on Init implementation
     * @return {?} void;
     */
    ElDateTimePickerPanel.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.hours = this.getTimeNumbers(23);
        this.minutes = this.getTimeNumbers(59);
        if (this.model) {
            this.setHourAndMinutesFromTime(this.model);
        }
    };
    /**
     * Event fired when the hours select changes.
     * @param {?} value
     * @return {?} void;
     */
    ElDateTimePickerPanel.prototype.onChangeHour = function (value) {
        this.hour = value;
        this.synchronizeHour();
    };
    /**
     * Event fired when the minutes select changes.
     * @param {?} value
     * @return {?} void;
     */
    ElDateTimePickerPanel.prototype.onChangeMinute = function (value) {
        this.minute = value;
        this.synchronizeHour();
    };
    /**
     * Set the hour and minutes to the selected date.
     * @return {?} void;
     */
    ElDateTimePickerPanel.prototype.synchronizeHour = function () {
        if (!this.hour || !this.minute) {
            return;
        }
        var /** @type {?} */ time = this.model ? new Date(this.model) : new Date();
        time.setHours(Number(this.hour));
        time.setMinutes(Number(this.minute));
        this.datePickChangeHandle(time.getTime());
    };
    /**
     * Get array of string values for the hours and minutes.
     * @param {?} maxNumber
     * @return {?} Array<string>
     */
    ElDateTimePickerPanel.prototype.getTimeNumbers = function (maxNumber) {
        var /** @type {?} */ numbers = new Array();
        for (var /** @type {?} */ i = 0; i <= maxNumber; i++) {
            if (i <= 9) {
                numbers.push('0' + i);
                continue;
            }
            numbers.push(String(i));
        }
        return numbers;
    };
    /**
     * Overwrite the date picker updateDate
     * @return {?}
     */
    ElDateTimePickerPanel.prototype.updateDate = function () {
        _super.prototype.updateDate.call(this);
    };
    /**
     * Overwrite the date picker event
     * @param {?} time
     * @return {?} void
     */
    ElDateTimePickerPanel.prototype.datePickChangeHandle = function (time) {
        this.setHourAndMinutesFromTime(time);
        _super.prototype.datePickChangeHandle.call(this, time);
    };
    /**
     * Overwrite the date picker event
     * @param {?} time
     * @return {?} void
     */
    ElDateTimePickerPanel.prototype.setHourAndMinutesFromTime = function (time) {
        var /** @type {?} */ date = new Date(time);
        if (!this.hour) {
            var /** @type {?} */ hour = date.getHours() <= 9 ? '0' + date.getHours() : date.getHours();
            this.hour = String(hour);
        }
        if (!this.minute) {
            var /** @type {?} */ minutes = date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes();
            this.minute = String(minutes);
        }
    };
    /**
     * Close the panel
     * @return {?} void
     */
    ElDateTimePickerPanel.prototype.emitClose = function () {
        this.closePanel.emit();
    };
    ElDateTimePickerPanel.decorators = [
        { type: Component, args: [{
                    selector: 'el-data-time-picker-panel',
                    animations: [dropAnimation],
                    styles: [' .el-picker-panel-absolute { position: absolute; } '],
                    template: "\n    <div [@dropAnimation]=\"show\"\n      [ngStyle]=\"{ width: width ? width + 'px' : 'auto', 'z-index': panelIndex}\"\n      [class]=\"'el-picker-panel el-date-picker '\"\n      [class.has-time]=\"showTime\"\n      [class.el-picker-panel-absolute]=\"panelAbsolute\">\n      <div class=\"time-wrapper\" style=\"margin-top: 25px;\">\n        <ul style=\"display: table;padding: 0px;\">\n            <li style=\"display: table-cell;position: relative;padding-left: 20px;width: 125px;\" class=\"hour-warpper\">\n                <label style=\"position: absolute;top: -27px;padding: 5px 1px;color:#5a5e66;font-weight: 400;border-bottom: solid 1px#e6ebf5;font-size: 12px;\">Hour:</label>\n                <el-select placeholder=\"Hour:\" [model]=\"hour\" size=\"mini\" (modelChange)=\"onChangeHour($event)\">\n                    <div style=\"height: 300px;overflow-y: scroll\">\n                      <el-option *ngFor=\"let hour of hours\"\n                                 [label]=\"hour\"\n                                 [value]=\"hour\">\n                      </el-option>\n                    </div>\n                </el-select>\n            </li>\n            <li style=\"display: table-cell;position: relative;padding-left: 20px;width: 125px;\" class=\"minute-warpper\">\n                <label style=\"position: absolute;top: -27px;padding: 5px 1px;color:#5a5e66;font-weight: 400;border-bottom: solid 1px#e6ebf5;font-size: 12px;\">Minute:</label>\n                <el-select placeholder=\"Minute:\" [model]=\"minute\" size=\"mini\" (modelChange)=\"onChangeMinute($event)\">\n                    <div style=\"height: 300px;overflow-y: scroll\">\n                      <el-option style=\"height: 300px;overflow-y: scroll\" *ngFor=\"let minute of minutes\"\n                                 [label]=\"minute\"\n                                 [value]=\"minute\">\n                      </el-option>\n                    </div>\n                </el-select>\n            </li>\n        </ul>\n      </div>\n      <div class=\"el-picker-panel__body-wrapper\">\n        <!--<div class=\"el-picker-panel__sidebar\" *ngIf=\"shortcuts\">-->\n          <!--<button type=\"button\" class=\"el-picker-panel__shortcut\"-->\n            <!--*ngFor=\"shortcut in shortcuts\"-->\n            <!--(click)=\"handleShortcutClick(shortcut)\">-->\n            <!--{{ shortcut.text }}-->\n          <!--</button>-->\n        <!--</div>-->\n        <div class=\"el-picker-panel__body\">\n          <div class=\"el-date-picker__header\">\n            <button class=\"el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left\"\n              type=\"button\" (click)=\"nextYear(-1)\">\n            </button>\n            <button class=\"el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-arrow-left\"\n              type=\"button\" (click)=\"nextMonth(-1)\"\n              *ngIf=\"currentView === 'date'\">\n            </button>\n\n            <!--year label-->\n            <span class=\"el-date-picker__header-label\" *ngIf=\"currentView !== 'year'\"\n              (click)=\"showPicker('year')\">{{dateShowModels.year}}</span>\n            <!--year range label-->\n            <span class=\"el-date-picker__header-label\" *ngIf=\"currentView === 'year'\">\n              {{dateShowModels.yearRange[0]}} - {{dateShowModels.yearRange[1]}}\n            </span>\n\n            <span class=\"el-date-picker__header-label\"\n              [class.active]=\"currentView === 'month'\"\n              (click)=\"showPicker('month')\"\n              *ngIf=\"currentView === 'date'\">{{montNames[dateShowModels.month]}}</span>\n            <button class=\"el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right\"\n              type=\"button\" (click)=\"nextYear(1)\">\n            </button>\n            <button class=\"el-picker-panel__icon-btn el-date-picker__next-btn el-icon-arrow-right\"\n              type=\"button\" (click)=\"nextMonth(1)\"\n              *ngIf=\"currentView === 'date'\">\n            </button>\n          </div>\n\n          <div class=\"el-picker-panel__content\">\n            <el-date-table *ngIf=\"currentView === 'date' && !hiddenDay\"\n              (modelChange)=\"datePickChangeHandle($event)\"\n              [model]=\"model\">\n            </el-date-table>\n            <el-year-table *ngIf=\"currentView === 'year'\"\n              [model]=\"model\"\n              (modelChange)=\"yearPickChangeHandle($event)\"\n              [disabled-date]=\"disabledDate\">\n            </el-year-table>\n            <el-month-table *ngIf=\"currentView === 'month'\"\n              [model]=\"model\"\n              (modelChange)=\"monthPickChangeHandle($event)\"\n              [disabled-date]=\"disabledDate\">\n            </el-month-table>\n          </div>\n        </div>\n      </div>\n\n      <!--<div class=\"el-picker-panel__footer\" *ngIf=\"footerVisible && currentView === 'date'\">-->\n        <!--<a href=\"JavaScript:\" class=\"el-picker-panel__link-btn\" (click)=\"changeToNow()\">556</a>-->\n        <!--<button class=\"el-picker-panel__btn\" type=\"button\"-->\n          <!--(click)=\"confirm()\">667</button>-->\n      <!--</div>-->\n      <div class=\"time-footer-wrapper\" style=\"float: right;padding: 0px 10px 10px 0px;\">\n          <el-button (click)=\"emitClose()\" size=\"mini\">Ok</el-button>\n      </div>\n    </div>\n  "
                },] },
    ];
    /**
     * @nocollapse
     */
    ElDateTimePickerPanel.ctorParameters = function () { return []; };
    ElDateTimePickerPanel.propDecorators = {
        'closePanel': [{ type: Output },],
    };
    return ElDateTimePickerPanel;
}(ElDatePickerPanel));
export { ElDateTimePickerPanel };
function ElDateTimePickerPanel_tsickle_Closure_declarations() {
    /** @type {?} */
    ElDateTimePickerPanel.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElDateTimePickerPanel.ctorParameters;
    /** @type {?} */
    ElDateTimePickerPanel.propDecorators;
    /** @type {?} */
    ElDateTimePickerPanel.prototype.closePanel;
    /** @type {?} */
    ElDateTimePickerPanel.prototype.hours;
    /** @type {?} */
    ElDateTimePickerPanel.prototype.minutes;
    /** @type {?} */
    ElDateTimePickerPanel.prototype.hour;
    /** @type {?} */
    ElDateTimePickerPanel.prototype.minute;
}
//# sourceMappingURL=picker-panel.js.map