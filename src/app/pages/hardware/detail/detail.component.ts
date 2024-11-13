import { Component, inject, model, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchChangeEvent, InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [InputTextModule, ReactiveFormsModule, InputSwitchModule, ButtonModule, InputTextareaModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  private dialogConfig = inject(DynamicDialogConfig);

  equipmentForm: FormGroup = new FormGroup({
    model: new FormControl({disabled: true, value: ''}, Validators.required),
    brand: new FormControl({disabled: true, value: ''}, Validators.required),
    serialNumber: new FormControl({disabled: true, value: ''}, Validators.required)
  });

  ownerForm: FormGroup = new FormGroup({
    firstName: new FormControl({disabled: true, value: ''}, Validators.required),
    lastName: new FormControl({disabled: true, value: ''}, Validators.required),
    email: new FormControl({disabled: true, value: ''}, [Validators.required, Validators.email]),
    phone: new FormControl({disabled: true, value: ''}, Validators.required),
    address: new FormControl({disabled: true, value: ''}, Validators.required)
  });

  repairForm: FormGroup = new FormGroup({
    status: new FormControl({disabled: true, value: ''}, Validators.required),
    date: new FormControl({disabled: true, value: ''}, Validators.required),
    replacedParts: new FormControl({disabled: true, value: ''}, Validators.required),
    description: new FormControl({disabled: true, value: ''}, Validators.required)
  })



  ngOnInit(): void {
    console.log('config: ', this.dialogConfig)

    this.equipmentForm.setValue({
      model: this.dialogConfig.data.model,
      brand: this.dialogConfig.data.brand,
      serialNumber: this.dialogConfig.data.serialNumber
    })

    this.ownerForm.setValue({
      firstName: this.dialogConfig.data.owner.firstName,
      lastName: this.dialogConfig.data.owner.lastName,
      email: this.dialogConfig.data.owner.email,
      phone: this.dialogConfig.data.owner.phoneNumber,
      address: this.dialogConfig.data.owner.address
    })

    // this.repairForm.setValue({
    //   status: this.dialogConfig.data.repair.status,
    //   date: this.dialogConfig.data.repair.date,
    //   replacedParts: this.dialogConfig.data.repair.partsReplaced,
    //   description: this.dialogConfig.data.repair.description
    // })
  }


  toggleEquipmentForm(event: InputSwitchChangeEvent): void {
    if(event.checked) {
      for (const field in this.equipmentForm.controls) { 
        this.equipmentForm.get(field)?.enable();      
      }
    } else {
      for (const field in this.equipmentForm.controls) { 
        this.equipmentForm.get(field)?.disable();      
      }
    }    
  }

  toggleOwnerForm(event: InputSwitchChangeEvent): void {
    if(event.checked) {
      for (const field in this.ownerForm.controls) { 
        this.ownerForm.get(field)?.enable();      
      }
    } else {
      for (const field in this.ownerForm.controls) { 
        this.ownerForm.get(field)?.disable();      
      }
    }    
  }

  toggleRepairForm(event: InputSwitchChangeEvent): void {
    if(event.checked) {
      for (const field in this.repairForm.controls) { 
        this.repairForm.get(field)?.enable();      
      }
    } else {
      for (const field in this.repairForm.controls) { 
        this.repairForm.get(field)?.disable();      
      }
    }    
  }

  // private enableChecker(form: FormGroup) {

  //   const formLenghts = form.controls

  //   for (const field in form.controls) {
  //     return form.get(field)?.enabled
  //   }

  // }


  save(): void {
    if (this.equipmentForm.valid) {
      

    }

  }




}
