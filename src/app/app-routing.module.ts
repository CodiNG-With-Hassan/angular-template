import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutes } from '@Enums/routes.enum';

import { NotFoundComponent } from './shared/pages/not-found/not-found.component';

const routes: Routes = [
  { path: AppRoutes.Other, redirectTo: AppRoutes.NotFound },
  { path: AppRoutes.NotFound, component: NotFoundComponent },
];

@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}
