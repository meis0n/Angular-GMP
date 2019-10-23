import { User } from './user';

export class UserProfile implements User {
  id: string;
  firstName: string;
  lastName: string;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
