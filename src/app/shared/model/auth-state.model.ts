export class AuthState {

  public token: string;
  public error: string;
  public isAutenticated: boolean;
  public email: string;

  constructor(token: string, error: string, isAutenticated: boolean, email: string) {
    this.token = token;
    this.error = error;
    this.isAutenticated = isAutenticated;
    this.email = email;
  }
}
