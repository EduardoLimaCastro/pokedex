import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeFormFeed',
  standalone: true
})
export class RemoveFormFeedPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/\f/g, '');
  }

}
