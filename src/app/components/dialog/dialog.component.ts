import {Component, Inject, OnInit} from '@angular/core';
//import {DialogData} from '../../_models/dialog';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private dialogRef: MatDialogRef<DialogComponent>) {}

  close() {
    this.dialogRef.close(true);
  }

  closeBad() {
    this.dialogRef.close(false);
  }

  ngOnInit() {
  }

}

export class DialogData {
  title: string;
  class: boolean;
  message: string;
  orderId: string;
  sgId: string;
    showOKBtn: boolean;
    showCancelBtn?: boolean = false;
}
