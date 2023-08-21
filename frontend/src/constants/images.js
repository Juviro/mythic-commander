import { getImageUrl } from 'utils/cardImage';

const imageIds = [
  '93f7c880-9bae-4d29-b7b6-b6be6b2ffa89', // Horizon Carnopy
  '780136cb-438d-4679-96eb-807da6faa157', // Forest
  'b6566108-ccc7-4fac-b935-1eb212889543', // Swamp 2
  '8a97cc92-6894-4c6f-8c8d-bfc9fdd4f974', // Swamp
  '78732e7f-421d-43e8-8f43-341bb01e993e', // Island
  '1a8d9be0-255a-482a-b055-f483859266c5', // Mountain
  '37827425-f304-43eb-979b-1ec5b923a2b5', // Mountain 2
  '7a2c8b8e-2e28-4f10-b04f-9b313c60c0bb', // Plains
  '83fbc748-fe45-4b06-b2ec-71087f7225ec', // Island
  '8cf9b48e-cf58-43a9-94ff-2d50846c3386', // Island
  '8fd675c7-7dac-4ad1-9243-6d1eda0fa30c', // Plains
  '909968b4-1b44-45af-8c24-ed477d039237', // Forest
  '98c45686-6c6a-43de-abab-d0af9ef0e7e0', // Mountain
  '6af0c659-f182-4ad4-bca7-e6c3377f808d', // Forest
  '7562f3d1-bde9-4f5d-a51a-01e6d0578695', // Mountain
  '7308236f-664a-45f8-87a1-8c3c43baa7e9', // Mountain
  'cc101b90-3e17-4beb-a606-3e76088e362c', // Swamp
  '937f96ed-dbf1-4ff2-bc55-6b0cd3795ccb', // Mountain
  '33fde066-56c4-4c73-a41e-b1804cde0402', // Island
  '2f0a5c8d-b9d2-448a-a321-22c45832243f', // Mountain
  '40337e60-065e-425d-ae35-c639d2bb5b42', // Plains
  '4a88705a-ab94-4e29-b556-e8f7ae1183fb', // Island
  '9eb742de-57fa-49f5-977e-bee1b8186e9a', // Plains
  'c706106e-f556-4ba5-98f1-c5536eb9a0b0', // Mountain
  '4d879a13-6ec3-44da-b3fd-d9c1545f3822', // Whatever
  '52474056-771a-495b-8f6b-d429f316d93e', // Mountain
  'fcab7eaa-5e16-40b5-992b-9cc51a95376b', // Swamp
  '553b6aaa-3ae3-4f3b-9ab6-361eddf996a2', // Plains
  '73c6382b-ceff-4092-9ec3-328cefab440e', // Mountain
  'a5b2d0ed-0b47-459a-8f5c-554dd816c03a', // Plains
  'f5a9f8ee-1416-4be8-9da1-f4546164c522', // Plains
  'eb17acb3-0765-4703-a03d-6867a2f59db2', // Plains
  '11fd1aaf-b33d-4a27-8394-c0dadf889b1b', // Mountain
  '23300152-6da8-4444-b368-1fb00e74a4b2', // Swamp
  '049528b8-f922-4671-931d-9b37640d5a07', // Forest
  'edc50993-1fd4-4dba-9d2f-ae7a18559829', // Forest
  '6a0715a0-dce2-427d-964c-0e179309499d', // Forest
  '76b4a655-0051-47c6-a683-c4c3f56e45fc', // Island
  '75884fdb-0d6c-4b2a-8081-99aac4ccb21a', // Island
];

const images = imageIds.map((id) => getImageUrl(id, null, 'art_crop'));

export const randomImages = [...images].sort(() => (Math.random() > 0.5 ? 1 : -1));
