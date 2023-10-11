import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth/auth.service';
interface pages {
  title: string;
  path: string
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean =false
  menuHandler: boolean = true;
  mdOptions: boolean = true;
  search: boolean = true;
  pages: pages[] = [
    {title: 'home', path: '/'},
    {title: 'cart', path: '/cart'},
    {title: 'products', path: '/products'},
    {title: 'categories', path: '/categories'},
    {title: 'brands', path: '/brands'},
  ]

  constructor(private _authService: AuthService) {
    this._authService.isAuthenticated.subscribe(isAuth =>{
      this.isAuthenticated = isAuth
    })
  }
  menuHandlerBtn() {
      this.menuHandler = !this.menuHandler;
  }
  mdOptionsToggle() {
      this.mdOptions = !this.mdOptions;
  }
  searchToggle() {
      this.search = !this.search;
  }
 
  ngOnInit(): void {}
  logout(){
    this._authService.logout()
  }
}
