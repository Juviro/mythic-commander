// Tiers:
// 0 - Basic Lands
// 1 - Filler
// 2 - Okay
// 3 - Great
// 4 - Optimal
// 5 - Original Duals

const painLands = {
  name: 'Painlands',
  id: 'painLands',
  numberOfColors: 2,
  tier: 2,
  lands: [
    {
      name: 'Adarkar Wastes',
      oracle_id: 'd5ad26cc-2bdb-46b7-b8bf-dd099d5fa09b',
      mainColorProduction: ['U', 'W'],
      id: 'ae0e5ea0-46f5-4a6c-8fa7-f851c97cb075',
    },
    {
      name: 'Battlefield Forge',
      oracle_id: '6b75b94e-83b7-457e-ac41-7ca90b5a59aa',
      mainColorProduction: ['R', 'W'],
      id: '7b6cf4b8-875e-4bc8-bf57-24b7d2c6438e',
    },
    {
      name: 'Brushland',
      oracle_id: '5eb8b497-ec9a-4a89-ad29-1ec3ca82da7c',
      mainColorProduction: ['G', 'W'],
      id: '18d236ce-3b78-403a-b5f9-4fb44123d85b',
    },
    {
      name: 'Caves of Koilos',
      oracle_id: '33de01e9-ce5a-42d4-afcb-343cd54a6d80',
      mainColorProduction: ['B', 'W'],
      id: 'f17c33bd-cda4-4014-ae75-8eab8e8701e9',
    },
    {
      name: 'Karplusan Forest',
      oracle_id: 'bd912666-f37f-4767-af6f-9e6d0fcccacf',
      mainColorProduction: ['G', 'R'],
      id: '363dee3f-48d0-454d-81d3-9def5476a029',
    },
    {
      name: 'Llanowar Wastes',
      oracle_id: '32116127-cf96-4a1b-8896-a1ebc087b597',
      mainColorProduction: ['B', 'G'],
      id: 'f7cb5f66-d9f0-4af5-8d6b-14e1f3eef351',
    },
    {
      name: 'Shivan Reef',
      oracle_id: '0fe16212-66c3-4e45-a641-7391e9b2e304',
      mainColorProduction: ['R', 'U'],
      id: '749d16ac-cb54-42a4-ab26-1172e1465b41',
    },
    {
      name: 'Sulfurous Springs',
      oracle_id: 'f5c38c01-4a40-469f-91a0-7479daf4e8e7',
      mainColorProduction: ['B', 'R'],
      id: '3531a023-b37c-472c-9697-8b2c018139c5',
    },
    {
      name: 'Underground River',
      oracle_id: '857febd9-cdd7-4f8e-a852-d88084b0cfbc',
      mainColorProduction: ['B', 'U'],
      id: '52900300-dc28-4c2e-adfe-94c4de81ab02',
    },
    {
      name: 'Yavimaya Coast',
      oracle_id: '40b36bc6-c185-4bda-99e7-0118953c2c97',
      mainColorProduction: ['G', 'U'],
      id: '66b98751-20bc-4c71-a51e-35503b072044',
    },
  ],
};

const fetchLands = {
  name: 'Fetchlands',
  id: 'fetchLands',
  numberOfColors: 2,
  tier: 4,
  lands: [
    {
      name: 'Arid Mesa',
      oracle_id: 'c5acf2a5-40f4-433d-a74d-1cb56c521464',
      mainColorProduction: ['R', 'W'],
      id: '25ac5405-df7b-4097-914a-022cb18e20d4',
    },
    {
      name: 'Bloodstained Mire',
      oracle_id: 'fc0707c7-d504-4ccf-a0d2-3eb6e26e7a57',
      mainColorProduction: ['B', 'R'],
      id: '579743fe-f71e-4cb2-8629-d6b02ed1591d',
    },
    {
      name: 'Flooded Strand',
      oracle_id: 'f3c7af78-a77d-4134-82a2-a5ce84285a84',
      mainColorProduction: ['U', 'W'],
      id: '8f85e12c-196b-4459-b81f-0c9c854e9f57',
    },
    {
      name: 'Marsh Flats',
      oracle_id: 'dab520d0-20b4-4273-ba6b-eb07f85ea433',
      mainColorProduction: ['B', 'W'],
      id: '9db3ba6d-eb7f-4f5b-9a3b-c6239c3baa42',
    },
    {
      name: 'Misty Rainforest',
      oracle_id: '09dd85aa-47bc-4713-a9b9-8b52ff2285ed',
      mainColorProduction: ['G', 'U'],
      id: '88231c0d-0cc8-44ec-bf95-81d1710ac141',
    },
    {
      name: 'Polluted Delta',
      oracle_id: 'ef86989d-ce80-4e55-aece-7d11710eeffa',
      mainColorProduction: ['B', 'U'],
      id: '6e288374-2b71-4ace-b1d2-a19fee6cb4af',
    },
    {
      name: 'Scalding Tarn',
      oracle_id: 'cb027150-848c-4a66-88ad-e20222304dd8',
      mainColorProduction: ['R', 'U'],
      id: '71e491c5-8c07-449b-b2f1-ffa052e6d311',
    },
    {
      name: 'Verdant Catacombs',
      oracle_id: '67d60b24-d429-4ded-90d9-06e49f28c396',
      mainColorProduction: ['B', 'G'],
      id: '94c229ea-90da-4aa0-bfda-b162fb3b5b8b',
    },
    {
      name: 'Windswept Heath',
      oracle_id: '29737a60-3ebd-40d9-b935-c4f54b90d45d',
      mainColorProduction: ['G', 'W'],
      id: 'bd1d13f7-fd38-4f0b-a8e0-1eac78668117',
    },
    {
      name: 'Wooded Foothills',
      oracle_id: '6587a463-a108-4854-b6d1-944e89b8c8a4',
      mainColorProduction: ['G', 'R'],
      id: '4e11ea8a-f895-438d-a3b7-f070238e4161',
    },
  ],
};

const filterLands = {
  name: 'Filterlands',
  id: 'filterLands',
  numberOfColors: 2,
  tier: 2,
  lands: [
    {
      name: 'Darkwater Catacombs',
      oracle_id: '4869a530-757f-4364-8d8e-4dc8001f433c',
      mainColorProduction: ['B', 'U'],
      id: '2583b941-6156-4c4b-a068-0d0ac75a3dd3',
    },
    {
      name: 'Desolate Mire',
      oracle_id: '3edf9201-265f-4cd9-b27b-8073bf1a4cf2',
      mainColorProduction: ['B', 'W'],
      id: '6fc62e13-19c0-421b-b5b1-8bff5a6db6cb',
    },
    {
      name: 'Ferrous Lake',
      oracle_id: '62c15af0-40e1-407d-b056-7a3d909e3fdb',
      mainColorProduction: ['R', 'U'],
      id: '277ced12-77eb-426f-a661-bb5edd2d48e7',
    },
    {
      name: 'Mossfire Valley',
      oracle_id: '23bbd091-f6ff-4514-97aa-42c08164b4eb',
      mainColorProduction: ['G', 'R'],
      id: '6b6c08ce-d01d-4ae6-81d3-149679e27e6a',
    },
    {
      name: 'Overflowing Basin',
      oracle_id: '5ac8e01c-b0a7-4855-a122-1cd26b07c4a5',
      mainColorProduction: ['G', 'U'],
      id: 'd04c2f3c-7114-4e8d-9c2f-e6611b4b3917',
    },
    {
      name: 'Shadowblood Ridge',
      oracle_id: '15687ee3-3cdb-4a8f-a726-46b73bceb792',
      mainColorProduction: ['B', 'R'],
      id: '69a5f84a-9e9b-42b6-a973-864409d6e564',
    },
    {
      name: 'Skycloud Expanse',
      oracle_id: '76f335d0-7f71-4b1a-b60d-73de954cbe2c',
      mainColorProduction: ['U', 'W'],
      id: 'c8c0da61-59c5-4206-83d9-c4676e169f01',
    },
    {
      name: 'Sungrass Prairie',
      oracle_id: '0a28dff0-2bd6-4105-b73a-b6c4735833fd',
      mainColorProduction: ['G', 'W'],
      id: '7bfa27ee-553e-4c6e-a79c-9757bd74c057',
    },
    {
      name: 'Sunscorched Divide',
      oracle_id: '8d2b2675-19df-4f40-9e8e-196ec097b91c',
      mainColorProduction: ['R', 'W'],
      id: 'a916758c-9db2-48ff-b3b7-177e8d28284e',
    },
    {
      name: 'Viridescent Bog',
      oracle_id: '6bd6d259-1af7-4dff-a79c-48a616d2a36e',
      mainColorProduction: ['B', 'G'],
      id: 'c555b4c5-08cc-4cd0-9b08-be29ce821fce',
    },
  ],
};

