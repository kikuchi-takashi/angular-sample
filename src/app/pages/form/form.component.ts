import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  form!: FormGroup;

  get userFormArray() {
    return this.form.get('users') as FormArray;
  }

  get userFormGroups(): FormGroup[] {
    return this.userFormArray.controls as FormGroup[];
  }

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      giver: '贈り主',
      users: this.fb.array([
        this.fb.group({
          name: '名前',
          address: '住所',
          items: this.fb.array(['商品1', '商品2']),
        }),
      ]),
    });
  }

  pushUser(): void {
    this.userFormArray.push(
      this.fb.group({
        name: '',
        address: '',
        items: this.fb.array(['']),
      })
    );
  }

  getItemFormControls(user: FormGroup): FormControl[] {
    return this.getItemFormArray(user).controls as FormControl[];
  }

  pushItem(user: FormGroup): void {
    this.getItemFormArray(user).push(this.fb.control(''));
  }

  removeUser(index: number): void {
    this.userFormArray.removeAt(index);
  }

  removeItem(user: FormGroup, index: number): void {
    this.getItemFormArray(user).removeAt(index);
  }

  private getItemFormArray(user: FormGroup): FormArray {
    return user.get('items') as FormArray;
  }
}
