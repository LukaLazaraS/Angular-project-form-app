import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Profile } from 'src/app/profile.model';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {
  @Input() profile: Profile;
  @Input() profiles: Profile[];
  @Input() index: number;
  @Output() editIndex: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  onDelete(){
    if(confirm("This action will remove a user with this email: " + this.profile.email + "\n\nAre you shure?")) {
      this.profiles.splice(this.index, 1);
    }
  }

  onEdit(){
    this.editIndex.emit(this.index);    
  }

  ngOnInit(): void {
  }

}
