import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {AdminService} from '../services/admin.service';
import {ToastrService} from 'ngx-toastr';

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

  showPopup: boolean = false;
  popupTitle: string = '';
  popupFields: any[] = [];
  popupType: string = ''; // 'skill', 'jobRole', 'faq'
  editingItem: any = null;

  constructor(private adminService: AdminService,
              private toastr: ToastrService
  ) {
  }

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

  // DELETE METHODS
  deleteFaq(id: number) {
    this.adminService.deleteBotFAQ(id).subscribe(() => {
      this.toastr.success('Deleted successfully!', 'Success');

      this.loadAll();
    });
  }

  deleteSkill(id: number) {
    this.adminService.deleteSkill(id).subscribe(() => {
      this.toastr.success('Deleted successfully!', 'Success');
      this.loadAll()
    });
  }

  deleteJobRole(id: number) {
    this.adminService.deleteJobRole(id).subscribe(() => {
      this.toastr.success('Deleted successfully!', 'Success');
      this.loadAll()
    });
  }

  // POPUP METHODS
  openPopup(type: string, data?: any) {
    this.showPopup = true;
    this.popupType = type;
    this.editingItem = data || null;

    if (type === 'skill') {
      this.popupTitle = data ? 'Edit Skill' : 'Add Skill';
      this.popupFields = [
        {name: 'skillName', type: 'text', value: data?.skillName || ''},
        {name: 'weightage', type: 'number', value: data?.weightage || ''}
      ];
    } else if (type === 'jobRole') {
      this.popupTitle = data ? 'Edit Job Role' : 'Add Job Role';
      this.popupFields = [
        {name: 'title', type: 'text', value: data?.title || ''},
        {name: 'thresholdScore', type: 'number', value: data?.thresholdScore || ''}
      ];
    } else if (type === 'faq') {
      this.popupTitle = data ? 'Edit FAQ' : 'Add FAQ';
      this.popupFields = [
        {name: 'keyword', type: 'text', value: data?.keyword || ''},
        {name: 'answer', type: 'textarea', value: data?.answer || ''}
      ];
    }
  }

  onPopupSave(data: any) {
    if (this.popupType === 'skill') {
      if (this.editingItem) {
        this.adminService.updateSkill(this.editingItem.id, data).subscribe(() => {
          this.toastr.success('Updated successfully!', 'Success');
          this.loadAll()
        });
      } else {
        this.adminService.createSkill(data).subscribe(() => {
          this.toastr.success('Record Created successfully!', 'Success');
          this.loadAll()
        });
      }
    } else if (this.popupType === 'jobRole') {
      if (this.editingItem) {
        this.adminService.updateJobRole(this.editingItem.id, data).subscribe(() => {
          this.toastr.success('Updated successfully!', 'Success');
          this.loadAll()
        });
      } else {
        this.adminService.createJobRole(data).subscribe(() => {
          this.toastr.success('Record Created successfully!', 'Success');
          this.loadAll()
        });
      }
    } else if (this.popupType === 'faq') {
      if (this.editingItem) {
        this.adminService.updateBotFAQ(this.editingItem.id, data).subscribe(() => {
          this.toastr.success('Updated successfully!', 'Success');
          this.loadAll()
        });
      } else {
        this.adminService.createBotFAQ(data).subscribe(() => {
          this.toastr.success('Record Created successfully!', 'Success');
          this.loadAll()
        });
      }
    }

    this.closePopup();
  }

  closePopup() {
    this.showPopup = false;
    this.editingItem = null;
  }
}
