import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', title: 'HALE Health Services', redirectTo: '/home', pathMatch: 'full' },
 
  { path: 'registry', loadChildren: () => import('./registry/registry.module').then(m => m.RegistryModule) },
  
  { path: 'vault', loadChildren: () => import('./hale-vault/hale-vault.module').then(m => m.HaleVaultModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  
  { path: 'locations', loadChildren: () => import('./locations/locations.module').then(m => m.LocationsModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },

  { path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule) },
  { path: 'health-covers', loadChildren: () => import('./mcovers/mcovers.module').then(m => m.McoversModule) },
  
  { path: 'econsult', loadChildren: () => import('./econsult/econsult.module').then(m => m.EconsultModule) },
  { path: 'epharmacy', loadChildren: () => import('./epharmacy/epharmacy.module').then(m => m.EpharmacyModule) },

  
  { path: 'subscriptions', loadChildren: () => import('./subscriptions/subscriptions.module').then(m => m.SubscriptionsModule) },
 
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [provideRouter(routes)]
})
export class AppRoutingModule { }
