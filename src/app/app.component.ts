import { Component, ViewChild } from '@angular/core';
import { List, ListItem, ListsService } from './lists.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private listsService: ListsService) {}

  @ViewChild('inputAddNewList')
  inputAddNewList: any;

  newListName: string = '';
  isAddingNewList = false;

  lists = this.listsService.lists;

  addNewList() {
    this.listsService.addNewList(this.newListName);
    this.newListName = '';
    console.log(this.listsService.lists);
  }

  activeNewList() {
    this.isAddingNewList = true;
    setTimeout(() => {
      this.inputAddNewList.nativeElement.focus();
    }, 50);
  }

  addItemToList(item: List) {
    if (item.newItem) {
      this.listsService.addItemToList(item.newItem, item.id);
      item.newItem = '';
    }
  }

  totalListChecked(list: List) {
    return list.items.filter((l: ListItem) => l.completed).length;
  }

  toggleItem(item: ListItem) {
    this.listsService.toggleItem(item.id, item.listId);
  }

  toogleEdit(item: ListItem) {
    if (!item.editable && !item.completed) {
      setTimeout(() => {
        const input: HTMLInputElement | null = document.querySelector(
          `#list_item__${item.listId}__${item.id}`
        );
        input && input.focus();
      }, 50);
      item.editable = !item.editable;
    }
  }

  blurEditableItem(item: ListItem) {
    item.editable = !item.editable;
  }

  keydownEnter(event: any) {
    if (event.key === 'Enter') {
      this.addNewList();
      this.isAddingNewList = false;
    }
  }

  ao(a: any) {
    console.log(a);
    a.blur();
  }
}
