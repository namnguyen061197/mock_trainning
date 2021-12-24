import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { RecordService } from 'src/app/core/services/record.service';

@Component({
  selector: 'app-detail-record',
  templateUrl: './detail-record.component.html',
  styleUrls: ['./detail-record.component.scss']
})
export class DetailRecordComponent implements OnInit {
  public record$?:Observable<any>;
  public realRecord?:any;
  constructor(
    private route:ActivatedRoute,
    private recordService:RecordService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.record$ = this.route.paramMap
      .pipe(
        map(params => params.get('idRecord')),
        switchMap(id => this.recordService.getRecord(id))
      )

    this.record$.subscribe(data => {
      this.realRecord = Object.entries(data).map(item => {
        return {
          key: item[0],
          value: item[1]
        }
      })
      console.log(this.realRecord);

    })
  }
  onDeleteRecord(id:any){
    this.recordService.deleteRecord(id).subscribe(data => {
      this.router.navigateByUrl('/home')
    })
  }

}
