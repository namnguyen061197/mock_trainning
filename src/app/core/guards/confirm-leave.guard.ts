import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { CreateRecordComponent } from 'src/app/pages/create-record/create-record.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmLeaveGuard implements CanDeactivate<CreateRecordComponent> {
  public alertQuote!:string;
  constructor(private translate: TranslateService){
    this.translate.get('alertQuote.canLeave').subscribe(res => this.alertQuote = res)
  }
  canDeactivate(
    component: CreateRecordComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return component.canLeavePage || window.confirm(this.alertQuote);
  }

}
