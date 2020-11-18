import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
//import {DialogData} from '';
import {DialogComponent} from "../components/dialog/dialog.component";
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DialogService {
    private dialogRef: MatDialogRef<DialogComponent>;

    constructor(public dialog: MatDialog) { }

    openDialog(data: DialogData, additionalDialogConfigData?: any): MatDialogRef<DialogComponent> {

      	if (this.dialogRef) {
          	this.dialogRef.close();
      	}
      	this.dialogRef = this.dialog.open(DialogComponent, {
          	width: '500px',
          	data
      	});

		this.dialogRef.afterClosed().subscribe(result => {});

    	return this.dialogRef;
	}
	  
	afterClose() : Observable<any> {
		return this.dialogRef.afterClosed();
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
