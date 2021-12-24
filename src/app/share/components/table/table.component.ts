import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { RecordService } from 'src/app/core/services/record.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public key:string = 'id';
  public reverse:boolean = false;
  public currentPage:number = 1;
  public listSearchForm:any;

  @Input() numberPerPage?:number;
  @Input() listColumnsName?:Array<any>;
  @Input() listRecord?:Array<any>
  @Output() handleFilterByField = new EventEmitter();
  @Output() handleDeleteRecord = new EventEmitter()

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
      .subscribe((data:any) => {
        this.handleFilterByField.emit({field: column.value, key: data})
      })
    })
  }

  sortByField(field:string):void{
    this.key = field;
    this.reverse = !this.reverse;
  }

  onDeleteRecord(id:any){
    this.handleDeleteRecord.emit(id)
  }

}
