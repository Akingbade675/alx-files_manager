import Queue from 'bull';
import imageThumbnail from 'image-thumbnail';
import { writeFile } from 'fs/promises';
import filesCollection from './utils/files';

const fileQueue = new Queue(
  'thumbnails generation',
  'redis://localhost:6379',
);

const THUMBNAIL_WIDTH = [500, 250, 100];

async function generateAndSaveThumbnail(path, width) {
  const thumbnail = await imageThumbnail(path, {
    width,
    responseType: 'base64',
  });
  const thumbnailName = `${path}_${width}`;
  await writeFile(thumbnailName, Buffer.from(thumbnail, 'base64'));
}

fileQueue.process(async (job, done) => {
  const { fileId, userId } = job.data;

  if (!fileId) done(new Error('Missing fileId'));
  if (!userId) done(new Error('Missing userId'));

  const file = await filesCollection.findUserFileById(userId, fileId);
  if (!file) return done(new Error('File not found'));

  THUMBNAIL_WIDTH.forEach(async (width) => {
    await generateAndSaveThumbnail(file.localPath, width);
  });

  done();
});

export default fileQueue;
