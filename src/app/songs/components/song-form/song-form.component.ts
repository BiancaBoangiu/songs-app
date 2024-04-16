import { Component, ViewChild } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-song-form',
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.scss'],
})
export class SongFormComponent {
  artistValue!: string;
  songValue!: string;
  votes!: number;
  songId!: number;

  isSongEdited: boolean = false;
  artistInputError: boolean = false;
  songInputError: boolean = false;

  @ViewChild('songForm') songForm!: NgForm;

  constructor(private songsService: SongsService) {}

  ngOnInit() {
    this.songsService.songToEdit$.subscribe((song) => {
      this.isSongEdited = true;
      this.artistValue = song.artist;
      this.songValue = song.song;
      this.votes = song.votes;
      this.songId = song.id;
    });
  }

  addSong() {
    console.log(this.artistValue);
    console.log(this.songValue);
    this.songsService
      .addSong(this.artistValue, this.songValue)
      .subscribe((song) => {
        this.songsService.updateSongToAdd(song);
        this.songForm.resetForm();
      });
  }

  saveEditedSong() {
    this.songsService
      .editSong(this.songId, this.artistValue, this.songValue, this.votes)
      .subscribe((song) => {
        this.isSongEdited = false;
        this.songsService.updateEditedSong(song);
        this.songForm.resetForm();
      });
  }
}
