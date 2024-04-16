import { Component } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { Song } from '../../models/song.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.scss'],
})
export class SongsListComponent {
  songs!: Song[];
  private subscriptions: Subscription[] = [];

  constructor(private songsService: SongsService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.songsService.getSongs().subscribe((songs) => {
        this.songs = songs;
      }),

      this.songsService.songToDelete$.subscribe((songId) => {
        this.songs = this.songs.filter((song) => song.id !== songId);
      }),

      this.songsService.editedSong$.subscribe((editedSong) => {
        const index = this.songs.findIndex((song) => song.id === editedSong.id);
        this.songs[index] = editedSong;
      }),

      this.songsService.songToAdd$.subscribe((song) => {
        this.songs.push(song);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