const bounceLands = {
  name: 'Bouncelands',
  id: 'bounceLands',
  numberOfColors: 2,
  tier: 2,
  lands: [
    {
      name: 'Azorius Chancery',
      oracle_id: '189fc8f4-17ac-4f1d-82c8-8401445bdaf4',
      mainColorProduction: ['U', 'W'],
      id: '7084fc02-8941-4a4f-805d-3c1625cf1d58',
    },
    {
      name: 'Boros Garrison',
      oracle_id: '8fa3ac81-3dfe-4565-be99-5554f7597b4b',
      mainColorProduction: ['R', 'W'],
      id: 'c26abe8c-4f06-448d-9e0e-8214592cb885',
    },
    {
      name: 'Coral Atoll',
      oracle_id: '3f347ebf-e0d2-4ae0-ad84-df7a460404e0',
      mainColorProduction: ['U'],
      id: '5d7c4619-e5af-4aa0-bd3f-6bf0e1fdc1fc',
    },
    {
      name: 'Dimir Aqueduct',
      oracle_id: '378a1d57-e2f1-4b84-9692-1564602e9e99',
      mainColorProduction: ['B', 'U'],
      id: '877b7b90-80d4-4cad-af7c-a0b36c590ca0',
    },
    {
      name: 'Dormant Volcano',
      oracle_id: '38ba1956-5505-4a7a-b6af-e75715b1401f',
      mainColorProduction: ['R'],
      id: '6aa92be7-883f-42bd-8623-00eb2df28a98',
    },
    {
      name: 'Everglades',
      oracle_id: 'ef3b8b0c-cea7-4bae-934c-9c65fd64245d',
      mainColorProduction: ['B'],
      id: 'c1f2eaf7-7f08-446b-892f-5a844f74808f',
    },
    {
      name: 'Golgari Rot Farm',
      oracle_id: '1b301478-b14f-4ef8-94e6-9647d582eabe',
      mainColorProduction: ['B', 'G'],
      id: '5a9b093d-a483-4c7d-81b5-9c70c866bbb1',
    },
    {
      name: 'Gruul Turf',
      oracle_id: '657243dd-e479-4f4b-99d2-09b55d833a35',
      mainColorProduction: ['G', 'R'],
      id: '294b7e06-4758-4590-b1f0-b7f97537218f',
    },
    {
      name: 'Izzet Boilerworks',
      oracle_id: '1cb9d94a-3039-4f2e-8fcc-6996f9a45f74',
      mainColorProduction: ['R', 'U'],
      id: 'eb746aeb-7595-4b45-8ffc-90f220308960',
    },
    {
      name: 'Jungle Basin',
      oracle_id: 'f922f90a-b1a2-4630-9266-40726ca89f74',
      mainColorProduction: ['G'],
      id: 'cc3146db-2f86-4728-9af1-ff651f871652',
    },
    {
      name: 'Karoo',
      oracle_id: 'd4e875d9-2245-470d-aa2f-1dfe66ce2d15',
      mainColorProduction: ['W'],
      id: '16dfb04a-e65d-483e-a4fb-f810b36ede9d',
    },
    {
      name: 'Orzhov Basilica',
      oracle_id: 'aa00ae0b-7c0f-427e-8102-ce0e2a6af5df',
      mainColorProduction: ['B', 'W'],
      id: 'd1d7237b-6749-4d39-bc69-5185d01e24d4',
    },
    {
      name: 'Rakdos Carnarium',
      oracle_id: '0a023964-2905-4928-9c3e-dc63e6ebd218',
      mainColorProduction: ['B', 'R'],
      id: '287c4a77-a458-4493-a35e-6bbb6d88087f',
    },
    {
      name: 'Selesnya Sanctuary',
      oracle_id: '00ef1c55-dea1-4564-bd57-66de86cba4df',
      mainColorProduction: ['G', 'W'],
      id: 'e8af7e5a-806b-4264-9010-f497b40a7fb4',
    },
    {
      name: 'Simic Growth Chamber',
      oracle_id: '046f5783-cc7b-416a-8cf6-2bcef9c2cc1a',
      mainColorProduction: ['G', 'U'],
      id: 'f511cf93-3443-4e35-8425-a1e2d24a6157',
    },
  ],
};

const shockLands = {
  name: 'Shocklands',
  id: 'shockLands',
  numberOfColors: 2,
  tier: 4,
  lands: [
    {
      name: 'Blood Crypt',
      oracle_id: '43985bbc-a0f6-4812-984e-392bc8562633',
      mainColorProduction: ['B', 'R'],
      id: '0994aef4-b341-45f4-8881-523565a5956e',
    },
    {
      name: 'Breeding Pool',
      oracle_id: '20283c4a-f1f0-42f0-bc08-6da87474426b',
      mainColorProduction: ['G', 'U'],
      id: '9b35c030-029d-4286-ab79-0165c8688c6c',
    },
    {
      name: 'Godless Shrine',
      oracle_id: '73864fcc-1bde-4bc0-831e-2b93e546e417',
      mainColorProduction: ['B', 'W'],
      id: '9e26f6ad-c1b8-4ec6-a179-e86ce09824c1',
    },
    {
      name: 'Hallowed Fountain',
      oracle_id: 'f1750962-a87c-49f6-b731-02ae971ac6ea',
      mainColorProduction: ['U', 'W'],
      id: 'cd70adab-39db-4cc9-ae37-a342f9109bec',
    },
    {
      name: 'Overgrown Tomb',
      oracle_id: '975ec9a3-6f20-4177-8211-82526e092538',
      mainColorProduction: ['B', 'G'],
      id: '4a297ec1-0a7c-4f67-936b-d9227767e989',
    },
    {
      name: 'Sacred Foundry',
      oracle_id: '45181cb8-2090-4471-ba90-e5a8f04d525f',
      mainColorProduction: ['R', 'W'],
      id: '8076a8c3-7c6c-4636-b5d8-9b09ee95f92c',
    },
    {
      name: 'Steam Vents',
      oracle_id: '17039058-822d-409f-938c-b727a366ba63',
      mainColorProduction: ['R', 'U'],
      id: '66d618f4-443c-4a6c-8cbd-5d4ea96b2cd4',
    },
    {
      name: 'Stomping Ground',
      oracle_id: '16052b52-ade1-406f-a06b-ce7ea607fb63',
      mainColorProduction: ['G', 'R'],
      id: '872301b2-b6e7-4972-a479-66a7e304c1d3',
    },
    {
      name: 'Temple Garden',
      oracle_id: 'f413a83d-a40d-434c-b20a-4c707c0527fa',
      mainColorProduction: ['G', 'W'],
      id: '18d2e383-d380-4d18-8aad-bd8ea093a16c',
    },
    {
      name: 'Watery Grave',
      oracle_id: 'fc9ec820-4245-4a96-b009-5308a818ca58',
      mainColorProduction: ['B', 'U'],
      id: '6e86eb36-f4cc-4a75-b43a-4dee463a3b33',
    },
  ],
};

