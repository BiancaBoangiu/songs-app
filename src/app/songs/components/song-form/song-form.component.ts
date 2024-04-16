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
  votes!: number;
  songId!: number;
  isSongEdited: boolean = false;
  constructor(private songsService: SongsService) {}

  ngOnInit() {
    this.songsService.songToEdit$.subscribe((song) => {
      this.isSongEdited = true;
      this.artist = song.artist;
      this.song = song.song;
      this.votes = song.votes;
      this.songId = song.id;
    });
  }

  addSong() {
    this.songsService.addSong(this.artist, this.song).subscribe();
  }

  saveEditedSong() {
    this.songsService
      .editSong(this.songId, this.artist, this.song, this.votes)
      .subscribe((song) => {
        this.isSongEdited = false;
        this.artist = '';
        this.song = '';
        this.songsService.updateEditedSong(song);
      });
  }
}
