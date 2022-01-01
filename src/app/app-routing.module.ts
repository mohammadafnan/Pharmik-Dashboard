import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { BlogComponent } from './blog/blog.component';
import { CategoriesComponent } from './categories/categories.component';
import { CouponComponent } from './coupon/coupon.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FaqsComponent } from './faqs/faqs.component';
import { OrdermanagmentComponent } from './ordermanagment/ordermanagment.component';
import { PagesComponent } from './pages/pages.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './user-pages/login/login.component';


const routes: Routes = [
  { path: '', redirectTo: 'user-pages/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'category', component: CategoriesComponent },
  { path: 'product', component: ProductsComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'page', component: PagesComponent },
  { path: 'banner', component: BannerComponent },
  { path: 'order', component: OrdermanagmentComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'coupon', component: CouponComponent },
  { path: 'basic-ui', loadChildren: () => import('./basic-ui/basic-ui.module').then(m => m.BasicUiModule) },
  { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsDemoModule) },
  { path: 'forms', loadChildren: () => import('./forms/form.module').then(m => m.FormModule) },
  { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
  { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
  { path: 'general-pages', loadChildren: () => import('./general-pages/general-pages.module').then(m => m.GeneralPagesModule) },
  { path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule) },
  {
    path: 'user-pages/login',
    component: LoginComponent
  },
  { path: 'error-pages', loadChildren: () => import('./error-pages/error-pages.module').then(m => m.ErrorPagesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
