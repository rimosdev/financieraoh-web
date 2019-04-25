import { Component, OnInit } from '@angular/core';
import { NgModel, FormControl, Validators, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { FsService } from '../services/fs.service';
import { CustomerDataSource } from '../classes/customer-data-source';
import { Router } from '@angular/router';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'L',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss'],
  providers: [FsService,
    {provide: MAT_DATE_LOCALE, useValue: 'es-PE'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ]
})

export class NewClientComponent implements OnInit {
  accountDetailsForm: FormGroup;
  displayedColumns = ['name', 'lastname', 'age', 'birthday'];
  dataSource = new CustomerDataSource(this.fs);

  loading: boolean = false;
  message_error: string;
  message_success: string;

  constructor(
    private fs: FsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  clearForm() {
    this.accountDetailsForm.reset();
  }

  onFormSubmit(form:NgForm) {
    this.message_error = '';
    this.message_success = '';
    console.log(this.accountDetailsForm);
    if(this.accountDetailsForm.valid) {
      this.loading = true;
      form['birthday'] = form['birthday'].format('YYYY-MM-DD');
      console.log(form);
      this.fs.postCustomers(form)
        .subscribe(res => {
            let id = res['key'];
            this.clearForm();
            this.message_success = 'Cliente registrado!';
            setTimeout(() => {
              this.router.navigate(['/listado-clientes']);
            }, 1500 );
            this.loading = false;
          }, (err) => {
            this.loading = false;
            this.message_error = 'Ocurrió un error';
            console.log(err);
          });
    }
    else {
      this.message_error = 'Ingrese los campos obligatorios';
    }
  }

  // Reactive form and validations
  createForm() {
    this.accountDetailsForm = this.formBuilder.group({
      name: new FormControl(
        "",
        Validators.compose([
          Validators.required
        ])
      ),
      lastname: new FormControl(
        "",
        Validators.compose([
          Validators.required
        ])
      ),
      age: new FormControl(
        "",
        Validators.compose([
          Validators.required
        ])
      ),
      birthday: new FormControl(
        "",
        Validators.compose([
          Validators.required
        ])
      ),
    });
  }
  
}
