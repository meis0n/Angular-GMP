export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
}
export interface User extends Person {
  login: string;
  email: string;
}
