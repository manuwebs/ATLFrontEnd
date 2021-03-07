import { ITable } from '../../../../shared/components/table.model';
import { ContactService } from '../../services/contact.service';
import { IContact } from '../../contact.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-home',
  templateUrl: './contact-home.component.html',
  styleUrls: ['./contact-home.component.scss']
})
export class ContactHomeComponent implements OnInit {

  contacts: IContact[];
  template: ITable[] = [
    // {
    //   property: 'id',
    // },
    {
      property: 'firstName',
      displayName: 'First Name'
    },
    {
      property: 'lastName',
      displayName: 'Last Name'
    },
    {
      property: 'phones',
      displayName: 'Phone(s)'
    }
  ];
  selectedItem: IContact;

  constructor(
    public contactService: ContactService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.contactService.refreshItems();
    this.contactService.items.subscribe(c => this.contacts = c);
  }

  addContact(): void {
    this.router.navigateByUrl('add');
  }

  editContact(): void {
    this.router.navigateByUrl(`edit/${this.selectedItem.id}`, { state: { contact: this.selectedItem } });
  }

  deleteContact(): void {
    if (this.selectedItem) {
      this.contactService.deleteItem(this.selectedItem.id).subscribe(() => {
        this.contacts = this.contacts.filter(c => c.id !== this.selectedItem.id);
        this.selectedItem = undefined;
      });
    } else {
      alert('You need to select an item first');
    }
  }

}
