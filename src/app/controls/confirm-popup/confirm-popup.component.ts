import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';
import { DxButtonComponent } from 'devextreme-angular';

@Component({
  selector: 'confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmPopupComponent implements OnInit, OnChanges {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() visible: boolean = false;
  @Input() cancelText: string = 'ביטול';
  @Input() okText: string = 'אישור';
  @Input() contentTemplate?: TemplateRef<any>;

  @Output() onCancel = new EventEmitter();
  @Output() onOk = new EventEmitter();

  @ViewChild("cancelButton", { static: false }) public cancelButton?: DxButtonComponent;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    
    console.log(changes);
  }

  ngOnInit(): void {
  }

}
