import { IContact } from '../../contact.model';
import { ContactService } from '../../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  id: number;
  form: FormGroup;
  constructor(public router: Router, private route: ActivatedRoute, private fb: FormBuilder, private contactService: ContactService) {
    this.route.params.subscribe(p => this.id = p.id);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.id],
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-z]*$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-z]*$')]],
      phones: this.fb.array([]),
    });

    if (this.id) {
      if (history.state.contact) {
        const contact: IContact = { ...history.state.contact };
        this.form.patchValue(contact);
        contact.phones.map(p => this.addPhone(p));
      } else {
        this.contactService.getItem(this.id).subscribe(c => {
          this.form.patchValue(c);
          c.phones.map(p => this.addPhone(p));
        });
      }
    } else {
      this.addPhone();
    }
  }

  get phones(): FormArray {
    return this.form.controls.phones as FormArray;
  }

  addPhone(value = ''): void {
    this.phones.push(this.fb.control(value, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10)]));
  }

  removePhone(index: number): void {
    this.phones.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.valid) {
      const contact: IContact = { ...this.form.getRawValue() };
      if (contact.id) {
        this.contactService.update(contact.id, contact).subscribe(() => this.router.navigateByUrl('contacts'));
      } else {
        this.contactService.post(contact).subscribe(() => this.router.navigateByUrl('contacts'));
      }
    } else {
      alert('Form is invalid');
    }
  }

}
