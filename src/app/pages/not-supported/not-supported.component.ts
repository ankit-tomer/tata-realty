import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SmsService } from 'src/app/shared/services/sms.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-not-supported',
  templateUrl: './not-supported.component.html',
  styleUrls: ['./not-supported.component.css']
})
export class NotSupportedComponent implements OnInit {

  phone: number;

  constructor(private smsService: SmsService, public toastrService: ToastrService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.smsService.sendSms({ to: this.phone, message: 'Phone Chhodo Dil Jodo contest, Follow the link to register: ' + environment.baseUrl + ' Hurry, you\'re just a few steps away!' })
      .subscribe(
        (res) => {  
          //console.log(res);
          this.toastrService.success('Link sent successfully.', 'Contest');
        },
        (err) => {
          this.toastrService.error(err, 'Contest');
        }
      );
  }
}
