import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit,AfterViewInit{

dataSource:any;
user:User[]=[];
@ViewChild(MatPaginator) paginator: MatPaginator; 

displayedColumns: string[] = ['userName', 'email', 'registerDateTime','image'];
  constructor(private userservice:UserService) {}

  ngOnInit(): void {
     this.getAll();
  }
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<User>(this.user);
    this.dataSource.paginator = this.paginator;
  }    
  getAll()
  {
    this.userservice.getAllUser().subscribe(
      (response)=>{
        this.user=response;
        // this.datasource = new MatTableDataSource<User>(response);
        // this.dataSourceCopy = response;
        // this.datasource.paginator = this.paginator;
      },
      (error)=>{
        console.log()
      }
    );
  }
  loginClick()
  {
  }
}
