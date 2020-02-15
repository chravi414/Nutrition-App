import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  public users = Array(JSON.parse(localStorage.getItem("users")));
  constructor(private http: HttpClient) { }

  registerUser(userData) {
    console.log(this.users);
    this.users.push(userData);
    localStorage.setItem("users", JSON.stringify(this.users));
  }

  getUsers({email, password}) {
    const users = JSON.parse(localStorage.getItem("users"));
    return users.find(user => {
      return user['email'] === email && user['password'] === password;
    });
  }

  getNutritionDetails(searchTerm) {
    const url = `https://api.nutritionix.com/v1_1/search/${searchTerm}?fields=*&results=0:1&appId=356254e9&appKey=38fdaf0eac35178822c45a5b39dbb35d`;
    return this.http.get(url).
      pipe(response => {
        return response;
      })
  }

}