const horizonLands = {
  name: 'Horizonlands',
  id: 'horizonLands',
  numberOfColors: 2,
  tier: 2,
  lands: [
    {
      name: 'Fiery Islet',
      oracle_id: '026f4a4b-eedd-44e1-9d37-ca4fb8d6db98',
      mainColorProduction: ['R', 'U'],
      id: 'a3aab13c-9d9d-4507-ae5d-da979990ae1b',
    },
    {
      name: 'Horizon Canopy',
      oracle_id: '262a5d83-506c-4781-9bc9-1a2b5d83955c',
      mainColorProduction: ['G', 'W'],
      id: '93f7c880-9bae-4d29-b7b6-b6be6b2ffa89',
    },
    {
      name: 'Horizon of Progress',
      oracle_id: '59a82f57-fe2f-4834-a4ee-4b948eef1e12',
      mainColorProduction: [],
      autoSelect: false,
      id: 'c2ae7cf3-f793-4572-a32c-0d66dba8faf7',
      condition: (colorIdentity) => colorIdentity.length > 1,
    },
    {
      name: 'Nurturing Peatland',
      oracle_id: '8ed932ff-986c-4592-ad70-53b3fac80d69',
      mainColorProduction: ['B', 'G'],
      id: '2744ac83-a79f-4042-8720-688b5adda382',
    },
    {
      name: 'Silent Clearing',
      oracle_id: 'fd45063f-c83c-431c-9104-f139c497ec0d',
      mainColorProduction: ['B', 'W'],
      id: 'ac07e230-0297-4e1d-bdfe-119010e0ad8e',
    },
    {
      name: 'Sunbaked Canyon',
      oracle_id: 'f97fd068-b83a-4621-bf8c-cc96e880ce90',
      mainColorProduction: ['R', 'W'],
      id: 'c36820fa-ee86-4206-9a0d-737a67cf5208',
    },
    {
      name: 'Waterlogged Grove',
      oracle_id: '70fa2eba-565e-4fed-adc9-7f5d9fcbf1fa',
      mainColorProduction: ['G', 'U'],
      id: '0ab6bfbd-d2e1-4c4c-9f91-6f69c5b8e3bb',
    },
  ],
};

const scryLands = {
  name: 'Scrylands',
  id: 'scryLands',
  numberOfColors: 2,
  tier: 2,
  lands: [
    {
      name: 'Temple of Abandon',
      oracle_id: '3baa8e38-ef93-435d-b63e-f781d5bfcc68',
      mainColorProduction: ['G', 'R'],
      id: '7d5f8481-47f7-4531-9dad-686cdfb5d2ad',
    },
    {
      name: 'Temple of Deceit',
      oracle_id: '33b9b3bd-33ca-46f3-b8bb-a978bc3d1085',
      mainColorProduction: ['B', 'U'],
      id: 'e3d4fd29-dab5-481f-94c9-eeb70f3c29dd',
    },
    {
      name: 'Temple of Enlightenment',
      oracle_id: '89f43e27-790b-4ca1-8ba7-0882b31e0783',
      mainColorProduction: ['U', 'W'],
      id: 'adad8390-66d8-4022-a059-c68e44e718fe',
    },
    {
      name: 'Temple of Epiphany',
      oracle_id: '79f94050-d850-41ca-b1db-5ae0cf743f0a',
      mainColorProduction: ['R', 'U'],
      id: '1652bb3c-c365-4046-b07e-3d861fa324c6',
    },
    {
      name: 'Temple of Malady',
      oracle_id: 'dc55421f-dee8-4263-9df0-2365df5f14bb',
      mainColorProduction: ['B', 'G'],
      id: 'c97929f8-ae80-4b4a-9d9b-2f3c7605edc8',
    },
    {
      name: 'Temple of Malice',
      oracle_id: '7c439c18-31dc-41fe-b03d-3fca06e6fc0b',
      mainColorProduction: ['B', 'R'],
      id: '9490a495-9f17-45a8-b10c-7de4fcbd2778',
    },
    {
      name: 'Temple of Mystery',
      oracle_id: '7e26f0b7-20e6-46d5-8130-d98c14d6aa29',
      mainColorProduction: ['G', 'U'],
      id: '81634185-eb67-4d13-8b82-a662b8c9a7f0',
    },
    {
      name: 'Temple of Plenty',
      oracle_id: 'e521322b-0e83-458c-8936-7021a80ee279',
      mainColorProduction: ['G', 'W'],
      id: '6e6256ea-ccb5-4595-8278-44266f922e31',
    },
    {
      name: 'Temple of Silence',
      oracle_id: 'e6e6fce8-0f6a-4b84-865e-d4e4a4182f9f',
      mainColorProduction: ['B', 'W'],
      id: '0f5b0f0a-dc16-45e2-91ab-28e0b9f66d00',
    },
    {
      name: 'Temple of Triumph',
      oracle_id: '6f0d94d9-64bb-4175-83bc-301e8f79f54f',
      mainColorProduction: ['R', 'W'],
      id: '2366499c-9d07-46bb-8488-6cd60056fa16',
    },
  ],
};

const battleLands = {
  name: 'Battlelands',
  id: 'battleLands',
  numberOfColors: 2,
  tier: 1,
  lands: [
    {
      name: 'Canopy Vista',
      oracle_id: 'dcb7e046-f01b-497c-88e5-57794eb30ce5',
      mainColorProduction: ['G', 'W'],
      id: '3cd951ad-9b99-4b55-9adf-c3f24a86e79c',
    },
    {
      name: 'Cinder Glade',
      oracle_id: 'dfac0258-e148-4d7d-8ded-fc2466d9caa6',
      mainColorProduction: ['G', 'R'],
      id: 'f31a6668-4a2e-4f31-81f3-52bf487a7b04',
    },
    {
      name: 'Prairie Stream',
      oracle_id: '5330e24a-8568-446e-840a-594cd08bd1bc',
      mainColorProduction: ['U', 'W'],
      id: 'c6bc665f-fb17-43e1-b93b-6a7b168759eb',
    },
    {
      name: 'Smoldering Marsh',
      oracle_id: '390f1b56-264e-4336-83be-dc1fe79bfdcf',
      mainColorProduction: ['B', 'R'],
      id: '2c9814b3-d4fe-4823-b310-ab284dc9b9be',
    },
    {
      name: 'Sunken Hollow',
      oracle_id: 'cd2c90ac-2b04-461c-92f3-939871b6b6a3',
      mainColorProduction: ['B', 'U'],
      id: '6d93da43-cc05-4542-b4cb-d27ebcb79012',
    },
  ],
};

const checkLands = {
  name: 'Checklands',
  id: 'checkLands',
  numberOfColors: 2,
  tier: 3,
  lands: [
    {
      name: 'Clifftop Retreat',
      oracle_id: 'd7faa3c8-46cf-46b2-bfa4-89000307cf18',
      mainColorProduction: ['R', 'W'],
      id: '90612cf2-51d6-4a37-93e5-8446c18bb72b',
    },
    {
      name: 'Dragonskull Summit',
      oracle_id: '63398c02-6fb1-481d-9d9f-81063532fbc0',
      mainColorProduction: ['B', 'R'],
      id: '91570836-9e36-4774-8d5d-7cbcee0012ba',
    },
    {
      name: 'Drowned Catacomb',
      oracle_id: '819fc966-434e-470f-91e9-a38df974ad17',
      mainColorProduction: ['B', 'U'],
      id: '8ef728f1-5153-47d6-8f9c-dfd473ee0750',
    },
    {
      name: 'Glacial Fortress',
      oracle_id: '027dd013-baa7-4111-b3c9-f4d1414e9c45',
      mainColorProduction: ['U', 'W'],
      id: 'cef133d9-26d2-4a1e-8d6a-829f1067c169',
    },
    {
      name: 'Hinterland Harbor',
      oracle_id: 'fb5a3403-7f0b-406c-8c4f-d693be010ca6',
      mainColorProduction: ['G', 'U'],
      id: 'da629db7-c200-43ed-8de2-a5859b639a6d',
    },
    {
      name: 'Isolated Chapel',
      oracle_id: '7e5d9efe-48a9-434b-bb09-056e0e09cc9a',
      mainColorProduction: ['B', 'W'],
      id: 'd359281b-b509-41be-a820-c7ac9f36f27f',
    },
    {
      name: 'Rootbound Crag',
      oracle_id: '9516c4c1-d72d-434f-97e1-6a862434a169',
      mainColorProduction: ['G', 'R'],
      id: '0475a52a-c78d-41ee-9db2-420e7f3643d8',
    },
    {
      name: 'Sulfur Falls',
      oracle_id: '6a6c5e17-6465-4a1f-9d63-8a3ce2edc522',
      mainColorProduction: ['R', 'U'],
      id: '6d3e12e4-6122-41d8-8ffb-a883d02d3278',
    },
    {
      name: 'Sunpetal Grove',
      oracle_id: '402ec768-76fb-474e-ae74-babc90d833c4',
      mainColorProduction: ['G', 'W'],
      id: '5b799ef4-5b6a-4457-a444-d8e13df9c79f',
    },
    {
      name: 'Woodland Cemetery',
      oracle_id: 'c9fe1383-1331-4a58-a45a-3320250221a9',
      mainColorProduction: ['B', 'G'],
      id: '2100b00b-a7de-4e36-a83b-1ce1fa427cc2',
    },
  ],
};

