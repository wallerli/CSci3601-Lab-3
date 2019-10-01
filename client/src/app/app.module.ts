import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {UserListComponent} from './users/user-list.component';
import {TodoListComponent} from './todos/todo-list.component';
import {UserListService} from './users/user-list.service';
import {TodoListService} from './todos/todo-list.service';
import {Routing} from './app.routes';
import {APP_BASE_HREF} from '@angular/common';

import {CustomModule} from './custom.module';
import {UserComponent} from './users/user.component';
import {TodoComponent} from './todos/todo.component';
// import {MatSelectModule} from '@angular/material/select';
// import {MatFormFieldModule, MatOptionModule} from '@angular/material';

@NgModule({
  imports: [
    // MatOptionModule,
    BrowserModule,
    HttpClientModule,
    Routing,
    CustomModule,
    // MatSelectModule,
    // MatFormFieldModule,
  ],
  exports: [
    // MatOptionModule,
    BrowserModule,
    HttpClientModule,
    CustomModule,
    // MatSelectModule,
    // MatFormFieldModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    UserListComponent,
    TodoListComponent,
    UserComponent,
    TodoComponent,

  ],
  providers: [
    UserListService,
    TodoListService,
    {provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
