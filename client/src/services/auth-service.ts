class AuthService {
  private key = 'token';

  public get(): string {
    return localStorage.getItem(this.key) || '';
  }

  public set(value: string) {
    localStorage.setItem(this.key, value);
  }
}

const authService = new AuthService();

export default authService;
