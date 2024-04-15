import { Component, Input } from '@angular/core';
import { Song } from '../../models/song.interface';
import { SongsService } from '../../services/songs.service';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.scss'],
})
export class SongDetailsComponent {
  @Input() song!: Song;

  constructor(private songsService: SongsService) {}

  deleteSong(songId: number) {
    this.songsService.deleteSong(songId).subscribe(() => {
      this.songsService.updateSongToDelete(songId);
    });
  }
  editSong(songId: number) {}
  voteSong(songId: number) {}
}
