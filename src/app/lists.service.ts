import { Injectable } from '@angular/core';
import { NgidService } from './ngid.service';

export interface ListItem {
  id: string;
  title: string;
  completed: boolean;
  listId: string;
  editable: boolean;
}

export interface List {
  id: string;
  title: string;
  newItem: string;
  items: ListItem[];
}

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  lists: List[] = [];

  constructor(private ngId: NgidService) {
    const exists = !!localStorage.getItem('items');

    if (exists) {
      this.lists = JSON.parse(localStorage.getItem('items') || '[]');
    }
  }

  storage() {
    localStorage.setItem('items', JSON.stringify(this.lists));
  }

  addNewList(title: string) {
    const listId = this.ngId.next();
    this.lists.push({
      id: listId,
      title,
      newItem: '',
      items: [],
    });
    this.storage();
  }

  addItemToList(title: string, listId: string) {
    const id = this.ngId.next();

    const list: List | undefined = this.lists.find(
      (list: List) => list.id === listId
    );

    if (list) {
      list.items.push({
        id,
        title: title.trim(),
        completed: false,
        listId,
        editable: false,
      });
    }

    this.storage();
  }

  toggleItem(itemId: string, listId: string) {
    const list: List | undefined = this.lists.find(
      (list: List) => list.id === listId
    );

    const item: ListItem | undefined = list?.items.find(
      (item: ListItem) => item.id === itemId
    );

    if (item) {
      item.completed = !item.completed;
      item.editable = false;
    }

    this.storage();
  }
}
