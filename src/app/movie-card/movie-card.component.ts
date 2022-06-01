import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';

import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }

  isFav(id: string): boolean {
    return this.favoriteMovies.includes(id)
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name: name,
        Description: description,
      },
      // Assign dialog width
      width: '500px'
    });
  }


  openDirectorDialog(name: string, bio: string, birthday: Date): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birthday: birthday,
      },
      // Assign dialog width
      width: '500px'
    });

  }

  /**
   * opens the user synopsis dialog from SynopsisComponent to displaying details
   * @param title
   * @param description
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {
        Title: title,
        Description: description,
      },
      // Assign dialog width
      width: '500px'
    });

  }

  addToFavoriteMovies(id: string): void {
    console.log(id);
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    })
  }

  removeFromFavoriteMovies(id: string): void {
    console.log(id);
    this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    })
  }

}