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

  /**
   * GET: gets movies from api call and sets the movies state
   * @returns array of movie objects
   * @function getAllMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * GET: gets favorite movies of user from an API call and sets the favorite movies state
   * @returns array of users favorite movies
   * @function getFavoriteMovies
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }

  /**
   * checks if the movie id is in the users favorite moveis array
   * @param id 
   * @returns the movie if the movie is in the array of favorite movies
   */
  isFav(id: string): boolean {
    return this.favoriteMovies.includes(id)
  }

  /**
   * opens the genre dialog from GenreCardComponent to display details to the user
   * @param name 
   * @param description 
   * @returns genre dialog of genre name and description to the user
   */
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

/**
 * opens the director dialog from DirectorCardComponent to display details to the user
 * @param name 
 * @param bio 
 * @param birthday 
 * @returns director dialog of name bio and birthday to the user
 */
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
   * opens the synopsis dialog from SynopsisCardComponent to display details to the user
   * @param title 
   * @param description 
   * @returns synopsis card displaying movie details to the user
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

  /**
   * adds a movie to the array of users favorite movies
   * @param id 
   * @function addFavoriteMovie
   */
  addToFavoriteMovies(id: string): void {
    console.log(id);
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    })
  }

  /**
   * removes a movie from the array of users favorite movies
   * @param id 
   * @function removeFavoriteMovie
   */
  removeFromFavoriteMovies(id: string): void {
    console.log(id);
    this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    })
  }

}