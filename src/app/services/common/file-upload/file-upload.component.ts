import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component ,Input } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { NgxSpinnerService } from 'ngx-spinner';
import { FileUploadDialogComponent, FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { DialogService } from '../dialog.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(private httpClientService : HttpClientService,
    private alertify : AlertifyService , 
    private toastrService : CustomToastrService,
    private dialogService : DialogService,
    private spinner : NgxSpinnerService){}

  public files: NgxFileDropEntry[];

 @Input()  fileOptions : Partial<RequestParameterForFile>;

  public selectedFiles(files: NgxFileDropEntry[]) {

    this.files = files;

    const fileData : FormData = new FormData()

    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }

    this.dialogService.openDialog({componentType : FileUploadDialogComponent , data : FileUploadDialogState.Yes ,
    afterClosed : async () => {
      this.httpClientService.post({
        controller : this.fileOptions.controller,
        action : this.fileOptions.action,
        queryString : this.fileOptions.queryString,
        headers : new HttpHeaders({"responseType" : " Blob"})
      },fileData).subscribe(response => {
        if(this.fileOptions.isAdminpage){
          this.alertify.message("Files Uploaded Successfully" , {
            messageType : MessageType.Success,
            position : Position.TopRight,
            dismissOthers : true,
            delay : 15
          });
        }
        else{
          this.toastrService.message("Files Uploaded Successfully","File Upload" , {
          messageType : ToastrMessageType.Success,
          position : ToastrPosition.TopCenter
          })
        }
      },
      (errorResponse : HttpErrorResponse) => {
  
        if(this.fileOptions.isAdminpage){
          this.alertify.message(errorResponse.error.message , {
            messageType : MessageType.Success,
            position : Position.TopRight,
            dismissOthers : true,
            delay : 15
          });
        }
        else{
          this.toastrService.message(errorResponse.error.message,"File Upload" , {
          messageType : ToastrMessageType.Error,
          position : ToastrPosition.TopCenter
          })
        }
  
      })
    }})

   
    
  }

  

}

export class RequestParameterForFile {
  controller? : string;
  action? : string;
  queryString? : string;
  accept? : string;
  isAdminpage? : boolean = false;
  explanation? : string;
}
