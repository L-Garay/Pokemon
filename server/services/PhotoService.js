import { dbContext } from "../db/DbContext";
import { unsplashMethods } from "../db/Unsplash";
import { BadRequest } from "../utils/Errors";

class PhotoService {
  async getPhoto() {
    return await unsplashMethods.getPhoto();
  }
}

export const photoService = new PhotoService();
