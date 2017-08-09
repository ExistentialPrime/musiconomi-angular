import { Component, OnInit, ViewChild } from '@angular/core';

import { ApiTestService } from '../../services/api-test.service';

declare var swal: any;

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html'
})
export class LandingPageComponent implements OnInit {

  // Properties
  public staticContent : string;
  public dynamicContent : any;
  public dynamicInput: string;
  public dynamicIsLoading: boolean;
  public trackList: Array<any>;
  @ViewChild('audioplayer') player: any;  // Grab the <audio> element tagged as '#audioplayer' in the front ent
  public selectedTrack: any;


  // Lazy iframe method of showing the end point is work and providing data. We wouldnt want to use iframes in production
  public iframeSrc: string = "https://fay6yt2x63.execute-api.us-east-1.amazonaws.com/Prod";
  public showIframe: boolean;

  // Constructor (dependency injection only)
  constructor(
    private apiTestService: ApiTestService,
  ) { }
  
  // Initialize the component
  ngOnInit(): void {
      this.staticContent = "<h4>Press button to load static content via API</h4>";
      this.dynamicContent = "<h4>Press button to load dynamic content via API</h4>"
      this.dynamicIsLoading = false;
      this.showIframe = false;

      // Automatically fetch tracks
      this.getTracks();      
  }

  loadDynamicApiData(): void {
      this.dynamicIsLoading = true;
      let requestData : any = {}; 
      requestData.name = this.dynamicInput ? this.dynamicInput : "No-Name-Supplied-Client-Handled"; // Our API is looking for event.name
      this.apiTestService.getDynamicDataTestSlowly(requestData)
        .then(result => {
          this.dynamicContent = result;
          this.dynamicIsLoading = false;
      });
  }


  loadStaticApiData(): void {
      this.apiTestService.getStaticHtmlData()
        .then(result => this.staticContent = result);
      this.showIframe = true;
  }


  getTracks(): void { 
    this.apiTestService.getTrackList()
        .then(result => this.trackList = result);
  }
  // Example Return json: [{"id":"1","title":"My Track","audioUrl":"http://audio1","imageUrl":"http://imageUrl1"},{"id":"2","title":"Your Track","audioUrl":"http://audio2","imageUrl":"http://imageUrl2"},{"id":"4","title":"Another track","audioUrl":"http://audio4","imageUrl":"http://imageUrl4"}]


  streamTrack(trackId: any): void {
    
    this.selectedTrack = this.trackList.find((object) => { return object.id == trackId; } )
    this.player.nativeElement.src = 'http://mci-gatewayapp.npz5eihin9.us-east-2.elasticbeanstalk.com/v1/stream/' + trackId;
    this.player.nativeElement.play();

    /* hmm, this doesnt work, but passing the URL does, odd  
    this.apiTestService.streamTestTrack(trackId)
        .then(result => {
          this.player.nativeElement.src = result;
          this.player.nativeElement.load(); // maybe we dont need to load if we fetch the element??
          this.player.nativeElement.play();
        });
      */
  }

}
