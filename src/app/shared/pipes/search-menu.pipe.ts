import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchMenu'
})
export class SearchMenuPipe implements PipeTransform {

  transform(menu: any[], searchTerm: string): any[] {
    return menu.filter((ele) => ele.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
  }

}
