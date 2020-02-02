import { Pipe, PipeTransform } from '@angular/core';
import { User, GroupMember } from '../interfaces/user';

@Pipe({
  name: 'verifyPipe'
})
export class VerifyPipe implements PipeTransform {

  transform(members: GroupMember[], isVerified: boolean): GroupMember[] {
    if(!members){
      return members;
    }
    return members.filter(members => members.uid.toString().indexOf(isVerified.toString()) !== -1);
  }

}
