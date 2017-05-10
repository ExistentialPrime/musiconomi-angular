import { Component }          from '@angular/core';

declare var swal: any;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  loginComingSoon() { 
      swal('Coming Soon', 'This should display a login modal to connect to the users Musicoin.org account', 'success');
  }
}
