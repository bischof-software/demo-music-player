import {Pipe, PipeTransform} from '@angular/core';
import {formatDate} from "@angular/common";

@Pipe({
    name: 'duration',
    standalone: true,
    pure: true
})
export class DurationPipe implements PipeTransform {
    transform = (duration: number): string => formatDate(duration * 1000, 'mm:ss', 'de-DE');

}
