import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Profile } from '../profile.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form: FormGroup;
  editIndex: number;
  passwordMatch = false;
  isDisabled = false;
  profiles: Profile[] = []


  constructor() {
    this.form = new FormGroup({
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'password' : new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern('^[A-Za-z0-9]{8,}$')]),
      'rePassword' : new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern('^[A-Za-z0-9]{8,}$')]),
      'nickname' : new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z0-9\-]*$')]),
      'phoneNumber' : new FormControl(null, [Validators.required, Validators.pattern('^[\+]380[0-9]{9}$'), Validators.maxLength(13)]),
      'website' : new FormControl(null, [Validators.required, Validators.pattern('^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$')]),
      'checkbox' : new FormControl(null, [Validators.required])
    })
  }

  
  ngOnInit(): void {
    this.form.valueChanges.subscribe(value => {
      value.password === value.rePassword && value.password != null ? this.passwordMatch = true : this.passwordMatch = false;
    })
  }

  onEditProfile(editIndex: number) {
    this.form = new FormGroup({
      'email' : new FormControl(this.profiles[editIndex].email, [Validators.required, Validators.email]),
      'password' : new FormControl(this.profiles[editIndex].password, [Validators.required, Validators.minLength(8), Validators.pattern('^[A-Za-z0-9]{8,}$')]),
      'rePassword' : new FormControl(this.profiles[editIndex].password, [Validators.required, Validators.minLength(8), Validators.pattern('^[A-Za-z0-9]{8,}$')]),
      'nickname' : new FormControl(this.profiles[editIndex].nickname, [Validators.required, Validators.pattern('^[A-Za-z0-9\-]*$')]),
      'phoneNumber' : new FormControl(this.profiles[editIndex].phoneNumber, [Validators.required, Validators.pattern('^[\+]380[0-9]{9}$'), Validators.maxLength(13)]),
      'website' : new FormControl(this.profiles[editIndex].website, [Validators.required, Validators.pattern('^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$')]),
      'checkbox' : new FormControl(true, [Validators.required])
    })

    this.editIndex = editIndex;

    this.passwordMatch = true;
    this.isDisabled = true;

    this.form.valueChanges.subscribe(value => {
      value.password === value.rePassword && value.password != null ? this.passwordMatch = true : this.passwordMatch = false;
    })
    
  }

  onNewProfile() {
    if(this.form.valid) {
      this.profiles.push(
        {email: this.form.value.email, password: this.form.value.password, nickname: this.form.value.nickname, phoneNumber: this.form.value.phoneNumber, website: this.form.value.website}
      );
      this.form.reset();
    }
  }
  
  onEditclick() {
    if(this.form.valid) {
      console.log("clicked");
      this.profiles[this.editIndex] = {email: this.form.value.email, password: this.form.value.password, nickname: this.form.value.nickname, phoneNumber: this.form.value.phoneNumber, website: this.form.value.website};
      this.form.reset();
    }

    this.isDisabled = false;
  }
}
