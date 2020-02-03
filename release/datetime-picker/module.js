import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElInputsModule } from '../input/module';
import { ElDataTimePicker } from './picker';
import { ElDateModule } from '../date-picker/module';
import { ElDateTimePickerPanel } from './picker-panel';
import { ElRowModule } from '../row/module';
import { ElColModule } from '../col/module';
import { ElSelectModule } from '../select/module';
import { ElButtonsModule } from '../button/module';
var ElDateTimeModule = /** @class */ (function () {
    function ElDateTimeModule() {
    }
    /**
     * @return {?}
     */
    ElDateTimeModule.forRoot = function () {
        return { ngModule: ElDateTimeModule, providers: [] };
    };
    ElDateTimeModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ElDataTimePicker, ElDateTimePickerPanel],
                    exports: [ElDataTimePicker, ElDateTimePickerPanel],
                    imports: [CommonModule, FormsModule, ElInputsModule, ElButtonsModule, ElDateModule, ElRowModule, ElColModule, ElSelectModule],
                    entryComponents: [ElDataTimePicker],
                },] },
    ];
    /**
     * @nocollapse
     */
    ElDateTimeModule.ctorParameters = function () { return []; };
    return ElDateTimeModule;
}());
export { ElDateTimeModule };
function ElDateTimeModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ElDateTimeModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ElDateTimeModule.ctorParameters;
}
//# sourceMappingURL=module.js.map