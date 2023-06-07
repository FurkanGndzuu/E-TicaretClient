import { Component , ViewChild , OnInit} from '@angular/core';
import { OrderService } from 'src/app/services/common/order.service';
import { MatTableDataSource } from '@angular/material/table';
import { getAllOrder } from 'src/app/contracts/Order/getAllOrder';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { baseComponent } from 'src/app/base/baseComponent';
import { SpinnerType } from 'src/app/base/baseComponent';
import { DialogService } from 'src/app/services/common/dialog.service';
import { OrderDetailDialogsComponent, OrderDetailDialogState } from 'src/app/dialogs/order-detail-dialogs/order-detail-dialogs.component';
import { getOrderByIdModel } from 'src/app/contracts/Order/getOrderByIdModel';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent extends baseComponent implements OnInit {

  constructor(private orderService : OrderService ,spinner : NgxSpinnerService,private dialogService:DialogService){
    super(spinner)
  }
  displayedColumns: string[] = ['Id', 'UserName','Adress' , 'Description' , 'CreatedDate','Completed','orderDetail','delete' ];
  dataSource : MatTableDataSource<getAllOrder> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getOrders(){
    this.showSpinner(SpinnerType.BallAtom);

    const allOrders : {totalOrderCount : number , orders : getAllOrder[]} = await this.orderService.getOrdes(
     this.paginator ? this.paginator.pageIndex : 0 , this.paginator ? this.paginator.pageSize : 5);
 
    this.dataSource = new MatTableDataSource<getAllOrder>(allOrders.orders);
    this.paginator.length = allOrders.totalOrderCount;

    
  }

  async ngOnInit() {
    await this.getOrders();
  }
  async  pageChanged(){
    await this.getOrders();
  }
  openDetailDialog(id : string){
    this.dialogService.openDialog({
      componentType : OrderDetailDialogsComponent,
      data :  id,
      options : {
        width : "900px"
      }
    });
  }


}