const fastLands = {
  name: 'Fastlands',
  id: 'fastLands',
  numberOfColors: 2,
  tier: 1,
  lands: [
    {
      name: 'Blackcleave Cliffs',
      oracle_id: '5ad94412-6f79-4c5d-bbd4-4ef5779a7b6d',
      mainColorProduction: ['B', 'R'],
      id: '1441fba4-fe06-4b5f-a103-aa6cf59a3859',
    },
    {
      name: 'Blooming Marsh',
      oracle_id: '66fa2326-1b5d-41fb-b919-83bf9f383577',
      mainColorProduction: ['B', 'G'],
      id: '861caabb-0573-4e94-8b03-342f90465064',
    },
    {
      name: 'Botanical Sanctum',
      oracle_id: '88f8f683-738e-48f3-afff-c8f73f1033a2',
      mainColorProduction: ['G', 'U'],
      id: 'cc18d5f4-a56a-4f7d-9f56-ccc92cbfb7f7',
    },
    {
      name: 'Concealed Courtyard',
      oracle_id: '2d899466-b1eb-4901-b626-1f2fb09b786d',
      mainColorProduction: ['B', 'W'],
      id: 'b75df1f0-0513-40e4-a449-454f75de6434',
    },
    {
      name: 'Copperline Gorge',
      oracle_id: 'a05f641c-15c9-43dc-ae0d-1ea372fd33d5',
      mainColorProduction: ['G', 'R'],
      id: '78b0f36b-7d8c-4e77-adc2-a4dad93a81d5',
    },
    {
      name: 'Darkslick Shores',
      oracle_id: 'a2b48695-f7d7-42ce-a8a0-2a723428542a',
      mainColorProduction: ['B', 'U'],
      id: 'bcbda15b-e49a-4445-a0e1-f221aa82c1e8',
    },
    {
      name: 'Inspiring Vantage',
      oracle_id: '3f17c60e-923a-4392-9da8-87d9ded009b7',
      mainColorProduction: ['R', 'W'],
      id: '85df6b6a-2dcf-4828-a4a8-e07d52e1fddd',
    },
    {
      name: 'Razorverge Thicket',
      oracle_id: '94f6c407-e665-4032-be13-a01e40c1f306',
      mainColorProduction: ['G', 'W'],
      id: '65b26f68-3a25-4c4e-bc76-a199ab479a50',
    },
    {
      name: 'Seachrome Coast',
      oracle_id: '9e7a240d-dc33-47ac-9f17-77fab4c1c340',
      mainColorProduction: ['U', 'W'],
      id: '9ed7441f-f624-49c8-8611-d9bba0e441ac',
    },
    {
      name: 'Spirebluff Canal',
      oracle_id: 'eb0d8093-5f93-4b25-9384-08f9731bfb28',
      mainColorProduction: ['R', 'U'],
      id: '59a04e16-a767-4112-ab01-6ca1b09c286c',
    },
  ],
};

const revealLands = {
  name: 'Reveallands',
  id: 'revealLands',
  numberOfColors: 2,
  tier: 1,
  lands: [
    {
      name: 'Choked Estuary',
      oracle_id: 'd473b507-8c33-4118-bc10-b0a268776074',
      mainColorProduction: ['B', 'U'],
      id: '995d44ca-626d-4c95-97af-ee53fa8baaf0',
    },
    {
      name: 'Foreboding Ruins',
      oracle_id: '5c87e2fa-77f1-4978-b25f-f14d227301d1',
      mainColorProduction: ['B', 'R'],
      id: '3c26ee31-7e2a-4eed-b448-04989fb57523',
    },
    {
      name: 'Fortified Village',
      oracle_id: '56f1a16a-9f41-41fb-b580-c200bca27cd6',
      mainColorProduction: ['G', 'W'],
      id: '1feb9dc1-671d-43ad-ae22-ed1a9916b140',
    },
    {
      name: 'Frostboil Snarl',
      oracle_id: '7137aae6-260d-41de-8b4e-42a8cf752697',
      mainColorProduction: ['R', 'U'],
      id: 'c22ba565-da08-4957-93bb-8d266fe0b0d8',
    },
    {
      name: 'Furycalm Snarl',
      oracle_id: '651dea9c-2375-4e44-8e65-ba8e40f0c0ef',
      mainColorProduction: ['R', 'W'],
      id: '53e33f37-7fd1-4431-a032-cd61b644401c',
    },
    {
      name: 'Game Trail',
      oracle_id: '00de57d2-7cb6-4337-9bc6-f6711e4dfabf',
      mainColorProduction: ['G', 'R'],
      id: '21cb5950-adaa-438d-998b-3a64bd4a2b3e',
    },
    {
      name: 'Necroblossom Snarl',
      oracle_id: '761ee6f9-b0fa-43c9-8d1f-9591ea18e52d',
      mainColorProduction: ['B', 'G'],
      id: 'b0aed316-c28a-4c1a-a0a3-ab75ceba3ee7',
    },
    {
      name: 'Port Town',
      oracle_id: '458d2b12-f578-4392-98d3-c3bc83f316c4',
      mainColorProduction: ['U', 'W'],
      id: 'b866712a-c3ef-4a43-ac0f-146c7836f0d6',
    },
    {
      name: 'Shineshadow Snarl',
      oracle_id: 'c9fc13d6-bd10-47bc-b2b6-7f67a1f3371e',
      mainColorProduction: ['B', 'W'],
      id: '84a46ebf-6938-4100-8f5f-0605ad2be4fc',
    },
    {
      name: 'Vineglimmer Snarl',
      oracle_id: '33f52df8-4b44-4422-8b0a-37fead9c894b',
      mainColorProduction: ['G', 'U'],
      id: 'f77e5ca7-dde1-435f-9b40-87558dd88749',
    },
  ],
};

