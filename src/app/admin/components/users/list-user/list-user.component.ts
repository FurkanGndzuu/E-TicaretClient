import { Component , ViewChild , OnInit} from '@angular/core';
import { OrderService } from 'src/app/services/common/order.service';
import { MatTableDataSource } from '@angular/material/table';
import { getAllOrder } from 'src/app/contracts/Order/getAllOrder';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { baseComponent } from 'src/app/base/baseComponent';
import { SpinnerType } from 'src/app/base/baseComponent';
import { getAllUser } from 'src/app/contracts/users/getAllUser';
import { UserService } from 'src/app/services/common/user.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { AuthorizeUserDialogComponent } from 'src/app/dialogs/authorize-user-dialog/authorize-user-dialog.component';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent extends baseComponent implements OnInit{
  constructor(private userService : UserService ,spinner : NgxSpinnerService , private dialogService: DialogService){
    super(spinner)
  }
  displayedColumns: string[] = [ 'userName','email' , "twoFactorEnabled" , 'authorize'];
  dataSource : MatTableDataSource<getAllUser> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getUsers(){
    this.showSpinner(SpinnerType.BallAtom);

    const allUsers : {totalUserCount : number , users : getAllUser[]} = await this.userService.getAllUsers(
     this.paginator ? this.paginator.pageIndex : 0 , this.paginator ? this.paginator.pageSize : 5);
 
    this.dataSource = new MatTableDataSource<getAllUser>(allUsers.users);
    this.paginator.length = allUsers.totalUserCount;
    
  }

  async ngOnInit() {
    await this.getUsers();
  }
  async  pageChanged(){
    await this.getUsers();
  }

  async authorizeDialog(Id : string){
    this.dialogService.openDialog({
      componentType : AuthorizeUserDialogComponent,
      data : Id,
      options : {
        width : "750px"
      }
    });
  }
}
