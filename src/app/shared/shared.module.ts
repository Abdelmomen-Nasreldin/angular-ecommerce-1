import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingDesignComponent } from './Components/loading-design/loadingDesign.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import {
  bootstrapInstagram,
  bootstrapFacebook,
  bootstrapTiktok,
  bootstrapTwitter,
  bootstrapLinkedin,
  bootstrapYoutube,
  bootstrapStarFill,
} from '@ng-icons/bootstrap-icons';
import { NgIconsModule } from '@ng-icons/core';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { ToastrModule } from 'ngx-toastr';
import { SearchPipe } from './pipes/search.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoadingDesignComponent, HeaderComponent, FooterComponent,NotFoundComponent, SearchPipe],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({
      bootstrapInstagram,
      bootstrapFacebook,
      bootstrapTiktok,
      bootstrapTwitter,
      bootstrapLinkedin,
      bootstrapYoutube,
      bootstrapStarFill,
    }),
    RouterModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    FormsModule
  ],
  exports: [
    LoadingDesignComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    NgIconsModule,
    ToastrModule,
    SearchPipe,
    FormsModule
  ],
})
export class SharedModule {}
