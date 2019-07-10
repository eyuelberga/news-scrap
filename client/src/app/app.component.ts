import { Component } from '@angular/core';
import{Http,Response} from '@angular/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  private apiUrl = 'http://[::1]:3000/news';
  data:any = {};

  constructor(private http:Http){
    this.getNews();
    this.getData();
  }
  getData(){
    return this.http.get(this.apiUrl).pipe(map((res:Response)=> res.json()))
  }
  getNews(){
    this.getData().subscribe(data =>{
      console.log(data);
      this.data = data
    })
  }
}
