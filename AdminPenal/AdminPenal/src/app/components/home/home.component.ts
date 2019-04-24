
import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selecetedFile: File;
  imagePreview: any;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }



}
