import { dbContext } from "../db/DbContext";
import { unsplashMethods } from "../db/Unsplash";
import { BadRequest } from "../utils/Errors";

class PhotoService {
  async getPhoto() {
    return await unsplashMethods.getPhoto();
  }
  async getAllPhotos() {
    return await dbContext.Photo.find(p => (p = {}));
  }
  async savePhoto(body) {
    await unsplashMethods.savePhoto(body);
    return await dbContext.Photo.create(body);
  }
}

export const photoService = new PhotoService();
