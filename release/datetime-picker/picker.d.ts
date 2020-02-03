import { OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ElDataPicker } from '../date-picker/picker';
export declare class ElDataTimePicker extends ElDataPicker implements OnInit, OnDestroy, ControlValueAccessor {
    format: string;
    /**
     *
     * @param time
     */
    dateChangeHandle(time: number): void;
}
