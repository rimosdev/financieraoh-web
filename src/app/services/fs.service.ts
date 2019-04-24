import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FsService {
  
  ref = firebase.firestore().collection('customers');

  constructor() { }

  getCustomers(): Observable<any> {
    return new Observable((observer) => {
      this.ref.onSnapshot((querySnapshot) => {
        let customers = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          customers.push({
            key: doc.id,
            name: data.name,
            lastname: data.lastname,
            age: data.age,
            birthday: data.birthday
          });
        });
        observer.next(customers);
      });
    });
  }
  
  postCustomers(data): Observable<any> {
    console.log("postCustomer");
    return new Observable((observer) => {
      this.ref.add(data).then((doc) => {
        console.log(doc);
        observer.next({
          key: doc.id,
        });
      });
    });
  }
  
}
