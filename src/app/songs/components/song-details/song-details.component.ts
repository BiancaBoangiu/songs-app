import { Component, Input } from '@angular/core';
import { Song } from '../../models/song.interface';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.scss'],
})
export class SongDetailsComponent {
  @Input() song!: Song;

  deleteSong(songId: number) {}
  editSong(songId: number) {}
  voteSong(songId: number) {}
}
