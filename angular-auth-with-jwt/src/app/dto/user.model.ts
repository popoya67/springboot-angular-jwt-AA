export class User {
  userId: string;
  password: string;
  name: string;
  authority: string[];

  constructor()
  constructor(id, password)
  constructor(id?, password?) {
    this.userId = id;
    this.password = password;
  }
}
