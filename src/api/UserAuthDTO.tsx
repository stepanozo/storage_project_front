export default class UserAuthDTO {
  id: number;
  login: string;
  fullName: string;
  role: string;
  token: string;

  constructor(id: number, login: string, fullName: string, role: string, token: string) {
    this.id = id;
    this.login = login;
    this.role = role;
    this.token = token;
    this.fullName = fullName;
  }
}