const bondLands = {
  name: 'Bondlands',
  id: 'bondLands',
  numberOfColors: 2,
  tier: 4,
  lands: [
    {
      name: 'Bountiful Promenade',
      oracle_id: '761cb262-f83b-4a99-9345-b773182a7671',
      mainColorProduction: ['G', 'W'],
      id: '5125a8d8-344d-4419-b37a-ddf343493c5f',
    },
    {
      name: 'Luxury Suite',
      oracle_id: '819e1765-8325-4e6f-89c1-63ea86de369f',
      mainColorProduction: ['B', 'R'],
      id: '6fc5fc38-4054-4663-9061-df5455788c4a',
    },
    {
      name: 'Morphic Pool',
      oracle_id: 'bd004c9d-771e-4e63-a97d-a2259c096af8',
      mainColorProduction: ['B', 'U'],
      id: '48e40927-dd87-42ed-b805-0ae8ba81f5fb',
    },
    {
      name: 'Rejuvenating Springs',
      oracle_id: 'd1620449-930a-4895-a143-fd2a0a3c8b17',
      mainColorProduction: ['G', 'U'],
      id: '455be293-80cf-4bc6-8904-8dd21a2b9d19',
    },
    {
      name: 'Sea of Clouds',
      oracle_id: '672e190d-8ea0-4a2e-b74f-5d35304631e4',
      mainColorProduction: ['U', 'W'],
      id: 'd4fb722f-40af-4bd1-b660-e8186b98f233',
    },
    {
      name: 'Spectator Seating',
      oracle_id: 'cf6d10ed-85c3-48f2-8ba0-2960e03b408b',
      mainColorProduction: ['R', 'W'],
      id: 'dcf3140f-d5c8-45ff-8be4-622b1a129b3d',
    },
    {
      name: 'Spire Garden',
      oracle_id: '45fe016e-1a09-410c-bbe3-4663ba06c5b7',
      mainColorProduction: ['G', 'R'],
      id: '72aed540-7833-4442-90a9-aa5468014c65',
    },
    {
      name: 'Training Center',
      oracle_id: 'e3570ac7-c593-40e3-bbd6-ec3da6d8158d',
      mainColorProduction: ['R', 'U'],
      id: '78a39d22-5e3b-4ba0-b728-dbf16b61fc8f',
    },
    {
      name: 'Undergrowth Stadium',
      oracle_id: '7c69f718-acc8-4851-8e5d-0cbaaa86192c',
      mainColorProduction: ['B', 'G'],
      id: 'ae16c7da-912c-4d66-b1e7-17480cd3af99',
    },
    {
      name: 'Vault of Champions',
      oracle_id: 'ebc5ac83-08d4-4d6b-b840-0c4ba71a38ab',
      mainColorProduction: ['B', 'W'],
      id: 'cafd7db6-b04e-4fa2-bccd-981211132a93',
    },
  ],
};

const pathwayLands = {
  name: 'Pathwaylands',
  id: 'pathwayLands',
  numberOfColors: 2,
  tier: 3,
  lands: [
    {
      name: 'Barkchannel Pathway // Tidechannel Pathway',
      oracle_id: '59d22de5-e310-44d7-89cf-ef3529e40cef',
      mainColorProduction: ['G', 'U'],
      id: 'b6de14ae-0132-4261-af00-630bf15918cd',
    },
    {
      name: 'Blightstep Pathway // Searstep Pathway',
      oracle_id: 'e580a229-e800-4746-9d37-c32fcef8de28',
      mainColorProduction: ['B', 'R'],
      id: '0ce39a19-f51d-4a35-ae80-5b82eb15fcff',
    },
    {
      name: 'Branchloft Pathway // Boulderloft Pathway',
      oracle_id: '7c304547-a4b1-46c9-baed-16d2bfbe16eb',
      mainColorProduction: ['G', 'W'],
      id: '0511e232-2a72-40f5-a400-4f7ebc442d17',
    },
    {
      name: 'Brightclimb Pathway // Grimclimb Pathway',
      oracle_id: '1c633e02-95ef-445e-b4e0-fbfbc5ed9cc9',
      mainColorProduction: ['B', 'W'],
      id: 'd24c3d51-795d-4c01-a34a-3280fccd2d78',
    },
    {
      name: 'Clearwater Pathway // Murkwater Pathway',
      oracle_id: '144119bc-7fd1-45c5-9e29-f742e7c255ac',
      mainColorProduction: ['B', 'U'],
      id: 'b4b99ebb-0d54-4fe5-a495-979aaa564aa8',
    },
    {
      name: 'Cragcrown Pathway // Timbercrown Pathway',
      oracle_id: '727ca426-f4cc-4218-8ae5-8c427af2e816',
      mainColorProduction: ['G', 'R'],
      id: 'da57eb54-5199-4a56-95f7-f6ac432876b1',
    },
    {
      name: 'Darkbore Pathway // Slitherbore Pathway',
      oracle_id: '868e6e68-4367-4073-a864-235d5961ae56',
      mainColorProduction: ['B', 'G'],
      id: '87a4e5fe-161f-42da-9ca2-67c8e8970e94',
    },
    {
      name: 'Hengegate Pathway // Mistgate Pathway',
      oracle_id: '461b3f2f-fcee-4160-abfa-061f8b6a784f',
      mainColorProduction: ['U', 'W'],
      id: '7ef37cb3-d803-47d7-8a01-9c803aa2eadc',
    },
    {
      name: 'Needleverge Pathway // Pillarverge Pathway',
      oracle_id: 'a9b8d020-4d72-4934-8942-df29ef19fc1d',
      mainColorProduction: ['R', 'W'],
      id: '6559047e-6ede-4815-a3a0-389062094f9d',
    },
    {
      name: 'Riverglide Pathway // Lavaglide Pathway',
      oracle_id: '4924b3a4-a218-4783-8a4d-82361fdecc78',
      mainColorProduction: ['R', 'U'],
      id: '2668ac91-6cda-4f81-a08d-4fc5f9cb35b2',
    },
  ],
};

const slowLands = {
  name: 'Slowlands',
  id: 'slowLands',
  numberOfColors: 2,
  tier: 3,
  lands: [
    {
      name: 'Deathcap Glade',
      oracle_id: 'f6d24565-5b32-4eff-b2e0-6e2c25516ff0',
      mainColorProduction: ['B', 'G'],
      id: '2f20e738-bab6-4000-afca-9fc9e4261c34',
    },
    {
      name: 'Deserted Beach',
      oracle_id: 'f0ec8681-da50-466b-8cdd-1dc710deccd9',
      mainColorProduction: ['U', 'W'],
      id: 'c819de09-dac2-407a-98c8-775865e9bdf8',
    },
    {
      name: 'Dreamroot Cascade',
      oracle_id: 'dd8538e6-cd5f-4a88-aff5-eb5e76ce8ddb',
      mainColorProduction: ['G', 'U'],
      id: '4d413c29-e7df-4943-8a38-92ad3de4f507',
    },
    {
      name: 'Haunted Ridge',
      oracle_id: 'e2a37967-4212-4553-9f77-bcb613405807',
      mainColorProduction: ['B', 'R'],
      id: '32f1e668-89b8-4f82-afc1-6c3efb1fef3b',
    },
    {
      name: 'Overgrown Farmland',
      oracle_id: '709d2f10-1585-48c3-9058-ddd5f62f0452',
      mainColorProduction: ['G', 'W'],
      id: '5d61ebe0-e115-49d8-a97d-53b81b8acdc5',
    },
    {
      name: 'Rockfall Vale',
      oracle_id: '185c70c1-8403-4ae5-b45d-3679d4ee092a',
      mainColorProduction: ['G', 'R'],
      id: 'd4ef22f2-7c4f-4198-982b-f0830fd769cc',
    },
    {
      name: 'Shattered Sanctum',
      oracle_id: 'c854ecb0-cc60-4c48-a9aa-7f2348a7a8c6',
      mainColorProduction: ['B', 'W'],
      id: '89bec47e-811d-4540-9834-8b9670e00c5c',
    },
    {
      name: 'Shipwreck Marsh',
      oracle_id: '5f42b67f-87fd-4f98-a0e8-0c8313f4bbc8',
      mainColorProduction: ['B', 'U'],
      id: '156df6eb-1ac9-4954-bf93-b1668096b8bd',
    },
    {
      name: 'Stormcarved Coast',
      oracle_id: '4722105b-0085-4bb8-bca1-9de0d3eb5600',
      mainColorProduction: ['R', 'U'],
      id: '2a91991f-4340-45a7-ba04-0001de9581e0',
    },
    {
      name: 'Sundown Pass',
      oracle_id: '5ad0b405-cca4-475e-985c-4d7e3599d87e',
      mainColorProduction: ['R', 'W'],
      id: '12ca1b4f-3e98-4ad4-93fe-c4c2de09aa58',
    },
  ],
};

