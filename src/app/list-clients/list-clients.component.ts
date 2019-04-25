import { Component, OnInit } from '@angular/core';
import { FsService } from '../services/fs.service';
import * as moment from 'moment';
import * as math from 'mathjs';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss']
})
export class ListClientsComponent implements OnInit {
  customers;
  max_life = 65; // Years old to die
  age_avg = 0;
  age_std = 0;
  ages;
  constructor(
    private fs: FsService    
  ) { }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    this.fs.getCustomers()
      .subscribe(data => {
        console.log(data);
        this.customers = data;
        this.formatCustomers();
      });
  }

  formatCustomers() {
    let ages_array = [];
    this.customers.map((customer, index) => {
      this.customers[index]['to_die'] = this.getDateToDie(customer);
      this.customers[index]['birthday'] = moment(customer.birthday).format('DD / MM / YYYY');
      ages_array.push(customer.age);
    });
    this.age_avg = math.median(ages_array);
    this.age_std = math.std(ages_array);
  }

  getDateToDie(customer) {
    const years_to_die = this.max_life - customer.age;
    return years_to_die > 0 ? moment(customer.birthday).add(this.max_life, 'years').format('DD / MM / YYYY') : '-';
  }

}
