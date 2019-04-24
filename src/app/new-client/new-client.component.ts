import { Component, OnInit } from '@angular/core';
import { NgModel, FormControl, Validators, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { FsService } from '../services/fs.service';
import { CustomerDataSource } from '../classes/customer-data-source';


@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss'],
  providers: [FsService]
})
export class NewClientComponent implements OnInit {
  accountDetailsForm: FormGroup;
  displayedColumns = ['name', 'lastname', 'age', 'birthday'];
  dataSource = new CustomerDataSource(this.fs);

  constructor(
    private fs: FsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  onFormSubmit(form:NgForm) {
    console.log(form);
    this.fs.postCustomers(form)
      .subscribe(res => {
          let id = res['key'];
          console.log(res);
        }, (err) => {
          console.log(err);
        });
  }

  // Reactive form and validations
  createForm() {
    this.accountDetailsForm = this.formBuilder.group({
      customer_name: new FormControl(
        "",
        Validators.compose([
          Validators.required
        ])
      ),
      customer_lastname: new FormControl(
        "",
        Validators.compose([
          Validators.required
        ])
      ),
      customer_age: new FormControl(
        "",
        Validators.compose([
          Validators.required
        ])
      ),
      customer_birthday: new FormControl(
        "",
        Validators.compose([
          Validators.required
        ])
      ),
    });
  }
  
}
