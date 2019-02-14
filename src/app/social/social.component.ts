import { Component, OnInit } from '@angular/core';
import { SocialLinks } from './links';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {

  socialLinks: SocialLinks = new SocialLinks;

  constructor() { }

  ngOnInit() {
  }

}
