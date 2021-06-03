import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { DataService } from '../../data.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {



  users!: any[];
  dataSource: any;
  displayedColumns: string[] = ['name', 'username', 'email'];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {

    this.dataService.sendGetRequest().subscribe((data:any[])=>{
      this.dataSource = new MatTableDataSource<any[]>(data);
    })


  }
  ngAfterViewInit(): void {

  }

}
