import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { RecordService } from 'src/app/core/services/record.service';
import { IColumnName } from 'src/app/interfaces/ICoumnName';
import { Irecord } from 'src/app/interfaces/IRecord';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public numberPerPage:number = 10;
  public totalRecords!:number ;
  public listRecord?:Array<Irecord>;
  public listColumnsName:Array<IColumnName>;

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
    this.recordService.params.sortField = 'id'

    this.recordService.paramSubject.subscribe(res => {
      this.recordService.getRecordByField(res).subscribe(data => {
        this.listRecord = data
      })

      this.recordService.getRecordByField({...res,limit:'', currentPage:''}).subscribe(totalData => {
        this.totalRecords = totalData?.length;
      })
    })
  }

  onChange(event:any):void {
    this.recordService.params.limit = event.target.value;
    this.recordService.paramSubject.next(this.recordService.params)
  }

  handleFilterByField(event:any){
    this.recordService.params.searchFields.push(event);
    this.recordService.paramSubject.next(this.recordService.params)
  }

  handleDeleteRecord(id:number){
    this.recordService.deleteRecord(id).subscribe(data => {
      this.recordService.paramSubject.next(this.recordService.params)
    })
  }

  handleSortByField(event:any){
    this.recordService.params = {
      ...this.recordService.params,
      sortField: event.key,
      order: event.order
    }
    this.recordService.paramSubject.next(this.recordService.params)
  }

  handleChangePage(event:any){
    this.recordService.params = {
      ...this.recordService.params,
      currentPage:event
    }
    this.recordService.paramSubject.next(this.recordService.params)
  }

}
