import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenPayload } from 'shared/dto/payload';
import { Register } from 'shared/dto/register.dto';
import { updateService } from 'src/services/update.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: false
})
export class UserProfileComponent implements OnInit {
  //Variables ausr
  users: Register[] = [];
  userId!: number;
  userInfo: Register | null = null;
  loading: boolean = false;

  constructor(
    private readonly _updateService: updateService,
    private readonly routes: ActivatedRoute
  ) { }

  ngOnInit() {
    //  Toma el ID desde la URL
    this.userId = Number(this.routes.snapshot.paramMap.get('userId'));
    if (this.userId) {
      this.loadUser();
    }
    console.log(this.users)
  }

  loadUser(): void {
    this._updateService.getUserInfo(this.userId).subscribe({
      next: (users) => {
        console.log(users);
        this.userInfo = users;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
