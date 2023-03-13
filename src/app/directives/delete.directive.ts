import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { ProductService } from '../services/admin/models/product.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { HttpClientService } from '../services/common/http-client.service';
import { AlertifyService, MessageType, Position } from '../services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from '../services/common/dialog.service';
declare var $ : any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private httpClient : HttpClientService ,
    private render : Renderer2 ,
     private element : ElementRef ,
      public dialog: MatDialog,
      private alertifyService : AlertifyService,
      private dialogSerivce :DialogService) {

    const img : HTMLElement = render.createElement('img');

    img.setAttribute('src' , '../../../../assets/remove.png')

    img.setAttribute("style" , "cursor = pointer; width = 25px ; height =25px");

    render.appendChild(element.nativeElement , img);

   }
   @Input() controller : string;
   @Input() id : string;
   @Output() callBack : EventEmitter<any> = new EventEmitter();

   @HostListener('click')
   async onClick(){
   this.dialogSerivce.openDialog({componentType : DeleteDialogComponent , data : Answer.Yes , afterClosed : async ()=> {
    const td : HTMLTableCellElement = this.element.nativeElement;
    this.httpClient.delete({
      controller : this.controller
    },this.id).subscribe(response => {
      $(td.parentElement).fadeOut(1000 , () => {
        this.callBack.emit();

        this.alertifyService.message("Product Has Deleted Successfully" , {
          messageType : MessageType.Message,
          position : Position.TopRight,
          delay : 15,
          dismissOthers : true
        })
        
      })
    },(errorResponse : HttpErrorResponse) => {
      this.alertifyService.message("While deleting the product ,  an error occured ", {
        messageType : MessageType.Error,
        position : Position.TopRight,
        delay : 15,
        dismissOthers : true
      })
    })
      
   }} );
   }
  }

//    openDialog(afterClosed : any): void {
//     const dialogRef = this.dialog.open(DeleteDialogComponent, {
//       data : Answer.Yes
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if(result == Answer.Yes)
//         afterClosed();
//     });
//   }

// }

export enum Answer{
  Yes,
  No
}
