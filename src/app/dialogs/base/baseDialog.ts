import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


export class baseDialog<dialogComponent> {
    constructor(
        public dialogRef: MatDialogRef<dialogComponent>,
        
      ) {}
    
      close(): void {
        this.dialogRef.close();
      }
}