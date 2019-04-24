import { Component, OnInit } from '@angular/core';
import { FsService } from '../services/fs.service';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss']
})
export class ListClientsComponent implements OnInit {
  customers;
  constructor(
    private fs: FsService    
  ) { }

  ngOnInit() {
  }

  getCustomers() {
    this.fs.getCustomers()
      .subscribe(data => {
        console.log(data);
        this.customers = data;
      });
  }

}
