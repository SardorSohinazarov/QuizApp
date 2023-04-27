import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';

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
  public ariavaluenow : number = (this.currentQuestion/this.questionList.length) * 100
  public points : number = 0
  counter = 60

  constructor(private questionService: QuestionService){}

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions()
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
    if(option.currect == null){
      this.points -= 10
      this.inCorrectQuestion ++
      this.currentQuestion ++
    }
    if(option.currect === true){
      this.points += 10
      this.CorrectQuestion ++
      this.currentQuestion ++
    }
  }
}
