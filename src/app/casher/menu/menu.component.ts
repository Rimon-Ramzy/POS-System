import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { CasherService } from '../casher.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isStoring!: boolean;
  constructor(private casherService: CasherService, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    if (this.casherService.getArrOfMenu().length < 1) {
      this.casherService.isStoring.next(true);
    }
    this.dataStorageService.fetchMenu().subscribe(
      (response: any) => {
        this.casherService.isStoring.next(false);
      }
    );
  }
}