const surveilDuals = {
  name: 'Surveil duals',
  id: 'surveilDuals',
  numberOfColors: 2,
  tier: 4,
  lands: [
    {
      name: 'Commercial District',
      oracle_id: 'b33656ae-3473-4223-845f-f9147f87678b',
      mainColorProduction: ['G', 'R'],
      id: 'bf220c06-3cce-4bdd-aa58-83940c223e9c',
    },
    {
      name: 'Elegant Parlor',
      oracle_id: '9ea747cf-5d04-4aa7-bdc3-8145860cd1ba',
      mainColorProduction: ['R', 'W'],
      id: '72c6d541-e2cb-4d6e-acac-90a8f53b7006',
    },
    {
      name: 'Hedge Maze',
      oracle_id: 'ca4b6689-04ee-4227-9bdc-cb5a9590c745',
      mainColorProduction: ['G', 'U'],
      id: '5260f8ae-805b-4eae-badf-62de0f768867',
    },
    {
      name: 'Lush Portico',
      oracle_id: 'd51831b1-7394-456e-a1de-6787a59f5932',
      mainColorProduction: ['G', 'W'],
      id: 'c17816e8-28b1-4295-a637-efb0e5c18873',
    },
    {
      name: 'Meticulous Archive',
      oracle_id: 'ccfb8b4d-651c-418a-aa19-cb23105b3f2f',
      mainColorProduction: ['U', 'W'],
      id: '652236c2-84ef-45e4-b5fc-ed6170bc3d6c',
    },
    {
      name: 'Raucous Theater',
      oracle_id: '04e5e84f-8fd4-43ab-8f9d-5b24646f7ae5',
      mainColorProduction: ['B', 'R'],
      id: 'b598c93e-dae1-4d71-a9e4-917abf76d2d0',
    },
    {
      name: 'Shadowy Backstreet',
      oracle_id: '216a2a92-9ca3-4ca3-8af7-686c13b04290',
      mainColorProduction: ['B', 'W'],
      id: '69c1b656-1d67-499c-bf0f-417682a86c7d',
    },
    {
      name: 'Thundering Falls',
      oracle_id: 'd2bcff58-7a8a-46ef-b6b3-39501d4c8e6e',
      mainColorProduction: ['R', 'U'],
      id: '17260fff-b239-4af4-9306-3236ae3fa5a5',
    },
    {
      name: 'Undercity Sewers',
      oracle_id: '08d80efc-9542-4ba2-824c-c8615d8d07f2',
      mainColorProduction: ['B', 'U'],
      id: '2b5801fb-2026-4f25-98bc-ebb2f99684b9',
    },
    {
      name: 'Underground Mortuary',
      oracle_id: '840119bf-e60f-4ff7-9c9b-d420d09df545',
      mainColorProduction: ['B', 'G'],
      id: 'f6ca59cd-8779-4a84-a54b-e863b79c61f0',
    },
  ],
};

const vergeLands = {
  name: 'Vergelands',
  id: 'vergeLands',
  numberOfColors: 2,
  tier: 3,
  lands: [
    {
      name: 'Blazemire Verge',
      oracle_id: '977c2f33-b622-4172-9efb-7f523becd32b',
      mainColorProduction: ['B', 'R'],
      id: 'd151c8e2-d715-470d-868a-f45191db9fa0',
    },
    {
      name: 'Bleachbone Verge',
      oracle_id: '2b8144a0-08d2-4c28-9fd7-5d90f90105e4',
      mainColorProduction: ['B', 'W'],
      id: '52dcdabd-a186-45fe-9fee-6c0f1afeaf16',
    },
    {
      name: 'Floodfarm Verge',
      oracle_id: 'f1e9abfb-c3c8-483e-b446-5c2afc9f6394',
      mainColorProduction: ['U', 'W'],
      id: 'd53ed0db-1199-44b3-8eda-8189dfcf53d1',
    },
    {
      name: 'Gloomlake Verge',
      oracle_id: 'd71bda4c-3dee-4398-8fd0-f77d8743b887',
      mainColorProduction: ['B', 'U'],
      id: '83f510b7-4cbd-4883-9c26-c8824bc668ac',
    },
    {
      name: 'Hushwood Verge',
      oracle_id: 'cce328b9-6100-417e-9ddf-808bbe3e3bc5',
      mainColorProduction: ['G', 'W'],
      id: 'ec288d76-c1f5-471b-8a53-504f88469c1b',
    },
    {
      name: 'Riverpyre Verge',
      oracle_id: '510a6ac5-f098-4145-ac07-771b1b6f7cdf',
      mainColorProduction: ['R', 'U'],
      id: '57a93a71-d77c-417f-85d0-cd420f573331',
    },
    {
      name: 'Tainted Field',
      oracle_id: '439de49b-1091-4688-9ffb-80a025df31c2',
      mainColorProduction: ['B', 'W'],
      id: '75b5f0aa-1570-4064-ad20-aac7be8b2c9c',
    },
    {
      name: 'Tainted Peak',
      oracle_id: 'b2bae7fc-0668-4b34-9cd6-0d80aea52275',
      mainColorProduction: ['B', 'R'],
      id: '4dcaaabe-e1d7-4047-9960-79178af3d903',
    },
    {
      name: 'Tainted Wood',
      oracle_id: 'fa6d05a1-3df4-4751-b1a0-8d9693faec73',
      mainColorProduction: ['B', 'G'],
      id: '6996d63b-acf1-40d0-8c03-e54eb2e28874',
    },
    {
      name: 'Thornspire Verge',
      oracle_id: 'e861bc08-4f0b-4d22-9b85-9d20227fd5b4',
      mainColorProduction: ['G', 'R'],
      id: '7e1cdc03-6faa-4138-9a52-caafbe34fb59',
    },
    {
      name: 'Wastewood Verge',
      oracle_id: 'c6e0574c-3e2b-4c40-b17a-05bce3d49309',
      mainColorProduction: ['B', 'G'],
      id: '5ceacc7d-d407-4f82-af58-9bdf8426924e',
    },
    {
      name: 'Willowrush Verge',
      oracle_id: 'c52eaa87-9251-4a47-83fd-04e582ade612',
      mainColorProduction: ['G', 'U'],
      id: '758d93d5-3f66-4395-a928-000485396c87',
    },
  ],
};

const tricycleLands = {
  name: 'Tricycle lands',
  id: 'tricycleLands',
  numberOfColors: 3,
  tier: 4,
  lands: [
    {
      name: 'Indatha Triome',
      oracle_id: 'ec2b3779-55f7-4169-aa66-6312fb52721f',
      mainColorProduction: ['B', 'G', 'W'],
      id: '2b74bb81-fb9a-40e5-a941-e517430b52f5',
    },
    {
      name: "Jetmir's Garden",
      oracle_id: 'f5896356-5744-4f7e-a4e5-1cc36dde5958',
      mainColorProduction: ['G', 'R', 'W'],
      id: '26d40e03-6de4-4373-9fbf-04c1dd79e995',
    },
    {
      name: 'Ketria Triome',
      oracle_id: '6bae00e8-06cf-4ac4-a1cc-757e454109fe',
      mainColorProduction: ['G', 'R', 'U'],
      id: 'a249b1f4-2b22-4b67-a207-e0c4ae95d2e1',
    },
    {
      name: "Raffine's Tower",
      oracle_id: '6e9ef5ef-6aed-4d3e-a59b-9e3dc8740b1b',
      mainColorProduction: ['B', 'U', 'W'],
      id: 'a2c56479-4bee-4edb-80d7-4af010b7c793',
    },
    {
      name: 'Raugrin Triome',
      oracle_id: 'c7fa1dda-9312-4ec8-82cd-a1ba7bc33497',
      mainColorProduction: ['R', 'U', 'W'],
      id: '02138fbb-3962-4348-8d31-faaefba0b8b2',
    },
    {
      name: 'Savai Triome',
      oracle_id: '00625242-9348-4ef4-b975-f2ac82fee21d',
      mainColorProduction: ['B', 'R', 'W'],
      id: '748e6a61-9c1f-4225-9f04-e54002f63ac3',
    },
    {
      name: "Spara's Headquarters",
      oracle_id: '3123ec89-8e95-4761-ba17-747ec667509f',
      mainColorProduction: ['G', 'U', 'W'],
      id: '7363f1fb-9af3-4212-921f-d59533faf0e5',
    },
    {
      name: "Xander's Lounge",
      oracle_id: '8291543f-d086-48aa-b2b7-5481ca8c9198',
      mainColorProduction: ['B', 'R', 'U'],
      id: '54f449ff-4025-465e-9ec5-a5cf42c4c9d3',
    },
    {
      name: 'Zagoth Triome',
      oracle_id: 'fdd46004-eaba-4024-8687-39b23dc6a58c',
      mainColorProduction: ['B', 'G', 'U'],
      id: 'cc520518-2063-4b57-a0d4-10cf62a7175e',
    },
    {
      name: "Ziatora's Proving Ground",
      oracle_id: 'f7e7b78c-c769-4720-8585-1874773eb342',
      mainColorProduction: ['B', 'G', 'R'],
      id: '75fdce80-e338-4a50-bdc6-786511feaeef',
    },
  ],
};

