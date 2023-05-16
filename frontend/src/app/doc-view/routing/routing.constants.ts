import {Route} from '@angular/router';
import {DocViewComponent} from "../components/doc-view/doc-view.component";

export const routes: Array<Route> = [
  {
    path: '',
    //component: MainBoardComponent,
    children: [{path: '', component: DocViewComponent}]
  },
];
