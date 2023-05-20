import {Route} from '@angular/router';
import {MainBoardComponent} from '../components/main-board/main-board.component';
import {DocViewComponent} from "../../doc-view/components/doc-view/doc-view.component";
import {NameEditWindowComponent} from "../components/name-edit-window/name-edit-window.component";

export const routes: Array<Route> = [
  {
    path: '',
    //component: MainBoardComponent,
    children: [{path: '', component: MainBoardComponent},{path: 'create-folder', component: NameEditWindowComponent}]
  },
];
