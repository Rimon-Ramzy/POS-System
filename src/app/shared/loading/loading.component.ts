import { Component, OnInit } from '@angular/core';
import { CasherService } from 'src/app/casher/casher.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  isStoring!: boolean;

  constructor(private casherService: CasherService) { }

  ngOnInit(): void {
    this.casherService.isStoring.subscribe(
      (response: any) => {
        this.isStoring = response;
      }
    )
  }

}
