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
    await unsplashMethods.savePhoto(body.old);
    return await dbContext.Photo.create(body.updated);
  }
  async getPhotoById(id) {
    let data = await dbContext.Photo.findById(id);
    if (!data) {
      throw new BadRequest("Invalid Id");
    }
    return data;
  }
  async deletePhoto(id) {
    let data = await dbContext.Photo.findByIdAndDelete(id);
    if (!data) {
      throw new BadRequest("Invalid Id");
    }
  }
}

export const photoService = new PhotoService();
