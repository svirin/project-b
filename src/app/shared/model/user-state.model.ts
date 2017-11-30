import { ImageState } from './image-state.model';

export class UserState {

  public email: string;
  public firstName: string;
  public lastName: string;
  public description: string;
  public images: ImageState[];

  constructor(email: string, firstName: string, lastName: string, description: string, images: ImageState[]) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.description = description;
    this.images = images;
  }
}
