import { Component, OnInit } from '@angular/core';

declare var swal: any;

@Component({
  selector: 'site-header',
  templateUrl: './site-header.component.html'
})
export class SiteHeaderComponent implements OnInit {

  // Properties
  //TODO

  // Constructor (dependency injection only)
  constructor(
    
  ) { }
  
  // Initialize the component
  ngOnInit(): void {
    
  }

  loginComingSoon() { 
      swal('Coming Soon', 'This should display a login modal eventually', 'success');
  }

}
