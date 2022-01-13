import { DecimalPipe, Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { distinctUntilChanged } from 'rxjs';
import { RecordService } from 'src/app/core/services/record.service';

@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.scss']
})
export class CreateRecordComponent implements OnInit {
  public recordForm!: FormGroup;
  public idRecord:string = ''
  public isEditMode:boolean = false;
  // public decimalPattern = /^\d*\.\d+$/;
  public canLeavePage:boolean = false;
  public listGroupFields = [
    {
      RegionName:'Greater Manchester',
      Area:'NorthWest',
      AreaCode:'E11000001'
    },
    {
      RegionName:'Merseyside',
      Area:'NorthWest',
      AreaCode:'E11000002'
    },
    {
      RegionName:'South Yorkshire',
      Area:'North',
      AreaCode:'E11000003'
    },
    {
      RegionName:'Tyne and Wear',
      Area:'North',
      AreaCode:'E11000004'
    },
    {
      RegionName:'West Midlands',
      Area:'Midlands',
      AreaCode:'E11000005'
    },
    {
      RegionName:'West Yorkshire',
      Area:'North',
      AreaCode:'E11000006'
    },
  ]

  constructor(
    private _location: Location,
    private fb:FormBuilder,
    private recordService:RecordService,
    private toastrService:ToastrService,
    private activedRoute:ActivatedRoute,
    private router:Router,
    private _decimalPipe:DecimalPipe
  ) {}

  ngOnInit(): void {
    this.recordForm = this.fb.group({
      'Date':['', Validators.required],
      'RegionName':['',Validators.required],
      'Area':['', Validators.required],
      'AreaCode':['',Validators.required],
      'SalesVolume':['', [Validators.required, Validators.min(1)]],
      'AveragePrice':['', Validators.required],
      'Index':['', Validators.required],
      'DetachedPrice':['', Validators.required],
      'DetachedIndex':['', Validators.required],
      'SemiDetachedPrice':['', Validators.required],
      'SemiDetachedIndex':['', Validators.required],
      'TerracedPrice':['', Validators.required],
      'TerracedIndex': ['', Validators.required],
      'FlatPrice':['', Validators.required],
      'FlatIndex':['', Validators.required],
      'IndexSA':'',
      'AveragePriceSA':'',
      '1m%Change':'',
      '12m%Change':'',
      'Detached1m%Change':'',
      'Detached12m%Change':'',
      'SemiDetached1m%Change':'',
      'SemiDetached12m%Change':'',
      'Terraced1m%Change':'',
      'Terraced12m%Change':'',
      'Flat1m%Change':'',
      'Flat12m%Change':''
    });

    this.activedRoute.paramMap.subscribe(params => {
      const idRecord = params.get('idRecord');
      if(idRecord){
        this.isEditMode = true;
        this.recordService.getRecord(idRecord).subscribe(
          data => {
            this.idRecord = idRecord;
            this.recordForm.patchValue({...data, Date:this.formatDate(data.Date)})
          },err => {
            this.toastrService.error('Error !');
            setTimeout(() => {
              this.router.navigateByUrl('')
            },1800)
          }
        )
      }
    })

    const regionNameField = this.recordForm.get('RegionName');
    const AreaField = this.recordForm.get('Area');
    const AreaCodeField = this.recordForm.get('AreaCode');

    regionNameField?.valueChanges.subscribe(value => {
      if(value){
        const group = this.listGroupFields.find(item => item.RegionName === value);
        if(group){
          AreaField?.setValue(group?.Area);
          AreaCodeField?.setValue(group?.AreaCode)
        }
      }
    })
  }

  // check valid field
  public isFieldValid(field:string) {
    return (this.recordForm.get(field)?.dirty ) && this.recordForm.invalid ;
  }
  // catch error of field
  public isFieldHasError(field:string, error:string) {
    return this.recordForm.get(field)?.hasError(error);
  }

  public formatDate(date:string){
    const newDate = date.split('/').map((item:any) => {
      if(item.length < 2){
        return '0' + item
      }else {
        return item
      }
    })
    return newDate.reverse().join('-')
  }

  onBackHistoryPage():void{
    this.canLeavePage= true;
    setTimeout(() => {
      this._location.back()
    }, 1000);
  }

  onResetForm():void {
    this.recordForm.reset()
  }

  onAddNewRecord():void{
    this.recordService.addNewRecord(this.recordForm.value).subscribe(
      data => {
        this.toastrService.success('Add new record success !')
      },
      err => {
        this.toastrService.error('Add new record failed !')
      }
    )
  }

  onSaveEditRecord(){
    if(this.recordForm.valid){
      this.recordService.putRecord(this.idRecord, this.recordForm.value).subscribe(
        data => {
          this.toastrService.success('Edit record success !');
          this.canLeavePage= true;
          setTimeout(() => {
            this.router.navigateByUrl('')
          },1500)
        },
        err => {
          this.toastrService.error('Edit record failed !')
        }
      )
    }
  }

}
