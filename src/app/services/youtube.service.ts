import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'XXXXXXXXXXXXX';
  private playlist = 'XXXXXXXXXXX';
  private nextPageToken = '';

  constructor(public http: HttpClient) { }

  getVideos(){
    const url = `${ this.youtubeUrl }/playlistItems`;

    /*const paramsObject = new HttpParams({
      fromObject:{
        part: 'snippet',
        maxResults: '10',
        playlistId: this.playlist,
        key: this.apiKey,
      }
    });*/

    let paramsObject = new HttpParams().set('part', 'snippet').set('maxResults', '10').set('playlistId', this.playlist).set('key', this.apiKey);

    if( this.nextPageToken ){
      paramsObject.set('pageToken', this.nextPageToken);
    }

    return this.http.get(url, { params: paramsObject }).pipe(map(res => {
      //console.log(res);

      this.nextPageToken = res.nextPageToken;

      let videos:any[] = [];

      for(let video of res.items){
        let snippet = video.snippet;
        videos.push(snippet);
      }

      return videos;
    }));
  }
}
