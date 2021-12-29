import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() idModal?:string;
  @Input() alertQuote?:any;
  @Input() nameHandleBtn?:any;
  @Output() handleFunction = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onHandleFunction():void {
    this.handleFunction.emit()
  }

}
