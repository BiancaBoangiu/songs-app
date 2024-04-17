import { Component, Input } from '@angular/core';
import { Song } from '../../models/song.interface';
import { SongsService } from '../../services/songs.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.scss'],
})
export class SongDetailsComponent {
  @Input() song!: Song;
  formattedDate!: string;

  constructor(private songsService: SongsService, private datePipe: DatePipe) {}

  ngOnInit() {
    const date = new Date(this.song.date);
    this.formattedDate =
      this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') || '';
  }

  deleteSong(songId: number) {
    this.songsService.deleteSong(songId).subscribe(() => {
      this.songsService.updateSongToDelete(songId);
    });
  }

  editSong(song: Song) {
    this.songsService.updateSongToEdit(song);
  }

  voteSong(songId: number, votes: number) {
    this.songsService.voteSong(songId, votes).subscribe((song) => {
      this.songsService.updateEditedSong(song);
    });
  }
}
