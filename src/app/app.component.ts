import { AfterViewInit, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  public isLoading!:boolean;
  constructor(
    private translateService:TranslateService,
    private loadService:LoaderService
  ){
    this.translateService.setDefaultLang('en');
    const lang = localStorage.getItem('lang') || 'en'
    this.translateService.use(lang);
    document.documentElement.lang = lang;
  }

  ngAfterViewInit(): void {
    this.loadService.isLoading.subscribe(res => {
      setTimeout(() => {
        this.isLoading = res
      },0)
    })
  }
}
