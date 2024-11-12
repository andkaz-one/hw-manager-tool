import { Component, inject, model, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  private dialogConfig = inject(DynamicDialogConfig);

  equipmentForm: FormGroup = new FormGroup({
    model: new FormControl({disabled: true, value: ''}, Validators.required),
    brand: new FormControl({disabled: true, value: ''}, Validators.required),
    serialNumber: new FormControl({disabled: true, value: ''}, Validators.required)
  })



  ngOnInit(): void {
    console.log('config:', this.dialogConfig)

    this.equipmentForm.setValue({
      model: this.dialogConfig.data.model,
      brand: this.dialogConfig.data.brand,
      serialNumber: this.dialogConfig.data.serialNumber
    })
  }


  enableForm() {
    this.equipmentForm.get('model')?.enable()
  }





}
