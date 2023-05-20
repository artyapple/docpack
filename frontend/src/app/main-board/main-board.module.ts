import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainBoardComponent} from "./components/main-board/main-board.component";
import {MainBoardRoutingModule} from "./routing/main-board-routing.module";
import {FormsModule} from "@angular/forms";
import { DocsGridComponent } from './components/docs-grid/docs-grid.component';
import { SidebarMainComponent } from './components/sidebar-main/sidebar-main.component';
import {SharedModule} from "../shared/shared.module";
import {DocViewModule} from "../doc-view/doc-view.module";
import { NameEditWindowComponent } from './components/name-edit-window/name-edit-window.component';
@NgModule({
  declarations: [
    MainBoardComponent,
    DocsGridComponent,
    SidebarMainComponent,
    NameEditWindowComponent
  ],
  imports: [
    CommonModule,
    MainBoardRoutingModule,
    FormsModule,
    SharedModule,
    DocViewModule
  ]
})
export class MainBoardModule { }
