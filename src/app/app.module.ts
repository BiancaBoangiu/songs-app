import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongFormComponent } from './songs/components/song-form/song-form.component';
import { SongsListComponent } from './songs/components/songs-list/songs-list.component';
import { SongDetailsComponent } from './songs/components/song-details/song-details.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TruncatePipe } from './songs/truncate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SongFormComponent,
    SongsListComponent,
    SongDetailsComponent,
    TruncatePipe,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
