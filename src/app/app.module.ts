// Modules
//-----------------------------------------------------------
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { RouterModule }  from '@angular/router';

// Components
//-----------------------------------------------------------
import { AppComponent }           from './app.component';
import { LandingPageComponent }   from './components/landing/landing-page.component';
import { SiteHeaderComponent }    from './components/header/site-header.component';

// Services
//-----------------------------------------------------------
import { ApiTestService }          from './services/api-test.service';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SiteHeaderComponent,
  ],
  imports: [
    CommonModule,
    HttpModule,
    BrowserModule,
    FormsModule,
    HttpModule,

    // Angular Routes (can do this in seperate file if desired)
    RouterModule.forRoot([
        { path: '', component: LandingPageComponent, pathMatch: 'full' },
        //{ path: 'dashboard', component: DashboardComponent },
        { path: '**', redirectTo: '' }
    ])
  ],
  providers: [ 
    ApiTestService,
  ],
  bootstrap: [ AppComponent ]
})


export class AppModule { }
