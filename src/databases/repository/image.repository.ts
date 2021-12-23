import { Q } from '@nozbe/watermelondb';
import { database } from '..';
import { Image, Image as ModelImage } from '../model/Image';

interface ImageProfileInterface {
  id: string;
  user_id: string;
  image_id: string;
  image: {
    id: string;
    link: string;
  };
}
async function createOrUpdate(
  image: ImageProfileInterface,
): Promise<ModelImage> {
  const imageCollection = database.get<ModelImage>('images');
  const imageSaved = await database.write(async () => {
    let [imageDatabase] = await imageCollection
      .query(Q.where('external_id', image.id))
      .fetch();

    if (imageDatabase) {
      imageDatabase = await imageDatabase.update(imageExistDb => {
        imageExistDb.external_id = image.id;
        imageExistDb.link = image.image.link;
      });
    } else {
      imageDatabase = await imageCollection.create(newImage => {
        newImage.external_id = image.id;
        newImage.link = image.image.link;
      });
    }
    return imageDatabase;
  });

  return imageSaved;
}

async function findById(id: string): Promise<ModelImage> {
  const imageCollection = database.get<ModelImage>('images');

  const image = await database.write(async () => {
    const [imageDatabase] = await imageCollection
      .query(Q.where('external_id', id))
      .fetch();
    return imageDatabase;
  });

  return image;
}

async function findAll(): Promise<ModelImage[]> {
  const allImages = database.get<ModelImage>('images').query().fetch();

  return allImages;
}

export const imagesRepository = {
  findById,
  findAll,
  createOrUpdate,
};
