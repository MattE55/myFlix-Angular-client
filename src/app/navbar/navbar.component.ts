import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * routes to main view of the app (movies page)
   */
  goToMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * routes to the users profile
   */
  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * logs out user and clears the local storage token, routes to welcome page after
   */
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }


}
