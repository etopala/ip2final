import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog'
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatStepperModule} from '@angular/material/stepper';



const MatModuller= [
  MatDialogModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatDividerModule,
  MatCardModule,
  MatSidenavModule,
  MatListModule,
  MatTableModule,
  MatTooltipModule,
  MatSortModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatMenuModule,
  MatProgressBarModule,
  MatRadioModule,
  MatStepperModule,
];

@NgModule({
  imports: [MatModuller],
  exports: [MatModuller]
})
export class MaterialModule { }
