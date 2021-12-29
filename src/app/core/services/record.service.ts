import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API } from '../common/baseApi';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private searchParams = new HttpParams()

  constructor(private http:HttpClient ) { }

  public getListRecord():Observable<any> {
    return this.http.get(BASE_API)
  }

  public getRecordByField(field:string, keyword:string):Observable<any> {
    this.searchParams = this.searchParams.delete(`${field}_like`)
    this.searchParams = this.searchParams.append(`${field}_like`, keyword);
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
