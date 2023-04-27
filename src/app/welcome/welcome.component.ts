import { Component, OnInit , ElementRef ,ViewChild } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent implements OnInit{
  @ViewChild('name') nameKey !: ElementRef;
  public routetGame: string = "";
  constructor(){}

  ngOnInit(): void {}

  startGame(){
    if(this.nameKey.nativeElement.value === ""){
      alert("Please enter your name");
      this.routetGame = "welcome";
    }
    localStorage.setItem("name", this.nameKey.nativeElement.value);
    this.routetGame = "question"
  }
}
