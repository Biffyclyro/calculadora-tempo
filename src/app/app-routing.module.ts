import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CalculadoraComponent} from './calculadora/calculadora.component'

const routes: Routes = [{path: '', component: CalculadoraComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
