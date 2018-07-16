import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { TenantAppFormService } from '../tenant-app-form.service';

@Component({
  selector: 'app-tenant-app-renter-profile',
  templateUrl: './tenant-app-renter-profile.component.html',
  styleUrls: ['./tenant-app-renter-profile.component.css']
})
export class TenantAppRenterProfileComponent implements OnInit {
  annualSalary: number = 0;

  constructor(private tenantAppFormService: TenantAppFormService) { }

  ngOnInit() {
  }

  onClickReview(form: NgForm) {
    console.log(form.value);

    const formInfo = {
      employer: form.value.employer,
      employmentPosition: form.value.employmentPosition,
      employmentStartDate: form.value.employmentStartDate,
      employmentEndDate: form.value.employmentEndDate,
      contactFirstName: form.value.contactFirstName,
      contactLastName: form.value.contactLastName,
      contactEmail: form.value.contactEmail,
      contactPhone: form.value.contactPhone,

      incomeSource: form.value.incomeSource,
      monthlyAmount: form.value.monthlyAmount,
      addIncomeInfo: form.value.addIncomeInfo,

      residenceCity: form.value.residenceCity,
      residenceState: form.value.residenceState,
      residenceZipCode: form.value.residenceZipCode,
      residenceMoveInDate: form.value.residenceMoveInDate,
      residenceMoveOutDate: form.value.residenceMoveOutDate,

      refFirstName: form.value.refFirstName,
      refLastName: form.value.refLastName,
      refPhone: form.value.refPhone,
      refEmail: form.value.refEmail,
      refRelation: form.value.refRelation,
      refYearsKnown : form.value.refYearsKnown
    }
    this.tenantAppFormService.storeTenantAppForm(formInfo);
  }

}
