import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
      iconRegistry.addSvgIcon(
        'menu',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/menu.svg'));
      iconRegistry.addSvgIcon(
        'computer',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/computer.svg'));
      iconRegistry.addSvgIcon(
        'company',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/company.svg'));
     }

  ngOnInit() {
  }

}
