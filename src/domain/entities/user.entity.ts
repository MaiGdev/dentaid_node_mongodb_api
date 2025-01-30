export class UserEntity {
  constructor(
    public fullName: string,
    public email: string,
    public password: string,
    public gender: string,
    public identification: string,
    public phoneNumber: string,
    public emergencyPhoneNumber: string,
    public address: string
  ) {}
}
