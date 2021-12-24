import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { RecordService } from 'src/app/core/services/record.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public numberPerPage:number = 10;
  public listRecord?:Array<any>;
  public listColumnsName:Array<any>;

  constructor(private recordService:RecordService) {
    this.listColumnsName = [
      {
        name:'Id',
        value:'id'
      },
      {
        name:'Date',
        value:'Date'
      },
      {
        name:'Region Name',
        value:'RegionName'
      },
      {
        name:'Area',
        value:'Area'
      },
      {
        name:'Average Price',
        value:'AveragePrice'
      },
      {
        name:'Index',
        value:'Index'
      },
      {
        name:'Sales Volume',
        value:'SalesVolume'
      },
      {
        name:'Detached Price',
        value:'DetachedPrice'
      },
      {
        name:'Detached Index',
        value:'DetachedIndex'
      }
    ]
  }

  ngOnInit(): void {
    this.recordService.getListRecord().subscribe(
      res => {
        this.listRecord = res
      },
      err => {
        console.log(err);
      }
    )
  }

  onChange(event:any):void {
    this.numberPerPage = event.target.value;
  }

  handleFilterByField(event:any){
    this.recordService.getRecordByField(event.field, event.key).subscribe(
      res => this.listRecord = res,
      err => console.log(err)
    )
  }

  handleDeleteRecord(id:number){
    this.recordService.deleteRecord(id).subscribe(data => {
      this.ngOnInit()
    })
  }

}
