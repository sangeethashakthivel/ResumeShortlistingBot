import {Component} from '@angular/core';
import {ResumeService} from '../services/resume-service.service';
import {ToastrService} from 'ngx-toastr';
import {ResumeDTO} from './resume.dto';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent {
  selectedFile!: File | null;
  jobDescription = '';
  jobTitle = '';
  candidateName = '';
  uploadResult: ResumeDTO | null = null;

  constructor(
    private resumeService: ResumeService,
    private toastr: ToastrService
  ) {
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadResume() {
    if (!this.selectedFile || !this.jobDescription || !this.jobTitle || !this.candidateName) {
      this.toastr.warning('Please fill in all fields and select a resume.', 'Missing Data');
      return;
    }

    this.resumeService.uploadResume(
      this.selectedFile,
      this.jobDescription,
      this.jobTitle,
      this.candidateName
    )
      .subscribe({
        next: (res) => {
          this.uploadResult = res; // assign API response
          this.toastr.success('Resume uploaded successfully!', 'Success');

          // reset fields
          this.selectedFile = null;
          this.jobDescription = '';
          this.jobTitle = '';
          this.candidateName = '';
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('Error uploading resume. Try again!', 'Error');
        }
      });
  }
}
