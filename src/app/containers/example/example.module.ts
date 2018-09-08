import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamplePageComponent } from './example-page';
import { SharedModule } from '../../shared';
import { ExampleRoutingModule } from './example.routing';
import { ComponentOneComponent } from './component-one/component-one.component';
import { ComponentTwoComponent } from './component-two/component-two.component';


export const COMPONENTS = [
  ComponentOneComponent,
  ComponentTwoComponent,
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ExampleRoutingModule,
  ],
  declarations: [
    ...COMPONENTS,
    ExamplePageComponent
  ],
})
export class ExampleModule {
}
