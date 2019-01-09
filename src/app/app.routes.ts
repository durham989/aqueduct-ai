import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';
import { BlogComponent } from './blog/blog.component';
import { IndividualBlogComponent } from './blog/individual-blog.component';
import { WaterUtilityComponent } from './landing-pages/water-utility.component';
import { WastewaterFacilityComponent } from './landing-pages/wastewater-facility.component';
import { FarmFishBlogPostComponent } from './blog/farm-fish-post.component';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'blog',  component: BlogComponent },
  // { path: 'blog/blog-post',  component: IndividualBlogComponent },
  { path: 'blog/technological-solution-for-aging-water-infrastructure',  component: IndividualBlogComponent },
  { path: 'blog/farmer-vs-fish-water-crisis-in-california',  component: FarmFishBlogPostComponent },
  { path: 'water-utility',  component: WaterUtilityComponent },
  { path: 'wastewater-facility',  component: WastewaterFacilityComponent },
  { path: 'detail', loadChildren: './+detail#DetailModule'},
  { path: 'barrel', loadChildren: './+barrel#BarrelModule'},
  { path: '**',    component: NoContentComponent },
];
