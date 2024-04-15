import { Component } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { Song } from '../../models/song.interface';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.scss'],
})
export class SongsListComponent {
  songs!: Song[];

  constructor(private songsService: SongsService) {}

  ngOnInit() {
    this.songsService.getSongs().subscribe((songs) => {
      this.songs = songs;
    });
    this.songsService.songToDelete$.subscribe((songId) => {
      this.songs = this.songs.filter((song) => song.id !== songId);
    });
  }
}
