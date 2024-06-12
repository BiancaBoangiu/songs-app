import { Component, ViewChild } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

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

  @ViewChild('songForm') songForm!: NgForm;

  private subscription!: Subscription;

  constructor(private songsService: SongsService) {}

  ngOnInit() {
    this.subscription = this.songsService.songToEdit$.subscribe((song) => {
      this.isSongEdited = true;
      this.artistValue = song.artist;
      this.songValue = song.song;
      this.votes = song.votes;
      this.songId = song.id;
    });
  }

  addSong() {
    const date = new Date().getTime();
    if (this.songForm.valid) {
      this.songsService
        .addSong(this.artistValue, this.songValue, date)
        .subscribe((song) => {
          this.songsService.updateSongToAdd(song);
          this.songForm.resetForm();
        });
    }
  }

  saveEditedSong() {
    this.songsService
      .editSong(this.songId, this.artistValue, this.songValue)
      .subscribe((song) => {
        this.isSongEdited = false;
        this.songsService.updateEditedSong(song);
        this.songForm.resetForm();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
