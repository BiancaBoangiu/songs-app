import { Component } from '@angular/core';
import { SongsService } from '../../services/songs.service';

@Component({
  selector: 'app-song-form',
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.scss'],
})
export class SongFormComponent {
  artist!: string;
  song!: string;
  constructor(private songsService: SongsService) {}

  addSong() {
    this.songsService.addSong(this.artist, this.song).subscribe();
  }
}
