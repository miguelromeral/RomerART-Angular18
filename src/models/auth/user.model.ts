export class User {
  username: string;
  role: string;
  token: string;

  constructor(data: Partial<User> = {}) {
    this.username = data.username || '';
    this.role = data.role || '';
    this.token = data.token || '';
  }
}
