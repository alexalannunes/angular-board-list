import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'test-list-board';

  lists = [
    {
      id: 1,
      title: 'List',
      newItem: '',
      items: [
        {
          title: 'Lotem',
          completed: false,
          listId: 1,
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

  addItemToList(item: any) {
    item.items.push({
      title: item.newItem,
      completed: false,
      listId: item.listId,
    });

    item.newItem = '';
  }
}
