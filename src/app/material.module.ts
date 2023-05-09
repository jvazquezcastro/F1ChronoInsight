  import { NgModule } from '@angular/core';
  import {MatToolbarModule} from '@angular/material/toolbar'
  import { MatIconModule } from '@angular/material/icon'
  import { MatDividerModule} from '@angular/material/divider'
  import { MatGridListModule} from '@angular/material/grid-list'
  import { MatChipsModule } from '@angular/material/chips'



  @NgModule({
    exports:[
      MatToolbarModule,
      MatIconModule,
      MatDividerModule,
      MatGridListModule,
      MatChipsModule
    ]
  })
  export class MaterialModule { }