const originalDuals = {
  name: 'Original duals',
  id: 'originalDuals',
  numberOfColors: 2,
  tier: 5,
  lands: [
    {
      name: 'Tundra',
      oracle_id: '02418479-9455-417f-a6a1-004356faff37',
      mainColorProduction: ['U', 'W'],
      id: '49fdfb01-560a-4996-afc2-879c8d10e042',
    },
    {
      name: 'Underground Sea',
      oracle_id: '4b22be3a-8ce1-47d1-b82e-6c3ccfb0548b',
      mainColorProduction: ['B', 'U'],
      id: '068bb15a-fc2d-42a2-859b-837b946d23c0',
    },
    {
      name: 'Balands',
      oracle_id: '13ff3222-91cb-4796-a34e-899ed817694c',
      mainColorProduction: ['B', 'R'],
      id: '377cee38-e769-47b0-abd5-0f528600f36a',
    },
    {
      name: 'Taiga',
      oracle_id: '22e3cf1d-3559-4ce1-954c-8dc815342979',
      mainColorProduction: ['G', 'R'],
      id: '79cc2242-6064-4c90-a46b-0e59144bc04a',
    },
    {
      name: 'Savannah',
      oracle_id: '703243f0-8cb3-420f-958f-5fd4bde30293',
      mainColorProduction: ['G', 'W'],
      id: 'a6714aba-7576-41b8-9f6b-5303f5b69689',
    },
    {
      name: 'Scrubland',
      oracle_id: 'c8d95ca8-7d12-4072-aeaf-e20f248c7e39',
      mainColorProduction: ['B', 'W'],
      id: '649aa116-4bb5-4974-b8dc-38a8c627717a',
    },
    {
      name: 'Volcanic Island',
      oracle_id: 'c718911c-c955-4eb9-9e16-be4bd49a4e4e',
      mainColorProduction: ['R', 'U'],
      id: 'f73ea932-5aba-4847-bb13-4cc0eb5dc726',
    },
    {
      name: 'Bayou',
      oracle_id: 'b76d1ae6-ad1d-4bac-b4c3-2e03e0e84d9b',
      mainColorProduction: ['B', 'G'],
      id: 'e83d49c1-7d84-43f9-8548-5697603fefc0',
    },
    {
      name: 'Plateau',
      oracle_id: 'c7a15ca4-085f-4d92-8387-c3711c04c8fa',
      mainColorProduction: ['R', 'W'],
      id: '2ff721e2-b12a-4cd1-b846-fccd61c6b69b',
    },
    {
      name: 'Tropical Island',
      oracle_id: '74b7fe23-5d3a-4092-8d78-7c0eba8f6f73',
      mainColorProduction: ['G', 'U'],
      id: 'fd105eda-aff6-4b01-a892-e9502346caee',
    },
  ],
};

const utilityLands = {
  name: 'Utility lands',
  id: 'utilityLands',
  tier: 2,
  lands: [
    {
      name: 'Reliquary Tower',
      oracle_id: 'c23e5b80-08d2-4e24-9908-fe2aa4f30f6f',
      mainColorProduction: [],
      autoSelect: false,
      id: 'ec1d8a99-8a06-4e51-9277-96edb6899b29',
    },
    {
      name: 'Bojuka Bog',
      oracle_id: '04b7362d-0490-4cb0-b5d7-2a7732f659ce',
      mainColorProduction: ['B'],
      autoSelect: false,
      id: 'd46ca7cb-4a04-4081-8834-6bc29e0762d2',
    },
    {
      name: "Rogue's Passage",
      oracle_id: 'f29dc596-2121-4421-8463-15f6c2e8b9b3',
      mainColorProduction: [],
      autoSelect: false,
      id: 'a2a424ea-ef32-4ac5-8f8c-3ea1839f01d4',
    },
    {
      name: 'Strip Mine',
      oracle_id: 'd21a89eb-7c5b-459a-acc7-12b20b13bf79',
      mainColorProduction: [],
      autoSelect: false,
      id: '1b8de79d-5efe-4e21-8614-786689fcad58',
    },
    {
      name: 'Field of the Dead',
      oracle_id: 'aa959340-c869-4caa-92c7-572bd8d23eef',
      mainColorProduction: [],
      autoSelect: false,
      gameChanger: true,
      id: '470ca3f4-29aa-4c4c-8ff2-8cdd70c69943',
    },
    {
      name: 'Command Beacon',
      oracle_id: '7e8c2a18-e404-40ff-a9e0-ec3eeb6d576e',
      mainColorProduction: [],
      autoSelect: false,
      gameChanger: true,
      id: '0bec6181-e214-4833-8c2f-8a10d59b2879',
    },
    {
      name: "Urza's Saga",
      oracle_id: '4c6a0c30-b547-4eff-8ff4-0ca25803c076',
      mainColorProduction: [],
      autoSelect: false,
      id: 'c1e0f201-42cb-46a1-901a-65bb4fc18f6c',
    },
    {
      name: "Urza's Cave",
      oracle_id: '4474ecee-0ec3-409b-90df-738d9313fe3c',
      mainColorProduction: [],
      autoSelect: false,
      id: '926916ed-2f22-4ba9-9427-194886ad6c1e',
    },
    {
      name: 'War Room',
      oracle_id: '71c52bf5-2a5d-488e-8b15-7ef290e4b77d',
      mainColorProduction: [],
      autoSelect: false,
      id: '792eb00d-41e2-4556-b560-0925bd9be3a6',
    },
    {
      name: 'Mystic Sanctuary',
      oracle_id: '17b60106-a4c7-410a-8ac3-ec8e74e29a7c',
      mainColorProduction: ['U'],
      autoSelect: false,
      id: '31f83f35-c4dc-46f0-9109-9d0d0181d9c8',
    },
  ],
};

const channelLands = {
  name: 'Channellands',
  id: 'channelLands',
  numberOfColors: 1,
  tier: 4,
  lands: [
    {
      name: 'Boseiju, Who Endures',
      oracle_id: 'bf1341dd-41a3-49f6-87ec-63170dde4324',
      mainColorProduction: ['G'],
      id: '2135ac5a-187b-4dc9-8f82-34e8d1603416',
    },
    {
      name: 'Eiganjo, Seat of the Empire',
      oracle_id: '7edb3d15-4f70-4ebe-8c5e-caf6a225076d',
      mainColorProduction: ['W'],
      id: 'c375a022-5b57-496d-a802-e4ea8376e9e4',
    },
    {
      name: 'Otawara, Soaring City',
      oracle_id: 'e9b6a394-691c-425a-9307-76d8edc7375e',
      mainColorProduction: ['U'],
      id: '486d7edc-d983-41f0-8b78-c99aecd72996',
    },
    {
      name: 'Sokenzan, Crucible of Defiance',
      oracle_id: 'c5ee72d5-3a9e-4fe5-8802-3286ee612055',
      mainColorProduction: ['R'],
      id: 'aa548dcd-c1dd-492d-a69f-c65dfeef0633',
    },
    {
      name: 'Takenuma, Abandoned Mire',
      oracle_id: 'ac2dd694-d2f1-4025-8400-12332bdc882a',
      mainColorProduction: ['B'],
      id: '499037cc-a577-41cb-8ca2-5e117945634f',
    },
  ],
};

