import { Component, ViewChild } from '@angular/core';

interface ListItem {
  id: number;
  title: string;
  completed: boolean;
  listId: number;
  editable: boolean;
}

interface List {
  id: number;
  title: string;
  newItem: string;
  items: ListItem[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('inputAddNewList')
  inputAddNewList: any;

  newListName: string = '';
  isAddingNewList = false;

  lists = [
    {
      id: 1,
      title: 'List',
      newItem: '',
      items: [
        {
          id: 13,
          title: 'Lotem',
          completed: false,
          listId: 1,
          editable: false,
        },
      ],
    },
  ];

  addNewList() {
    this.lists.push({
      id: (Math.random() * 100) | 0,
      title: this.newListName,
      newItem: '',
      items: [],
    });

    this.newListName = '';
  }

  activeNewList() {
    this.isAddingNewList = true;

    setTimeout(() => {
      this.inputAddNewList.nativeElement.focus();
    }, 50);
  }

  addItemToList(item: List) {
    if (item.newItem) {
      item.items.push({
        id: (Math.random() * 1000) | 0,
        title: item.newItem,
        completed: false,
        listId: item.id,
        editable: false,
      });

      item.newItem = '';
    }
  }

  totalListChecked(list: List) {
    return list.items.filter((l: ListItem) => l.completed).length;
  }

  toggleItem(item: ListItem) {
    item.completed = !item.completed;
    item.editable = false;
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
}
