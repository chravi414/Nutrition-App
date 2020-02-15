import { UserDataService } from './../user-data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  public searchTerm: string;
  public productData: any;
  public recommendedProds : any = [];
  constructor(private router:Router,private userService : UserDataService) { }

  ngOnInit() {
    if(!localStorage.getItem('isLogged')) {
      this.router.navigate(['/register']);
    }
    this.getInitialProducts();
  }

  logout() {
    localStorage.removeItem('isLogged');
    this.router.navigate(['/register'])
  }

  getInitialProducts() {
    const defaultProds = ['chicken', 'butter', 'panneer'];
    defaultProds.forEach(prod => {
      this.userService.getNutritionDetails(prod).
        subscribe(data => {
          const prod = data['hits'][0]['fields'];
          this.recommendedProds.push(prod);
        });
    });
  }

  getDetails() {
    this.userService.getNutritionDetails(this.searchTerm).
      subscribe(data => {
        this.productData = data['hits'][0]['fields'];
        console.log(this.productData);
      })
  }
}
