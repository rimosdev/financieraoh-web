import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const settings = {timestampsInSnapshots: true};
const config = {
  apiKey: 'AIzaSyBvSufp2aeg4aiMIursozKcfQ50KI5qiCI',
  authDomain: 'financieraoh-test.firebaseapp.com',
  databaseURL: 'https://financieraoh-test.firebaseio.com',
  projectId: 'financieraoh-test',
  storageBucket: 'financieraoh-test.appspot.com',
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'financieraoh-web-test';

  ngOnInit() {
    firebase.initializeApp(config);
    firebase.firestore().settings(settings);
  }
}