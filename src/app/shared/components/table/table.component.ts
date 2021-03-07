import { ITable } from './../table.model';
import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() template: ITable[];
  @Input() items: any[];
  @Output() selectedItem: EventEmitter<any> = new EventEmitter();
  @Output() add: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  private currentItem: any;

  get displayNames(): string[] {
    return this.template.map(t => t.displayName ?? t.property);
  }

  get properties(): string[] {
    return this.template.map(t => t.property);
  }

  selectItem(item: any): void {
    this.currentItem = this.currentItem === item ? undefined : item;
    this.selectedItem.emit(this.currentItem);
  }

  emit(method: string): void {
    switch (method) {
      case 'add':
        this.add.emit();
        break;

      case 'edit':
        this.edit.emit();
        break;

      case 'delete':
        this.delete.emit();
        break;

      default:
        break;
    }
    this.currentItem = undefined;
  }

}
