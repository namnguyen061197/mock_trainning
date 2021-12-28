import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, switchMap } from 'rxjs';
import { RecordService } from 'src/app/core/services/record.service';

@Component({
  selector: 'app-detail-record',
  templateUrl: './detail-record.component.html',
  styleUrls: ['./detail-record.component.scss']
})
export class DetailRecordComponent implements OnInit {
  public record:any;
  public realRecord?:any;
  constructor(
    private route:ActivatedRoute,
    private recordService:RecordService,
    private router:Router,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        const idRecord = params.get('idRecord');
        this.recordService.getRecord(idRecord).subscribe(
          data => {
            this.record = data;
            this.realRecord = Object.entries(data).map(item => new Object({key:item[0],value:item[1]}));

          },
          (err:any) => {
            this.toastrService.error('Get detail record failed !');
            setTimeout(() => {
              this.router.navigateByUrl('')
            },2000)
          }
        )
      }
    )
  }

  onDeleteRecord(id:any){
    this.recordService.deleteRecord(id).subscribe(data => {
      this.router.navigateByUrl('/home')
    })
  }

}
