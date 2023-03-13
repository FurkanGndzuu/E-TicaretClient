import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, ValidationErrors } from '@angular/forms';
import { Create_User } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/User';
import { MessageType, Position } from 'src/app/services/admin/alertify.service';
import { UserService } from 'src/app/services/common/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
constructor(private formBuilder : FormBuilder , private userService : UserService , private toastrService : CustomToastrService){

}

 frm : FormGroup;

ngOnInit() : void{
  this.frm = this.formBuilder.group({
    nameSurname : ["" , [
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(3)
    ]],
    username : ["" , [
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(3)
    ]],
    email : ["" , [
      Validators.required , 
      Validators.email,
      Validators.minLength(3)
    ]],
    password : ["" , [
      Validators.required
    ]],
    passwordConfirm : ["" , [
      Validators.required
    ]]
  },{
    validators: (group: AbstractControl): ValidationErrors | null => {
      let sifre = group.get("password").value;
      let sifreTekrar = group.get("passwordConfirm").value;
      return sifre === sifreTekrar ? null : { notSame: true };
    }
  }
  )
}

get component(){
  return this.frm.controls;
}

submitted : boolean = false
async onSubmit(user : User){
    this.submitted = true;
    if (this.frm.invalid)
          return;

    const result  : Create_User =await this.userService.create(user);

    if(!result.succeed){
      this.toastrService.message(result.message , "User Membership" , {
        messageType : ToastrMessageType.Success,
        position : ToastrPosition.TopRight
      })
    }
    else{
      this.toastrService.message(result.message , "User Membership",{
        messageType : ToastrMessageType.Error,
        position : ToastrPosition.TopRight
      })
    }
}

}
