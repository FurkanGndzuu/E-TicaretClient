import { Component, OnInit , ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { baseComponent, SpinnerType } from 'src/app/base/baseComponent';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ListRole } from 'src/app/contracts/Role/ListRole';
import { RoleService } from 'src/app/services/common/role.service';

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.scss']
})
export class ListRoleComponent extends baseComponent implements OnInit {
  constructor(spinner : NgxSpinnerService , private roleService : RoleService){
    super(spinner)
  }
  displayedColumns: string[] = ['name','delete' ];
  dataSource : MatTableDataSource<ListRole> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

 async ngOnInit() {
    await this.getRoles();
  }

 async getRoles(){
    this.showSpinner(SpinnerType.BallAtom);
    const allRoles : {totalRoleCount : number , roles : ListRole[]} = await this.roleService.getRoles(
      this.paginator ? this.paginator.pageIndex : 0 , this.paginator ? this.paginator.pageSize : 5);
  
     this.dataSource = new MatTableDataSource<ListRole>(allRoles.roles);
     this.paginator.length = allRoles.totalRoleCount;
     this.hideSpinner(SpinnerType.BallAtom);
  }

  async  pageChanged(){
    await this.getRoles();
  }
}
