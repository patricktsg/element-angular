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
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateFormat } from '../date-picker/utils/format';
import { ElDataPicker } from '../date-picker/picker';
var ElDataTimePicker = /** @class */ (function (_super) {
    __extends(ElDataTimePicker, _super);
    function ElDataTimePicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.format = 'yyyy-MM-dd hh:mm';
        return _this;
    }
    /**
     *
     * @param {?} time
     * @return {?}
     */
    ElDataTimePicker.prototype.dateChangeHandle = function (time) {
        _super.prototype.dateChangeHandle.call(this, time);
        this.showPanelPicker = true;
    };
    ElDataTimePicker.decorators = [
        { type: Component, args: [{
                    selector: 'el-datetime-picker',
                    providers: [{
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return ElDataPicker; }),
                            multi: true
                        }, DateFormat],
                    template: "\n    <div (click)=\"propagationHandle($event)\">\n      <el-input [class]=\"'el-date-editor ' + 'el-date-editor--' + type\"\n        [readonly]=\"!editable || readonly\"\n        [elDisabled]=\"elDisabled\"\n        [size]=\"size\" [placeholder]=\"placeholder\"\n        [icon]=\"iconShowClose ? 'close' : 'date'\"\n        [model]=\"model\"\n        (icon-click)=\"iconClickHandle($event)\"\n        (modelChange)=\"changeHandle($event)\"\n        (icon-mouseenter)=\"iconMouseActionHandle(true)\"\n        (icon-mouseleave)=\"iconMouseActionHandle(false)\"\n        (focus)=\"focusHandle()\">\n      </el-input>\n      <el-data-time-picker-panel *ngIf=\"showPanelPicker\" [show]=\"showPanelPicker\"  [hidden-day]=\"hiddenDay\"\n        [panel-absolute]=\"panelAbsolute\" [panel-index]=\"panelIndex\" [width]=\"panelWidth\"\n        [model]=\"value\" (modelChange)=\"dateChangeHandle($event)\" (closePanel)=\"showPanelPicker = false\" >\n      </el-data-time-picker-panel>\n    </div>\n  ",
                },] },
    ];
    /**
     * @nocollapse
     */
    ElDataTimePicker.ctorParameters = function () { return []; };
    ElDataTimePicker.propDecorators = {
        'format': [{ type: Input },],
    };
    return ElDataTimePicker;
}(ElDataPicker));
export { ElDataTimePicker };
function ElDataTimePicker_tsickle_Closure_declarations() {
    /** @type {?} */
    ElDataTimePicker.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElDataTimePicker.ctorParameters;
    /** @type {?} */
    ElDataTimePicker.propDecorators;
    /** @type {?} */
    ElDataTimePicker.prototype.format;
}
//# sourceMappingURL=picker.js.map