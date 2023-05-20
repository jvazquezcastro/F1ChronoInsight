  import { NgModule } from '@angular/core';
  import {MatToolbarModule} from '@angular/material/toolbar'
  import { MatIconModule } from '@angular/material/icon'
  import { MatDividerModule} from '@angular/material/divider'
  import { MatGridListModule} from '@angular/material/grid-list'
  import { MatChipsModule } from '@angular/material/chips'
  import { MatTableModule } from '@angular/material/table';
  import {MatButtonModule} from '@angular/material/button';
  import { MatCardModule } from '@angular/material/card';





  @NgModule({
    exports:[
      MatToolbarModule,
      MatIconModule,
      MatDividerModule,
      MatGridListModule,
      MatChipsModule,
      MatTableModule,
      MatButtonModule,
      MatCardModule
    ]
  })
  export class MaterialModule { }
