import { EventEmitter, OnChanges, OnInit } from '@angular/core';
import { ElDatePickerPanel } from '../date-picker/picker-panel';
export declare class ElDateTimePickerPanel extends ElDatePickerPanel implements OnInit, OnChanges {
    closePanel: EventEmitter<any>;
    hours: Array<string>;
    minutes: Array<string>;
    hour: string;
    minute: string;
    /**
     * on Init implementation
     * @return void;
     */
    ngOnInit(): void;
    /**
     * Event fired when the hours select changes.
     * @param value
     * @return void;
     */
    onChangeHour(value: string): void;
    /**
     * Event fired when the minutes select changes.
     * @param value
     * @return void;
     */
    onChangeMinute(value: string): void;
    /**
     * Set the hour and minutes to the selected date.
     * @param maxNumber
     * @return void;
     */
    synchronizeHour(): void;
    /**
     * Get array of string values for the hours and minutes.
     * @param maxNumber
     * @return Array<string>
     */
    getTimeNumbers(maxNumber: number): Array<string>;
    /**
     * Overwrite the date picker updateDate
     */
    updateDate(): void;
    /**
     * Overwrite the date picker event
     * @param time
     * @return void
     */
    datePickChangeHandle(time: number): void;
    /**
     * Overwrite the date picker event
     * @param time
     * @return void
     */
    setHourAndMinutesFromTime(time: number): void;
    /**
     * Close the panel
     * @return void
     */
    emitClose(): void;
}
