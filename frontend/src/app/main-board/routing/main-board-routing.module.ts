import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {routes} from "./routing.constants";



@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class MainBoardRoutingModule { }
