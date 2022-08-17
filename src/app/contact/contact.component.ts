import { Component, ElementRef, ErrorHandler, OnInit, ViewChild, } from '@angular/core';
import { ContactFeedbackInterface } from '../models/contact-form.models';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  isCallingAPI: boolean = false;
  isSubmitted: boolean = false;
  name: string = '';
  email: string = '';
  desc: string = '';

  @ViewChild('txtName') txtName?: ElementRef;
  @ViewChild('txtEmail') txtEmail?: ElementRef;
  @ViewChild('txtDesc') txtDesc?: ElementRef;

  
  constructor(private service: ContactService) { }
  
  ngOnInit(): void {
  }
  
    sendForm() {
      this.isCallingAPI = true;
      this.service.sendContactForm({
        name : this.txtName!.nativeElement.value,
        email : this.txtEmail!.nativeElement.value,
        desc : this.txtDesc!.nativeElement.value
      }).subscribe({
        next:(output:ContactFeedbackInterface)=>{
          this.isCallingAPI = false;
          if(output.status){
            this.name = this.txtName!.nativeElement.value;
            this.email = this.txtEmail!.nativeElement.value;
            this.desc = this.txtDesc!.nativeElement.value;
            this.isSubmitted = true;
          }
      },
        error:()=>{
          console.log('server output', Error );
          this.isCallingAPI = false;
        }
      });
    }




  // ***sendForm function without API***
  // sendForm() {
  //   this.isCallingAPI=true;
  //   this.service.sendContactForm({
  //     name:this.name,
  //     email:this.email,
  //     desc:this.desc,
  //   });
  // }
  // sendForm() {
  //   this.isSubmitted = true;
  //   this.name = this.txtName!.nativeElement.value;
  //   this.email = this.txtEmail!.nativeElement.value;
  //   this.desc = this.txtDesc!.nativeElement.value;
  // }

  // ***sendForm function with API***
  // sendForm() {
  //   this.isCallingAPI = true;
  //   this.service.sendContactForm({
  //     name : this.txtName!.nativeElement.value,
  //     email : this.txtEmail!.nativeElement.value,
  //     desc : this.txtDesc!.nativeElement.value
  //   }).subscribe(output => {
  //     this.isCallingAPI = false;
  //     if(output.status){
  //       this.name = this.txtName!.nativeElement.value;
  //       this.email = this.txtEmail!.nativeElement.value;
  //       this.desc = this.txtDesc!.nativeElement.value;
  //       this.isSubmitted = true;
  //     }
  //   },error  => {
  //     console.log('server output', error);
  //     this.isCallingAPI = false;
  //   });
  // }
}
