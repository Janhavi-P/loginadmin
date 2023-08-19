//import { Component } from '@angular/core';

// @Component({
//   selector: 'app-log',
//   templateUrl: './log.component.html',
//   styleUrls: ['./log.component.scss']
// })
// export class LogComponent {

// }

import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})

export class LogComponent implements OnInit {

  hide: boolean = false;

  constructor(private fb: FormBuilder,private router:Router) {
  }

  ngOnInit() {
  }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })


  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
  //   console.log(this.loginForm.value);
   }
  todashboard(): void {
    this.router.navigate(['/home']);
  }
  
}