import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';
import {MatDialog}  from '@angular/material/dialog';

import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { ActivatedRoute } from '@angular/router';
import{AngularFirestore} from '@angular/fire/compat/firestore'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {

  game: Game | any;
  players: any;
  gameId: string = '';

  constructor(private route: ActivatedRoute,private firestore: AngularFirestore, public dialog: MatDialog) { 
   }
      
  

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params)=>{
      console.log(this.gameId);
      this.gameId = params['id'];
      this
        .firestore
        .collection('games')
        .doc(this.gameId)
        .valueChanges()
        .subscribe((game:any)=>{
          console.log('game update', game)
          this.game.players = game.players,
			    this.game.stack = game.stack,
			    this.game.playedCard = game.playedCard,
			    this.game.currentPlayer = game.currentPlayer
          this.game.pickCardAnimation = game.pickCardAnimation,
  			  this.game.currentCard = game.currentCard
        });
    });
  }

  newGame(){
    this.game = new Game();
    
  }

  takeCard(){
    if(!this.game.pickCardAnimation){
      this.game.currentCard = this.game.stack.pop();
      console.log(this.game.currentCard)
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();


      setTimeout(()=>{
        this.game.playedCard.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      },1000)
    }
  }
  

 openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0){
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }
  saveGame(){
    this
        .firestore
        .collection('games')
        .doc(this.gameId)
        .update(this.game.toJson());
  }
}




