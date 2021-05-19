import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'buscar-rota',
    loadChildren: () => import('./pages/buscar-rota/buscar-rota.module').then( m => m.BuscarRotaPageModule)
  },
  {
    path: 'registrar-carona',
    loadChildren: () => import('./pages/registrar-carona/registrar-carona.module').then( m => m.RegistrarCaronaPageModule)
  },
  {
    path: 'confirmar-carona',
    loadChildren: () => import('./pages/confirmar-carona/confirmar-carona.module').then( m => m.ConfirmarCaronaPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registrar-usuario',
    loadChildren: () => import('./pages/registrar-usuario/registrar-usuario.module').then( m => m.RegistrarUsuarioPageModule)
  },
  {
    path: 'recuperar-conta',
    loadChildren: () => import('./pages/recuperar-conta/recuperar-conta.module').then( m => m.RecuperarContaPageModule)
  },
  {
    path: 'manter-veiculo',
    loadChildren: () => import('./pages/manter-veiculo/manter-veiculo.module').then( m => m.ManterVeiculoPageModule)
  },
  {
    path: 'manter-usuario',
    loadChildren: () => import('./pages/manter-usuario/manter-usuario.module').then( m => m.ManterUsuarioPageModule)
  },
  {
    path: 'manter-rota',
    loadChildren: () => import('./pages/manter-rota/manter-rota.module').then( m => m.ManterRotaPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
