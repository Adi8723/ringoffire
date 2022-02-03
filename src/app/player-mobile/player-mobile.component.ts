import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-mobile',
  templateUrl: './player-mobile.component.html',
  styleUrls: ['./player-mobile.component.scss']
})
export class PlayerMobileComponent implements OnInit {

  @Input() name:any;
  @Input() image = 'men1.png';
  @Input() playerAktiv:boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
