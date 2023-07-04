import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() hasSideNav!: boolean
  @Input() isAdmin!: boolean
  @Output() toggleSideNav = new EventEmitter()
  constructor() { }

  ngOnInit() {
  }

}
