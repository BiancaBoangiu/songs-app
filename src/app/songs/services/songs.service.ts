import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Song } from '../models/song.interface';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class SongsService {
  private songsURL = 'http://localhost:3000/songs';

  constructor(private http: HttpClient) {}

  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(this.songsURL);
  }

  addSong(artist: string, song: string): Observable<Song> {
    const body = {
      artist,
      song,
      votes: 0,
    };
    return this.http.post<Song>(this.songsURL, body);
  }

  deleteSong(songId: number) {}

  editSong(songId: number) {}

  voteSong(songId: number) {}
}
