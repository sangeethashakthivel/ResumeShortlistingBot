import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {ResumeService} from '../services/resume-service.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';

  @Output() close = new EventEmitter<void>(); // emit close event

  constructor(private router: Router,
              private authService: AuthService,
              private toastr: ToastrService) {
  }

  login() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/admin']);
      // this.close.emit(); // ✅ close popup after successful login
    } else {
      this.toastr.error('Invalid Credential Please try with proper credentials!', 'Error');
    }
  }

  cancel() {
    this.close.emit(); // ✅ close popup on cancel
  }
}
