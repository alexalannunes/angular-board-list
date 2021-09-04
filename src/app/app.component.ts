import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'test-list-board';

  a = 'çaex';

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
    this.lists.push({
      id: (Math.random() * 100) | 0,
      title: 'List',
      newItem: '',
      items: [],
    });
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