const otherLands = {
  name: 'Other lands',
  id: 'otherLands',
  tier: 4,
  lands: [
    {
      name: 'Cabal Coffers',
      oracle_id: '7358e164-5704-4e78-9b21-6a9bf2a968ce',
      mainColorProduction: ['B'],
      autoSelect: false,
      id: 'e1efb0d3-2c72-46ff-bdc1-1069967365a0',
    },
    {
      name: 'Urborg, Tomb of Yawgmoth',
      oracle_id: 'db6174d7-211d-4817-b8e4-8384594c83f9',
      mainColorProduction: ['B'],
      autoSelect: false,
      id: '9e1a9e38-6ffc-490f-b0be-23ba4e8204c6',
    },
    {
      name: 'Yavimaya, Cradle of Growth',
      oracle_id: '8dd5f5af-d2d8-4356-8617-8381081b930c',
      mainColorProduction: ['G'],
      autoSelect: false,
      id: '4e4b6e22-93b2-4896-bba5-0ceaa5d8ea3c',
    },
    {
      name: 'Nykthos, Shrine to Nyx',
      oracle_id: '84dc18f0-8225-4b40-a165-b10321e41769',
      mainColorProduction: [],
      id: '834b27a0-dfd7-4f96-8cde-cacac4b24acc',
      autoSelect: false,
      condition: (colorIdentity) => colorIdentity.length > 0,
    },
    {
      name: 'Ancient Tomb',
      oracle_id: '23467047-6dba-4498-b783-1ebc4f74b8c2',
      mainColorProduction: [],
      autoSelect: false,
      gameChanger: true,
      id: 'bd3d4b4b-cf31-4f89-8140-9650edb03c7b',
    },
  ],
};

const fiveColorLands = {
  name: 'Rainbowlands',
  id: 'fiveColorLands',
  numberOfColors: 5,
  condition: (colorIdentity) => colorIdentity.length > 1,
  tier: 3,
  lands: [
    {
      name: 'Command Tower',
      oracle_id: '0895c9b7-ae7d-4bb3-af17-3b75deb50a25',
      mainColorProduction: [],
      id: '4a2d381e-4082-4e7d-a109-a7c700ceddfd',
    },
    {
      name: 'Exotic Orchard',
      oracle_id: '27b047e3-0d41-45e2-98e9-9391d7923a1e',
      mainColorProduction: [],
      id: 'f9083583-6fa9-4b8a-86bb-59e51ad06b33',
    },
    {
      name: 'Reflecting Pool',
      oracle_id: '67f43ac6-2a58-4b53-b5d7-0330e2a252e2',
      mainColorProduction: [],
      id: '18a1b3f5-473d-45ca-be0d-e67e77ba30ce',
    },
    {
      name: 'Fabled Passage',
      oracle_id: '0c85b8f7-0bd0-4680-9ec5-d4b110460a54',
      mainColorProduction: [],
      id: '8809830f-d8e1-4603-9652-0ad8b00234e9',
    },
    {
      name: 'Prismatic Vista',
      oracle_id: '032b8a0d-491a-4a12-ab9f-689010054d5b',
      mainColorProduction: [],
      id: 'e37da81e-be12-45a2-9128-376f1ad7b3e8',
    },
    {
      name: 'City of Brass',
      oracle_id: 'f25351e3-539b-4bbc-b92d-6480acf4d722',
      mainColorProduction: [],
      id: 'bed4a63d-632a-4a3a-b35f-f8e155237d27',
    },
    {
      name: 'Mana Confluence',
      oracle_id: 'd0ee5bdc-2b69-4b73-9a20-ffcc18783b29',
      mainColorProduction: [],
      id: '504a69eb-3c2d-4bb1-b117-252b15acf0c2',
    },
  ],
};

const tribalLands = {
  name: 'Typallands',
  id: 'tribalLands',
  numberOfColors: 5,
  tier: 3,
  lands: [
    {
      name: 'Path of Ancestry',
      oracle_id: 'b473e293-59e3-4e04-acf2-622604aeb25f',
      mainColorProduction: [],
      autoSelect: false,
      id: '42522c12-874e-450f-bdea-901646eb2821',
    },
    {
      name: 'Cavern of Souls',
      oracle_id: '89ca686a-7c72-4d8f-9290-e89635624a83',
      mainColorProduction: [],
      autoSelect: false,
      id: '3aad15a2-8a1b-4460-9b06-e85863081878',
    },
    {
      name: 'Unclaimed Territory',
      oracle_id: '584b15f2-6ae9-413a-8b8d-9244dbea4878',
      mainColorProduction: [],
      autoSelect: false,
      id: '733581f8-7909-47fb-8bab-cf78b1a660d3',
      condition: (colorIdentity) => colorIdentity.length > 1,
    },
    {
      name: 'Secluded Courtyard',
      oracle_id: '79ba18fd-f184-43c1-86df-56ee18ce806c',
      mainColorProduction: [],
      autoSelect: false,
      id: 'd13373d2-139b-48c7-a8c9-828cefc4f150',
      condition: (colorIdentity) => colorIdentity.length > 1,
    },
  ],
};

const basicLands = {
  name: 'Basic lands',
  id: 'basicLands',
  numberOfColors: 1,
  tier: 0,
  lands: [
    {
      name: 'Plains',
      oracle_id: 'bc71ebf6-2056-41f7-be35-b2e5c34afa99',
      mainColorProduction: ['W'],
      id: '4b7604bd-b3b0-4e55-91c4-3717bae7e457',
    },
    {
      name: 'Island',
      oracle_id: 'b2c6aa39-2d2a-459c-a555-fb48ba993373',
      mainColorProduction: ['U'],
      id: '947702ca-d065-4368-9f26-f859d4642cb6',
    },
    {
      name: 'Swamp',
      oracle_id: '56719f6a-1a6c-4c0a-8d21-18f7d7350b68',
      mainColorProduction: ['B'],
      id: '09af769d-a051-40d4-b203-7ec818c367ca',
    },
    {
      name: 'Mountain',
      oracle_id: 'a3fb7228-e76b-4e96-a40e-20b5fed75685',
      mainColorProduction: ['R'],
      id: '62465f68-6a84-41ae-8a14-41f41e817eff',
    },
    {
      name: 'Forest',
      oracle_id: 'b34bb2dc-c1af-4d77-b0b3-a0fb342a5fc6',
      mainColorProduction: ['G'],
      id: '9e0d673b-cd7d-4d8f-8c62-63c79531ff85',
    },
    {
      name: 'Wastes',
      oracle_id: '05d24b0c-904a-46b6-b42a-96a4d91a0dd4',
      mainColorProduction: [],
      id: 'c61feafd-ef09-437c-a12c-fd7d6cb8c15a',
      condition: (colorIdentity) => colorIdentity.length === 0,
    },
  ],
};

export const LAND_CYCLES = [
  // tier 5
  originalDuals,

  // tier 4
  tricycleLands,
  fetchLands,
  shockLands,
  bondLands,
  surveilDuals,

  // tier 3
  checkLands,
  pathwayLands,
  slowLands,
  vergeLands,
  fiveColorLands,

  // tier 2
  painLands,
  horizonLands,
  filterLands,
  bounceLands,
  scryLands,

  // tier 1
  battleLands,
  fastLands,
  revealLands,

  // utility / situationals
  otherLands,
  channelLands,
  utilityLands,
  tribalLands,

  // basic
  basicLands,
];
