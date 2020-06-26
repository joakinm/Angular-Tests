import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f',{static: false}) singupForm:NgForm;
  defaultQuestion="pet";
  answer = "";
  genders= ["Male", "Female"];
  user={
    username:'',
    email:'',
    SecretQuestion:'',
    answerQuestion:'',
    gender:''
  };
  submitted= false;
  suggestUserName() {
    const suggestedName = 'Superuser';
    this.singupForm.form.patchValue({nombre: suggestedName});
  }
  onSubmit(form: NgForm){
    this.user.username = this.singupForm.value.nombre;
    this.user.email = this.singupForm.value.mail;
    this.user.SecretQuestion = this.singupForm.value.secreto;
    this.user.answerQuestion = this.singupForm.value.questionAnswer;
    this.user.gender = this.singupForm.value.Genero; 
    this.submitted = true;
    this.singupForm.form.reset();
  }

  
}
