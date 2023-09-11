import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchMeneByCat'
})
export class SearchMeneByCatPipe implements PipeTransform {

  transform(menu: any[], searchTearm: string): any[] {
    return menu.filter((ele) => ele.category.toLowerCase().startsWith(searchTearm.toLowerCase()));
  }

}
