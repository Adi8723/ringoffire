import { Component, Input, OnInit } from '@angular/core';
import { GameComponent } from '../game/game.component';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() name:any;
  @Input() image = 'men1.png';
  @Input() playerAktiv:boolean = false;


  constructor(public gamecomp: GameComponent){}

  ngOnInit(): void {
  }

  
}
