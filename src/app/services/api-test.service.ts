import { Injectable }    from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class ApiTestService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private TestApiUrl1 = 'https://fay6yt2x63.execute-api.us-east-1.amazonaws.com/Prod';  // URL to static content api  - YES IT IS CASE SENSITIVE!!! CANT USE 'prod' lowercase p
  private TestApiUrl2 = 'https://ogo1meqqfc.execute-api.us-east-1.amazonaws.com/prod';  // URL to dynamic response api


  constructor(private http: Http) { }


  /* API Testing from AWS Lambda */
  // (MUST ENABLE CORS VIA THE AWS API GATEWAY IF ACCESSING FROM A NON-AWS LOCATION)
  getStaticHtmlData(): Promise<string>  {

    /*let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, OPTIONS');
    let options = new RequestOptions({ headers: headers });*/

    return this.http.get(this.TestApiUrl1)
               .toPromise()
               .then(response => {
                if (response.ok != true || response.status != 200) { return "Request failed: " + response.status; }
                else { return response.text(); }  // since this is a text/html response, we need to access the body via text()
               }) 
               .catch(this.handleError);
  }


  getDynamicDataTest(requestData: any): Promise<string>  {    

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let payload = JSON.stringify(requestData);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.TestApiUrl2, payload, options)
               .toPromise()
               .then(response => {
                if (response.ok != true || response.status != 200) { return "Request failed: " + response.status; }
                else { return response.json(); } 
               }) 
               .catch(this.handleError);
  }

  getDynamicDataTestSlowly(requestData: any): Promise<string>  { 
    return new Promise(resolve => {
      // Simulate server latency with 2.5 second delay
      setTimeout(() => resolve(this.getDynamicDataTest(requestData)), 2500);
    });
  }




/* Dan's AWS API Test Functions  */
/*--------------------------------------------------------*/
getTrackList(): Promise<any>  {
  return this.http.get('http://mci-gatewayapp.npz5eihin9.us-east-2.elasticbeanstalk.com/v1/tracks')
               .toPromise()
               .then(response => {
                if (response.ok != true || response.status != 200) { return "Request failed: " + response.status; }
                else { return response.json(); }
               }) 
               .catch(this.handleError);
}
streamTestTrack(trackId: string): Promise<any>  {
  let endpoint = 'http://mci-gatewayapp.npz5eihin9.us-east-2.elasticbeanstalk.com/v1/stream/' + trackId;
  return this.http.get(endpoint)
              .toPromise()
              .then(response => {
              if (response.ok != true || response.status != 200) { return "Request failed: " + response.status; }
              else { return response.json(); } 
              }) 
              .catch(this.handleError);
}


/* Utility functions */
/* ------------------------------------------------------- */
  private handleError(error: any): Promise<any> {
    console.error('An error occurred and was caught by Angular: ', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }




} // End class

