import { Component, OnInit } from '@angular/core';
import { SessionService } from './../Services/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sessionData : any;

  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
    this.sessionData = this.sessionService.getSessionData();
  }

}
