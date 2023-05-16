import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarDocsComponent } from './components/sidebar-docs/sidebar-docs.component';
import { FileViewerComponent } from './components/file-viewer/file-viewer.component';
import {ReactiveFormsModule} from "@angular/forms";
import {DocViewRoutingModule} from "./routing/doc-view-routing.module";
import {DocViewComponent} from "./components/doc-view/doc-view.component";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    SidebarDocsComponent,
    FileViewerComponent,
    DocViewComponent
  ],
  exports: [
    FileViewerComponent,
    SidebarDocsComponent
  ],
  imports: [
    CommonModule,
    DocViewRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class DocViewModule { }
