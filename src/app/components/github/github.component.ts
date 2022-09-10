import { Component, OnInit, Input } from '@angular/core';
import { UserInterface, GithubInterface } from '../../Interfaces/Interfaces';
import { GithubService } from '../../services/github.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss']
})
export class GithubComponent implements OnInit {

  @Input() user!: UserInterface|null;
  @Input() isFeatureActive: boolean = false;
  isUserHasGithub : boolean = false;
  githubState: GithubInterface|null = null;
  enabled: boolean = false;
  hasError: boolean = true;
  isMessageDisplayed: boolean = false; 
  githubForm = new FormGroup({
    owner: new FormControl(''),
    repository: new FormControl(''),
    branch: new FormControl(''),
    token: new FormControl(''),
    enabled: new FormControl(false),
  });

  subscriptions: Subscription = new Subscription()

  constructor(private githubService: GithubService) {}

  // ----- Component lifecycle methods ----- //


  ngOnInit(): void {
    this.loadUserGithub();
  }

  ngOnDestroy() {
    this.subscriptions?.unsubscribe();
  }

  // ----- Component methods----- //

  onGithubFormSubmit(): void {
    this.checkRepository();
    this.toggleMessageDisplay(true)
  }

  onEnableCLick() {
    this.toggleGithubEnabling();

  }

  loadUserGithub(): void {
    if(this.user !== null ){
      this.subscriptions.add(this.githubService.getGithubByUser(this.user).subscribe((_observer: GithubInterface|null) => {
        if(_observer !== null) {
          this.githubState = _observer;
          this.isUserHasGithub = true;
          this.updateFormValues();
          this.toggleDisableField(_observer.enabled);
        }else {
          this.isUserHasGithub = false;
          this.toggleDisableField(false);
        }
      }));
    }
  }

  updateFormValues(): void {
    if(this.githubState !== undefined && this.githubState !== null) {
      this.githubForm.setValue({
        owner: this.githubState.owner ?? '',
        repository: this.githubState.repository ?? '',
        branch: this.githubState.branch ?? '',
        token: this.githubState.token ?? '',
        enabled: this.githubState.enabled ?? false
      })
    }

    const enabled = this.githubState?.enabled
    if(enabled) this.toggleDisableField(enabled);
  } 

  toggleDisableField(enabled: boolean) {
    if(enabled) {
      this.githubForm.controls.owner.enable();
      this.githubForm.controls.repository.enable();
      this.githubForm.controls.branch.enable();
      this.githubForm.controls.token.enable();
    } else {
      this.githubForm.controls.owner.disable();
      this.githubForm.controls.repository.disable();
      this.githubForm.controls.branch.disable();
      this.githubForm.controls.token.disable();
    }
  }
  

  isGithubActive() {
    return this.githubForm.get('enabled')?.getRawValue()
  }

  toggleGithubEnabling(): void {  
    const enabled: boolean = !this.githubForm.controls.enabled.value;

    if(enabled) {
      this.toggleDisableField(enabled);
    }

    if(this.githubState !== null && this.githubForm.controls.enabled.value === true ){
      this.githubState.enabled = false
      this.updateGithub(this.githubState);
      this.toggleMessageDisplay(false);
    } 

    }
  

  checkRepository(): void {
    const github: GithubInterface = {
      owner : this.githubForm.controls.owner.value!,
      repository : this.githubForm.controls.repository.value!,
      branch : this.githubForm.controls.branch.value!,
      token : this.githubForm.controls.token.value!,
      enabled:  this.githubForm.controls.enabled.value!
    }

    this.subscriptions.add(this.githubService.checkGithubRepository(github)
      .subscribe( (_observer: any) => {
        _observer.status === 404 || _observer.status === 403  ? this.hasError = true : this.hasError = false

        const github: GithubInterface = {
          user:  this.user?.id,
          enabled: this.githubForm.controls.enabled.value!,
          owner: this.githubForm.controls.owner.value!,
          repository: this.githubForm.controls.repository.value!,
          branch: this.githubForm.controls.branch.value!,
          token: this.githubForm.controls.token.value!,
        }

        if(!this.hasError){
          if(this.isUserHasGithub) {
            this.updateGithub(github);
          }else {
            this.createGithub(github)
          }
    
        }
    }));
  }

  updateGithub(github: GithubInterface): void {
    this.subscriptions.add(this.githubService.updateOne(github).subscribe( (_observer: GithubInterface) => {
      this.githubState = _observer
    }));
  }

  createGithub(github: GithubInterface): void {
    this.subscriptions.add(this.githubService.createOne(github).subscribe( (_observer: GithubInterface) => {
      this.githubState = _observer;
      this.isUserHasGithub = true;
    }));
  }
  

  toggleMessageDisplay(isDisplayed: boolean): void {
    isDisplayed ? this.isMessageDisplayed = true : this.isMessageDisplayed = false; 
  }



}
