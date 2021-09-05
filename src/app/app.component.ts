import { Component } from '@angular/core';

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

  addList() {
    const listName = prompt('List name', '');

    if (listName) {
      this.lists.push({
        id: (Math.random() * 100) | 0,
        title: listName,
        newItem: '',
        items: [],
      });
    }
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
  }

  toogleEdit(item: ListItem) {
    item.editable = !item.editable;
  }
}
