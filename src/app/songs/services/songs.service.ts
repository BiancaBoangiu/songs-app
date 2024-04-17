import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Song } from '../models/song.interface';
import { Observable } from 'rxjs/internal/Observable';
import { Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SongsService {
  private songsURL = 'http://localhost:3000/songs';

  songToDelete$: Subject<number> = new Subject<number>();
  songToEdit$: Subject<Song> = new Subject<Song>();
  songToAdd$: Subject<Song> = new Subject<Song>();
  editedSong$: Subject<Song> = new Subject<Song>();

  constructor(private http: HttpClient) {}

  updateSongToDelete(songId: number) {
    this.songToDelete$.next(songId);
  }

  updateSongToEdit(song: Song) {
    this.songToEdit$.next(song);
  }
  updateEditedSong(song: Song) {
    this.editedSong$.next(song);
  }

  updateSongToAdd(song: Song) {
    this.songToAdd$.next(song);
  }

  getSongs(): Observable<Song[]> {
    return this.http
      .get<Song[]>(this.songsURL)
      .pipe(map((songs) => songs.sort((a, b) => b.votes - a.votes)));
  }

  addSong(artist: string, song: string, date: number): Observable<Song> {
    const body = {
      artist,
      song,
      votes: 0,
      date,
    };
    return this.http.post<Song>(this.songsURL, body);
  }

  deleteSong(songId: number) {
    const songURL = `${this.songsURL}/${songId}`;
    return this.http.delete<Song>(songURL);
  }

  editSong(songId: number, artist: string, song: string): Observable<Song> {
    const songURL = `${this.songsURL}/${songId}`;
    const body = {
      artist,
      song,
    };

    return this.http.patch<Song>(songURL, body);
  }

  voteSong(songId: number, votes: number): Observable<Song> {
    const songURL = `${this.songsURL}/${songId}`;
    const body = { votes: votes + 1 };
    return this.http.patch<Song>(songURL, body);
  }
}
