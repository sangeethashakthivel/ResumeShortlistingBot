import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-popup-form',
  templateUrl: './admin-popup-form.component.html',
  styleUrls: ['./admin-popup-form.component.scss']
})
export class AdminPopupFormComponent implements OnInit {
  @Input() fields: { name: string; label: string; type: string; value?: any }[] = [];
  @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const group: any = {};
    this.fields.forEach(f => {
      group[f.name] = [f.value || '', Validators.required];
    });
    this.form = this.fb.group(group);
  }

  submit() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
      this.close.emit();
    }
  }

  cancel() {
    this.close.emit();
  }
}
