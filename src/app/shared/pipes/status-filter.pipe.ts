import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'statusFilter' })
export class StatusFilterPipe implements PipeTransform {
  transform(items: any[], status: string): any[] {
    if (!status) return items;
    return items.filter(x => x.status === status);
  }
}
