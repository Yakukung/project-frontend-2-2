import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SigninOrSignupComponent } from './components/signin-or-signup/signin-or-signup.component'
import { HomepageComponent } from './components/homepage/homepage.component'
import { VoteComponent } from './components/vote/vote.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { ProfileComponent } from './components/profile/profile.component'
import { NavbarComponent } from './components/navbar/navbar.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { AllStatComponent } from './components/all-stat/all-stat.component';
import { AdminHomepageComponent } from './components/admin-homepage/admin-homepage.component';
import { ShowUserProfileComponent } from './components/show-user-profile/show-user-profile.component';
import { AdminViewRankingComponent } from './components/admin-view-ranking/admin-view-ranking.component';
import { AdminViewUserComponent } from './components/admin-view-user/admin-view-user.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

export const routes: Routes = [
    { path: 'signin-or-signup', component: SigninOrSignupComponent},
    { path: '', component: HomepageComponent },
    { path: 'vote', component: VoteComponent},
    { path: 'ranking', component: RankingComponent},
    { path: 'profile', component: ProfileComponent },
    { path: 'navbar', component: NavbarComponent },
    { path: 'edit-profile', component: EditProfileComponent },
    { path: 'statistics', component: StatisticsComponent },
    { path: 'all-stat', component: AllStatComponent },
    { path: 'admin-homepage', component: AdminHomepageComponent },
    { path: 'show-user-profile', component: ShowUserProfileComponent},
    { path: 'admin-view-ranking', component: AdminViewRankingComponent },
    { path: 'admin-view-user', component: AdminViewUserComponent },
    { path: 'reset-password', component:  ResetPasswordComponent },

];
