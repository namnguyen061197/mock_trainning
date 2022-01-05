import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { RecordService } from 'src/app/core/services/record.service';
import { IColumnName } from 'src/app/interfaces/ICoumnName';
import { Irecord } from 'src/app/interfaces/IRecord';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public key:string = 'id';
  public reverse:boolean = false;
  public currentPage:number = 1;
  public listSearchForm!:Array<FormControl> | any;

  @Input() numberPerPage!:number;
  @Input() listColumnsName!:Array<IColumnName>;
  @Input() listRecord?:Array<Irecord>
  @Input() totalItems!:number;
  @Output() handleFilterByField = new EventEmitter();
  @Output() handleDeleteRecord = new EventEmitter();
  @Output() handleSortByField = new EventEmitter();
  @Output() handleChangePage = new EventEmitter()

  constructor() {
  }

  ngOnInit(): void {
    // create formcontrol of searchform colum
    this.listSearchForm = this.listColumnsName?.reduce(
      (first,second) => ({ ...first, [second.value] : new FormControl() }), {}
    );

    // valueChanges event of searchform
    this.listColumnsName?.forEach((column) => {
      this.listSearchForm[column.value].valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((data:IFilterField) => {
        this.handleFilterByField.emit({field: column.value, key: data})
      })
    })
  }

  sortByField(field:string):void{
    this.reverse = !this.reverse;
    this.handleSortByField.emit({key:field, order: this.reverse ? 'desc' : 'asc'})
  }

  onDeleteRecord(id:number){
    this.handleDeleteRecord.emit(id)
  }

  onHandleChangePage(event:number){
    this.currentPage = event
    this.handleChangePage.emit(event)
  }

}

interface IFilterField {
  field: any,
  key:any
}
