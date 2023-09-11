import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';

// const router: Routes = [
//   { path: '', component: SettingsComponent }
// ]

const routes: Routes = [
  {
    path: '', component: SettingsComponent, canActivate: [AuthGuard], children: [
      // { path: '', component: RecipeStartComponent },
      // { path: 'add-admin', component: RecipeEditComponent },
      // { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
      // { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] },
      { path: 'control', loadChildren: () => import('src/app/admin/admin.module').then(m => m.AdminModule) },
    ]
  },
];

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    SettingsComponent
  ]
})
export class SettingsModule { }
