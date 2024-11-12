import { Injectable } from '@angular/core';
import { Equipment, RepairStatus } from '../interfaces';
import { BehaviorSubject } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable()
export class HardwareService {

  constructor() { }

  private mockData$: BehaviorSubject<Equipment[]> = new BehaviorSubject<Equipment[]>([
    {
      id: 1,
      model: 'MacBook Pro 16',
      brand: 'Apple',
      serialNumber: 'C02D456789',
      repair: {
        id: 1,
        status: RepairStatus.NEW,
        description: 'Battery replacement',
        partsReplaced: ['Battery'],
        repairDate: new Date('2023-11-15'),
        cost: 150
      },
      owner: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        contactInfo: {
          phoneNumber: '+1234567890',
          email: 'johndoe@example.com',
          address: '123 Main St, Anytown, CA 12345'
        }
      }
    },
    {
      id: 2,
      model: 'Dell XPS 13',
      brand: 'Dell',
      serialNumber: 'A1B2C3D4E5',
      repair: null,
      owner: {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        contactInfo: {
          phoneNumber: '+9876543210',
          email: 'janesmith@example.com',
          address: '456 Elm St, Anytown, CA 54321'
        }
      }
    },
    {
      id: 3,
      model: 'Lenovo ThinkPad X1 Carbon',
      brand: 'Lenovo',
      serialNumber: 'F0G1H2J3K4',
      repair: {
        id: 2,
        status: RepairStatus.INPROGRESS,
        description: 'Screen repair',
        partsReplaced: ['Screen'],
        repairDate: new Date('2023-12-20'),
        cost: 200
      },
      owner: {
        id: 3,
        firstName: 'Michael',
        lastName: 'Johnson',
        contactInfo: {
          phoneNumber: '+5555555555',
          email: 'michaeljohnson@example.com',
          address: '789 Oak St, Anytown, CA 98765'
        }
      }
    }
  ])

  data$ = toSignal<Equipment[]>(this.mockData$); //TODO when will api - change to fromObservable




}
