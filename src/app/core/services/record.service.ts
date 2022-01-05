import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Irecord } from 'src/app/interfaces/IRecord';
import { BASE_API } from '../common/baseApi';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private searchParams = new HttpParams();
  public params = {
    searchFields : [
      {field:'', key: ''}
    ],
    sortField : '',
    order:'',
    currentPage: 1,
    limit: 10

  }
  public paramSubject = new BehaviorSubject(this.params)

  constructor(private http:HttpClient ) { }


  public getRecordByField(data:IParams):Observable<any> {
    this.params.searchFields.forEach(item => {
      this.searchParams = this.searchParams.delete(`${item.field}_like`);
      this.searchParams =  item.field ? this.searchParams.append(`${item.field}_like`, item.key) : this.searchParams;
    })
    this.searchParams = this.searchParams.delete('_sort');
    this.searchParams = this.searchParams.delete('_order');
    this.searchParams = this.searchParams.delete('_page');
    this.searchParams = this.searchParams.delete('_limit');
    this.searchParams = this.searchParams.append('_sort', data?.sortField);
    this.searchParams = this.searchParams.append('_order',data?.order);
    this.searchParams = this.searchParams.append('_page', data?.currentPage);
    this.searchParams = this.searchParams.append('_limit', data?.limit)

    return this.http.get(`${BASE_API}`,
     {
       params: this.searchParams
     })
  }

  public getRecordBySearchParam(keyword:string):Observable<any>{
    return this.http.get(`${BASE_API}?q=${keyword}`)
  }

  public deleteRecord(id:number):Observable<any> {
    return this.http.delete(`${BASE_API}/${id}`)
  }

  public getRecord(id:any):Observable<any> {
    return this.http.get(`${BASE_API}/${id}`)
  }

  public addNewRecord(record:any):Observable<any>{
    return this.http.post(BASE_API, record)
  }

  public putRecord(id:string, record:any):Observable<any>{
    return this.http.put(`${BASE_API}/${id}`, record)
  }
}

interface IParams {
  searchFields : Array<{
    field:string,
    key:string
  }>,
  sortField : string,
  order:string,
  currentPage: number | string
  limit: number | string
}
