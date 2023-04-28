import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  public name: string = ""
  public questionList : any = []
  public currentQuestion : number = 0
  public inCorrectQuestion : number = 0
  public CorrectQuestion : number = 0
  public ariavaluenow : number = 0
  public ariavaluenowString: string = this.ariavaluenow.toString()
  public points : number = 0
  public progress : string = "0"
  public isQuizComplated : boolean = false
  counter = 60
  interval$ : any

  constructor(private questionService: QuestionService){}

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions()
    this.startCounter()
  }

  getAllQuestions(){
    this.questionService.getQuestionsJson()
    .subscribe(res =>{
      console.log(res.questions)
      this.questionList = res.questions
    })
  }

  pageRight(){
    if(this.currentQuestion < this.questionList.length -1){
      this.currentQuestion += 1

    }
  }

  pageLeft(){
    if(this.currentQuestion > 0){
      this.currentQuestion -= 1

    }
  }

  answer(option : any){
    if(this.currentQuestion === this.questionList.length - 1){
      setTimeout(() =>{
        this.isQuizComplated = true
      },1000);
      this.stopCounter()
    }

    if(option.currect === true){
      this.points += 10
      this.CorrectQuestion ++
      setTimeout(() =>{
        this.currentQuestion ++
        this.resetCounter()
        this.getProgressPersent()
      }, 500);
    }

    if(option.currect == null){
      this.points -= 10
      this.inCorrectQuestion ++
      setTimeout(() =>{
        this.currentQuestion ++
        this.resetCounter()
        this.getProgressPersent()
      }, 500);
    }

  }

  startCounter(){
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.counter --
        if(this.counter === 0){
          this.currentQuestion ++
          this.counter = 60
        }
      })
      setTimeout(() => {
        this.interval$.unsubscribe()
      }, 600000);
  }

  stopCounter(){
    this.interval$.unsubscribe()
    this.counter = 0
  }

  resetCounter(){
    this.stopCounter()
    this.counter = 60
    this.startCounter()
  }

  resetGame(){
    this.resetCounter()
    this.getAllQuestions()
    this.points = 0
    this.counter = 60
    this.currentQuestion = 0
    this.progress = "0"
  }

  getProgressPersent(){
    this.progress = ((this.currentQuestion/this.questionList.length) * 100).toString()
    return this.progress
  }
}
