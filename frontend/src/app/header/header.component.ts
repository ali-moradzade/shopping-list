import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSubscription: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes()
      .subscribe(recipes => {
        console.log(recipes);
      });
  }

  onLogout() {
    this.authService.logout();
  }
}
