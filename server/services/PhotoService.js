import { dbContext } from "../db/DbContext";
import { unsplashMethods } from "../db/Unsplash";
import { BadRequest } from "../utils/Errors";

class PhotoService {
  async getPhoto() {
    return await unsplashMethods.getPhoto();
  }
  async savePhoto(body) {
    await unsplashMethods.savePhoto(body);
    // NOTE Don't forget to save it to the database
  }
}

export const photoService = new PhotoService();
