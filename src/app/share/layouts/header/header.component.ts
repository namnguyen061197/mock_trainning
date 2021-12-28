import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public langInput = new FormControl(localStorage.getItem('lang') || 'en');
  constructor() {

   }

  ngOnInit(): void {
    this.langInput.valueChanges.subscribe(data => {
      localStorage.setItem('lang', data);
      window.location.reload()
    });

  }

}
