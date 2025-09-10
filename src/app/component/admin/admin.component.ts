import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  faqs: any[] = [];
  skills: any[] = [];
  jobRoles: any[] = [];

  faqDataSource = new MatTableDataSource<any>();
  skillsDataSource = new MatTableDataSource<any>();
  jobRolesDataSource = new MatTableDataSource<any>();

  faqDisplayedColumns: string[] = ['keyword', 'answer', 'action'];
  skillsDisplayedColumns: string[] = ['skillName', 'weightage', 'action'];
  jobRolesDisplayedColumns: string[] = ['title', 'thresholdScore', 'action'];

  @ViewChild('faqPaginator') faqPaginator!: MatPaginator;
  @ViewChild('skillsPaginator') skillsPaginator!: MatPaginator;
  @ViewChild('jobRolesPaginator') jobRolesPaginator!: MatPaginator;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadAll();
  }


  loadAll() {
    this.adminService.getBotFAQs().subscribe(res => {
      this.faqs = res;
      this.faqDataSource.data = this.faqs;
      this.faqDataSource.paginator = this.faqPaginator;
    });
    this.adminService.getSkills().subscribe(res => {
      this.skills = res;
      this.skillsDataSource.data = this.skills;
      this.skillsDataSource.paginator = this.skillsPaginator;
    });
    this.adminService.getJobRoles().subscribe(res => {
      this.jobRoles = res;
      this.jobRolesDataSource.data = this.jobRoles;
      this.jobRolesDataSource.paginator = this.jobRolesPaginator;
    });
  }

  deleteFaq(id: number) {
    // similar to your existing logic
  }

  deleteSkill(id: number) {}
  deleteJobRole(id: number) {}



  // opupcomponent
  showPopup: boolean = false;
  popupTitle: string = '';
  popupFields: any[] = [];
  popupType: string = ''; // 'skill', 'jobRole', 'faq'

  openPopup(type: string) {
    this.popupType = type;

    if(type === 'skill') {
      this.popupTitle = 'Add New Skill';
      this.popupFields = [
        { name: 'skillName', label: 'Skill Name', type: 'text' },
        { name: 'weightage', label: 'Weightage', type: 'number' }
      ];
    } else if(type === 'jobRole') {
      this.popupTitle = 'Add New Job Role';
      this.popupFields = [
        { name: 'title', label: 'Job Role', type: 'text' },
        { name: 'thresholdScore', label: 'Threshold Score', type: 'number' }
      ];
    } else if(type === 'faq') {
      this.popupTitle = 'Add New FAQ';
      this.popupFields = [
        { name: 'keyword', label: 'Keyword', type: 'text' },
        { name: 'answer', label: 'Answer', type: 'text' }
      ];
    }

    this.showPopup = true;
  }

  onPopupSave(data: any) {
    if(this.popupType === 'skill') {
      this.adminService.createSkill(data).subscribe(() => this.loadAll());
    } else if(this.popupType === 'jobRole') {
      this.adminService.createJobRole(data).subscribe(() => this.loadAll());
    } else if(this.popupType === 'faq') {
      this.adminService.createBotFAQ(data).subscribe(() => this.loadAll());
    }

    this.showPopup = false;
  }

  closePopup() {
    this.showPopup = false;
  }
}
