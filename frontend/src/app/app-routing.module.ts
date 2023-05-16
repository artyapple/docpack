import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren:()=>import('./main-board').then((m)=>m.MainBoardModule)
  },
  {
    path:'doc',
    loadChildren:()=>import('./doc-view').then((m)=>m.DocViewModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
