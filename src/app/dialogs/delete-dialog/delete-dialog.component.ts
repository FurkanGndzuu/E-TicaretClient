import { Component , Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Answer, DeleteDirective } from 'src/app/directives/delete.directive';
import { baseDialog } from '../base/baseDialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent extends  baseDialog<DeleteDialogComponent> {

  constructor(
    dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Answer,
  ) {
    super(dialogRef);
  }

}
