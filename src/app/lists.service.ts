import { Injectable } from '@angular/core';
import { NgidService } from './ngid.service';

export interface ListItem {
  id: number;
  title: string;
  completed: boolean;
  listId: number;
  editable: boolean;
}

export interface List {
  id: number;
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
    console.log(ngId.next());
  }

  addNewList(title: string) {
    const listId = this.ngId.next();
    this.lists.push({
      id: listId,
      title,
      newItem: '',
      items: [],
    });
  }

  addItemToList(title: string, listId: number) {
    const id = this.ngId.next();

    const list: List | undefined = this.lists.find(
      (list: List) => list.id === listId
    );

    list &&
      list.items.push({
        id,
        title: title,
        completed: false,
        listId,
        editable: false,
      });
  }

  toggleItem(itemId: number, listId: number) {
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
  }
}
