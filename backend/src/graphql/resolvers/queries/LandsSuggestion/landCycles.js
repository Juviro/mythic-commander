// Tiers:
// 1 - Filler
// 2 - Okay
// 3 - Great
// 4 - Optimal
// 5 - Original Duals

const painLands = {
  name: 'Pain Lands',
  numberOfColors: 2,
  tier: 2,
  lands: [
    {
      name: 'Adarkar Wastes',
      oracle_id: 'd5ad26cc-2bdb-46b7-b8bf-dd099d5fa09b',
      mainColorProduction: ['U', 'W'],
      id: '20c7a8ad-932b-4770-9884-25cb48126786',
    },
    {
      name: 'Battlefield Forge',
      oracle_id: '6b75b94e-83b7-457e-ac41-7ca90b5a59aa',
      mainColorProduction: ['R', 'W'],
      id: '7d5ad173-049a-4c28-98e3-b695123d242c',
    },
    {
      name: 'Brushland',
      oracle_id: '5eb8b497-ec9a-4a89-ad29-1ec3ca82da7c',
      mainColorProduction: ['G', 'W'],
      id: 'fa2089b2-f472-464b-b789-f5383501a88b',
    },
    {
      name: 'Caves of Koilos',
      oracle_id: '33de01e9-ce5a-42d4-afcb-343cd54a6d80',
      mainColorProduction: ['B', 'W'],
      id: '8093d57b-7b06-4444-a3f2-1e7a505b867b',
    },
    {
      name: 'Karplusan Forest',
      oracle_id: 'bd912666-f37f-4767-af6f-9e6d0fcccacf',
      mainColorProduction: ['G', 'R'],
      id: 'f87a052b-7e40-4107-8526-cdb55e81f185',
    },
    {
      name: 'Llanowar Wastes',
      oracle_id: '32116127-cf96-4a1b-8896-a1ebc087b597',
      mainColorProduction: ['B', 'G'],
      id: 'c2c8f000-4289-400d-83b0-6819b7837053',
    },
    {
      name: 'Shivan Reef',
      oracle_id: '0fe16212-66c3-4e45-a641-7391e9b2e304',
      mainColorProduction: ['R', 'U'],
      id: 'c5208575-298a-4c15-9c60-a2386e881079',
    },
    {
      name: 'Sulfurous Springs',
      oracle_id: 'f5c38c01-4a40-469f-91a0-7479daf4e8e7',
      mainColorProduction: ['B', 'R'],
      id: 'd9b73f76-c225-4523-a162-d2787e07a67f',
    },
    {
      name: 'Underground River',
      oracle_id: '857febd9-cdd7-4f8e-a852-d88084b0cfbc',
      mainColorProduction: ['B', 'U'],
      id: 'e289f61b-9076-4672-91cd-22442488bd37',
    },
    {
      name: 'Yavimaya Coast',
      oracle_id: '40b36bc6-c185-4bda-99e7-0118953c2c97',
      mainColorProduction: ['G', 'U'],
      id: '861a6b0c-720a-4296-857c-2b220c3848b9',
    },
  ],
};

const fetchLands = {
  name: 'Fetch Lands',
  numberOfColors: 2,
  tier: 4,
  lands: [
    {
      name: 'Arid Mesa',
      oracle_id: 'c5acf2a5-40f4-433d-a74d-1cb56c521464',
      mainColorProduction: ['R', 'W'],
      id: '3c563e41-0f72-4573-9565-d14c278c772c',
    },
    {
      name: 'Bloodstained Mire',
      oracle_id: 'fc0707c7-d504-4ccf-a0d2-3eb6e26e7a58',
      mainColorProduction: ['B', 'R'],
      id: '01889893-6c8a-40a1-a67b-f633ed42663c',
    },
    {
      name: 'Flooded Strand',
      oracle_id: 'f3c7af78-a77d-4134-82a2-a5ce84285a84',
      mainColorProduction: ['U', 'W'],
      id: '851416e9-231a-464b-84a1-0e4a77bf3537',
    },
    {
      name: 'Marsh Flats',
      oracle_id: 'dab520d0-20b4-4273-ba6b-eb07f85ea433',
      mainColorProduction: ['B', 'W'],
      id: 'be8b1a38-c64a-4d76-8094-1594957f89d3',
    },
    {
      name: 'Misty Rainforest',
      oracle_id: '09dd85aa-47bc-4713-a9b9-8b52ff2285ed',
      mainColorProduction: ['G', 'U'],
      id: 'c94f5d21-f09b-402a-9ac9-93e8131349cd',
    },
    {
      name: 'Polluted Delta',
      oracle_id: 'ef86989d-ce80-4e55-aece-7d11710eeffa',
      mainColorProduction: ['B', 'U'],
      id: 'f556488d-56ab-4a57-816d-9988177579b3',
    },
    {
      name: 'Scalding Tarn',
      oracle_id: 'cb027150-848c-4a66-88ad-e20222304dd8',
      mainColorProduction: ['R', 'U'],
      id: '36c8469a-b44c-4232-a579-b3b3a628e906',
    },
    {
      name: 'Verdant Catacombs',
      oracle_id: '67d60b24-d429-4ded-90d9-06e49f28c396',
      mainColorProduction: ['B', 'G'],
      id: 'c3752694-8255-4654-be8d-73c3a936a282',
    },
    {
      name: 'Windswept Heath',
      oracle_id: '29737a60-3ebd-40d9-b935-c4f54b90d45d',
      mainColorProduction: ['G', 'W'],
      id: '9f5e1b0c-7835-4d2c-8822-83b632976c6d',
    },
    {
      name: 'Wooded Foothills',
      oracle_id: '6587a463-a108-4854-b6d1-944e89b8c8a4',
      mainColorProduction: ['G', 'R'],
      id: 'f9353903-7ad9-4a40-9750-f8f20b8f4106',
    },
  ],
};

const filterLands = {
  name: 'Filter Lands',
  numberOfColors: 2,
  tier: 2,
  lands: [
    {
      name: 'Darkwater Catacombs',
      oracle_id: '4869a530-757f-4364-8d8e-4dc8001f433c',
      mainColorProduction: ['B', 'U'],
      id: '866506dc-803a-449e-b7d5-d918a1a36442',
    },
    {
      name: 'Desolate Mire',
      oracle_id: '3edf9201-265f-4cd9-b27b-8073bf1a4cf2',
      mainColorProduction: ['B', 'W'],
      id: '9d3a73c1-b062-421b-8777-6218d8442e36',
    },
    {
      name: 'Ferrous Lake',
      oracle_id: '62c15af0-40e1-407d-b056-7a3d909e3fdb',
      mainColorProduction: ['R', 'U'],
      id: '36209e91-c918-4d51-8785-5ee07073286b',
    },
    {
      name: 'Mossfire Valley',
      oracle_id: '23bbd091-f6ff-4514-97aa-42c08164b4eb',
      mainColorProduction: ['G', 'R'],
      id: 'b6f4e150-b8e7-4404-b924-f7b539958994',
    },
    {
      name: 'Overflowing Basin',
      oracle_id: '5ac8e01c-b0a7-4855-a122-1cd26b07c4a5',
      mainColorProduction: ['G', 'U'],
      id: 'f3914a27-0cfc-4396-857e-f633ed42663c',
    },
    {
      name: 'Shadowblood Ridge',
      oracle_id: '15687ee3-3cdb-4a8f-a726-46b73bceb792',
      mainColorProduction: ['B', 'R'],
      id: 'd66060c4-ed34-4054-ae9d-92d5236b3e64',
    },
    {
      name: 'Skycloud Expanse',
      oracle_id: '76f335d0-7f71-4b1a-b60d-73de954cbe2c',
      mainColorProduction: ['U', 'W'],
      id: '2d3c5097-f14d-444f-a947-f31652410a6a',
    },
    {
      name: 'Sungrass Prairie',
      oracle_id: '0a28dff0-2bd6-4105-b73a-b6c4735833fd',
      mainColorProduction: ['G', 'W'],
      id: '2f57ca5c-c2a4-44bf-a9d1-d24939b417bb',
    },
    {
      name: 'Sunscorched Divide',
      oracle_id: '8d2b2675-19df-4f40-9e8e-196ec097b91c',
      mainColorProduction: ['R', 'W'],
      id: '015d861d-720a-4296-857c-2b220c3848b9',
    },
    {
      name: 'Viridescent Bog',
      oracle_id: '6bd6d259-1af7-4dff-a79c-48a616d2a36e',
      mainColorProduction: ['B', 'G'],
      id: '1d624a04-ed34-4054-ae9d-92d5236b3e64',
    },
  ],
};

const bounceLands = {
  name: 'Bounce Lands',
  numberOfColors: 2,
  tier: 2,
  lands: [
    {
      name: 'Azorius Chancery',
      oracle_id: '189fc8f4-17ac-4f1d-82c8-8401445bdaf4',
      mainColorProduction: ['U', 'W'],
      id: '2668a6bd-7d0e-436a-ac82-ee776263884d',
    },
    {
      name: 'Boros Garrison',
      oracle_id: '8fa3ac81-3dfe-4565-be99-5554f7597b4b',
      mainColorProduction: ['R', 'W'],
      id: '91262d08-d218-472e-8488-829d6666e6c2',
    },
    {
      name: 'Coral Atoll',
      oracle_id: '3f347ebf-e0d2-4ae0-ad84-df7a460404e0',
      mainColorProduction: ['U'],
      id: 'c2e4344d-5282-4f01-9f2d-8e4de80c806f',
    },
    {
      name: 'Dimir Aqueduct',
      oracle_id: '378a1d57-e2f1-4b84-9692-1564602e9e99',
      mainColorProduction: ['B', 'U'],
      id: '7b966270-2d85-4876-88ad-22a4c2b9a716',
    },
    {
      name: 'Dormant Volcano',
      oracle_id: '38ba1956-5505-4a7a-b6af-e75715b1401f',
      mainColorProduction: ['R'],
      id: 'dd73b4d5-8f6a-493d-b2a8-12d7f457788b',
    },
    {
      name: 'Everglades',
      oracle_id: 'ef3b8b0c-cea7-4bae-934c-9c65fd64245d',
      mainColorProduction: ['B'],
      id: 'd9b73f76-c225-4523-a162-d2787e07a67f',
    },
    {
      name: 'Golgari Rot Farm',
      oracle_id: '1b301478-b14f-4ef8-94e6-9647d582eabe',
      mainColorProduction: ['B', 'G'],
      id: '2023b169-6f92-4f36-932f-93d39c5d120a',
    },
    {
      name: 'Gruul Turf',
      oracle_id: '657243dd-e479-4f4b-99d2-09b55d833a35',
      mainColorProduction: ['G', 'R'],
      id: '9653cb70-a38f-461d-ac15-cfd0333d8383',
    },
    {
      name: 'Izzet Boilerworks',
      oracle_id: '1cb9d94a-3039-4f2e-8fcc-6996f9a45f74',
      mainColorProduction: ['R', 'U'],
      id: 'ac3f572a-6058-4cc0-8b43-e40a0210214c',
    },
    {
      name: 'Jungle Basin',
      oracle_id: 'f922f90a-b1a2-4630-9266-40726ca89f74',
      mainColorProduction: ['G'],
      id: 'd196417d-2b7e-407e-9764-a0352ad27926',
    },
    {
      name: 'Karoo',
      oracle_id: 'd4e875d9-2245-470d-aa2f-1dfe66ce2d15',
      mainColorProduction: ['W'],
      id: '3779e53b-f6ce-46b0-9149-652f1e56b856',
    },
    {
      name: 'Orzhov Basilica',
      oracle_id: 'aa00ae0b-7c0f-427e-8102-ce0e2a6af5df',
      mainColorProduction: ['B', 'W'],
      id: '7b7c5225-b01c-4394-a475-685b19119c36',
    },
    {
      name: 'Rakdos Carnarium',
      oracle_id: '0a023964-2905-4928-9c3e-dc63e6ebd218',
      mainColorProduction: ['B', 'R'],
      id: '72535048-8d26-47b2-8409-fec4e9c74577',
    },
    {
      name: 'Selesnya Sanctuary',
      oracle_id: '00ef1c55-dea1-4564-bd57-66de86cba4df',
      mainColorProduction: ['G', 'W'],
      id: 'dd7149a3-5c5f-4740-9774-84617c59bb79',
    },
    {
      name: 'Simic Growth Chamber',
      oracle_id: '046f5783-cc7b-416a-8cf6-2bcef9c2cc1a',
      mainColorProduction: ['G', 'U'],
      id: '154070a2-e6bd-4229-873b-eb86d6350f9f',
    },
  ],
};

const shockLands = {
  name: 'Shock Lands',
  numberOfColors: 2,
  tier: 4,
  lands: [
    {
      name: 'Blood Crypt',
      oracle_id: '43985bbc-a0f6-4812-984e-392bc8562633',
      mainColorProduction: ['B', 'R'],
      id: '67484435-081e-4363-8a30-22c54325a25e',
    },
    {
      name: 'Breeding Pool',
      oracle_id: '20283c4a-f1f0-42f0-bc08-6da87474426b',
      mainColorProduction: ['G', 'U'],
      id: '3ff972c8-8df0-4b8a-9a99-ad4694b79c3f',
    },
    {
      name: 'Godless Shrine',
      oracle_id: '73864fcc-1bde-4bc0-831e-2b93e546e417',
      mainColorProduction: ['B', 'W'],
      id: 'b8e90696-6705-4f46-993d-d427d14fe47f',
    },
    {
      name: 'Hallowed Fountain',
      oracle_id: 'f1750962-a87c-49f6-b731-02ae971ac6ea',
      mainColorProduction: ['U', 'W'],
      id: '861a6b0c-720a-4296-857c-2b220c3848b9',
    },
    {
      name: 'Overgrown Tomb',
      oracle_id: '975ec9a3-6f20-4177-8211-82526e092538',
      mainColorProduction: ['B', 'G'],
      id: 'bb633cc7-76ab-47f2-95f0-b91c0d512a20',
    },
    {
      name: 'Sacred Foundry',
      oracle_id: '45181cb8-2090-4471-ba90-e5a8f04d525f',
      mainColorProduction: ['R', 'W'],
      id: 'd1999813-fdd9-4d99-a681-37d40360a0b2',
    },
    {
      name: 'Steam Vents',
      oracle_id: '17039058-822d-409f-938c-b727a366ba63',
      mainColorProduction: ['R', 'U'],
      id: 'f5686001-c852-4043-a60d-88ab776f7f32',
    },
    {
      name: 'Stomping Ground',
      oracle_id: '16052b52-ade1-406f-a06b-ce7ea607fb63',
      mainColorProduction: ['G', 'R'],
      id: 'cf6d10ed-85c3-48f2-8ba0-2960e03b408b',
    },
    {
      name: 'Temple Garden',
      oracle_id: 'f413a83d-a40d-434c-b20a-4c707c0527fa',
      mainColorProduction: ['G', 'W'],
      id: 'a87a224a-6752-411a-8c3b-741a34b22304',
    },
    {
      name: 'Watery Grave',
      oracle_id: 'fc9ec820-4245-4a96-b009-5308a818ca58',
      mainColorProduction: ['B', 'U'],
      id: '7d56e017-d2ad-4404-b912-88849b380577',
    },
  ],
};

const horizonLands = {
  name: 'Horizon Lands',
  numberOfColors: 2,
  tier: 3,
  lands: [
    {
      name: 'Fiery Islet',
      oracle_id: '026f4a4b-eedd-44e1-9d37-ca4fb8d6db98',
      mainColorProduction: ['R', 'U'],
      id: 'f5686001-c852-4043-a60d-88ab776f7f32',
    },
    {
      name: 'Horizon Canopy',
      oracle_id: '262a5d83-506c-4781-9bc9-1a2b5d83955c',
      mainColorProduction: ['G', 'W'],
      id: 'b149b062-850f-48d6-993d-d1933d17a3a8',
    },
    {
      name: 'Horizon of Progress',
      oracle_id: '59a82f57-fe2f-4834-a4ee-4b948eef1e12',
      mainColorProduction: ['B', 'G', 'R', 'U', 'W'],
      id: '5b84c8a2-1e96-4076-bb6b-a25b3069115c',
    },
    {
      name: 'Nurturing Peatland',
      oracle_id: '8ed932ff-986c-4592-ad70-53b3fac80d69',
      mainColorProduction: ['B', 'G'],
      id: '4ac83777-a877-449e-b922-c30d07525357',
    },
    {
      name: 'Silent Clearing',
      oracle_id: 'fd45063f-c83c-431c-9104-f139c497ec0d',
      mainColorProduction: ['B', 'W'],
      id: '7df1787c-c9d3-4632-9018-097576a9482d',
    },
    {
      name: 'Sunbaked Canyon',
      oracle_id: 'f97fd068-b83a-4621-bf8c-cc96e880ce90',
      mainColorProduction: ['R', 'W'],
      id: 'ffb4d246-a192-4916-b8b8-472e35a11ee9',
    },
    {
      name: 'Waterlogged Grove',
      oracle_id: '70fa2eba-565e-4fed-adc9-7f5d9fcbf1fa',
      mainColorProduction: ['G', 'U'],
      id: '433a00c6-9988-445a-8b83-e18659d43b71',
    },
  ],
};

const scryLands = {
  name: 'Scry Lands',
  numberOfColors: 2,
  tier: 2,
  lands: [
    {
      name: 'Temple of Abandon',
      oracle_id: '3baa8e38-ef93-435d-b63e-f781d5bfcc68',
      mainColorProduction: ['G', 'R'],
      id: '01889893-6c8a-40a1-a67b-f633ed42663c',
    },
    {
      name: 'Temple of Deceit',
      oracle_id: '33b9b3bd-33ca-46f3-b8bb-a978bc3d1085',
      mainColorProduction: ['B', 'U'],
      id: 'f556488d-56ab-4a57-816d-9988177579b3',
    },
    {
      name: 'Temple of Enlightenment',
      oracle_id: '89f43e27-790b-4ca1-8ba7-0882b31e0783',
      mainColorProduction: ['U', 'W'],
      id: '851416e9-231a-464b-84a1-0e4a77bf3537',
    },
    {
      name: 'Temple of Epiphany',
      oracle_id: '79f94050-d850-41ca-b1db-5ae0cf743f0a',
      mainColorProduction: ['R', 'U'],
      id: '36c8469a-b44c-4232-a579-b3b3a628e906',
    },
    {
      name: 'Temple of Malady',
      oracle_id: 'dc55421f-dee8-4263-9df0-2365df5f14bb',
      mainColorProduction: ['B', 'G'],
      id: 'c3752694-8255-4654-be8d-73c3a936a282',
    },
    {
      name: 'Temple of Malice',
      oracle_id: '7c439c18-31dc-41fe-b03d-3fca06e6fc0b',
      mainColorProduction: ['B', 'R'],
      id: '01889893-6c8a-40a1-a67b-f633ed42663c',
    },
    {
      name: 'Temple of Mystery',
      oracle_id: '7e26f0b7-20e6-46d5-8130-d98c14d6aa29',
      mainColorProduction: ['G', 'U'],
      id: 'c94f5d21-f09b-402a-9ac9-93e8131349cd',
    },
    {
      name: 'Temple of Plenty',
      oracle_id: 'e521322b-0e83-458c-8936-7021a80ee279',
      mainColorProduction: ['G', 'W'],
      id: '9f5e1b0c-7835-4d2c-8822-83b632976c6d',
    },
    {
      name: 'Temple of Silence',
      oracle_id: 'e6e6fce8-0f6a-4b84-865e-d4e4a4182f9f',
      mainColorProduction: ['B', 'W'],
      id: 'be8b1a38-c64a-4d76-8094-1594957f89d3',
    },
    {
      name: 'Temple of Triumph',
      oracle_id: '6f0d94d9-64bb-4175-83bc-301e8f79f54f',
      mainColorProduction: ['R', 'W'],
      id: '3c563e41-0f72-4573-9565-d14c278c772c',
    },
  ],
};

const battleLands = {
  name: 'Battle Lands',
  numberOfColors: 2,
  tier: 1,
  lands: [
    {
      name: 'Canopy Vista',
      oracle_id: 'dcb7e046-f01b-497c-88e5-57794eb30ce5',
      mainColorProduction: ['G', 'W'],
      id: '3e4b786c-0e27-4475-b3a6-805c6d321d8b',
    },
    {
      name: 'Cinder Glade',
      oracle_id: 'dfac0258-e148-4d7d-8ded-fc2466d9caa6',
      mainColorProduction: ['G', 'R'],
      id: 'b149b062-850f-48d6-993d-d1933d17a3a8',
    },
    {
      name: 'Prairie Stream',
      oracle_id: '5330e24a-8568-446e-840a-594cd08bd1bc',
      mainColorProduction: ['U', 'W'],
      id: 'a87a224a-6752-411a-8c3b-741a34b22304',
    },
    {
      name: 'Smoldering Marsh',
      oracle_id: '390f1b56-264e-4336-83be-dc1fe79bfdcf',
      mainColorProduction: ['B', 'R'],
      id: '67484435-081e-4363-8a30-22c54325a25e',
    },
    {
      name: 'Sunken Hollow',
      oracle_id: 'cd2c90ac-2b04-461c-92f3-939871b6b6a3',
      mainColorProduction: ['B', 'U'],
      id: '7d56e017-d2ad-4404-b912-88849b380577',
    },
  ],
};

const checkLands = {
  name: 'Check Lands',
  numberOfColors: 2,
  tier: 3,
  lands: [
    {
      name: 'Clifftop Retreat',
      oracle_id: 'd7faa3c8-46cf-46b2-bfa4-89000307cf18',
      mainColorProduction: ['R', 'W'],
      id: '26477cc1-b4f2-4913-b565-d37afd998492',
    },
    {
      name: 'Dragonskull Summit',
      oracle_id: '63398c02-6fb1-481d-9d9f-81063532fbc0',
      mainColorProduction: ['B', 'R'],
      id: '01889893-6c8a-40a1-a67b-f633ed42663c',
    },
    {
      name: 'Drowned Catacomb',
      oracle_id: '819fc966-434e-470f-91e9-a38df974ad17',
      mainColorProduction: ['B', 'U'],
      id: 'efb5f3a0-7f28-43d9-95a2-c174c3b6f2f2',
    },
    {
      name: 'Glacial Fortress',
      oracle_id: '027dd013-baa7-4111-b3c9-f4d1414e9c45',
      mainColorProduction: ['U', 'W'],
      id: '47d7c66d-1b15-4424-814d-16f5c53b26c7',
    },
    {
      name: 'Hinterland Harbor',
      oracle_id: 'fb5a3403-7f0b-406c-8c4f-d693be010ca6',
      mainColorProduction: ['G', 'U'],
      id: 'c2e4344d-5282-4f01-9f2d-8e4de80c806f',
    },
    {
      name: 'Isolated Chapel',
      oracle_id: '7e5d9efe-48a9-434b-bb09-056e0e09cc9a',
      mainColorProduction: ['B', 'W'],
      id: 'f9d37535-c335-42df-a72e-dc737e6d08f7',
    },
    {
      name: 'Rootbound Crag',
      oracle_id: '9516c4c1-d72d-434f-97e1-6a862434a169',
      mainColorProduction: ['G', 'R'],
      id: 'f497a7a8-3860-4dfa-80c4-f2a96a32d366',
    },
    {
      name: 'Sulfur Falls',
      oracle_id: '6a6c5e17-6465-4a1f-9d63-8a3ce2edc522',
      mainColorProduction: ['R', 'U'],
      id: '3c0a525f-e275-4089-a5c5-115f01222b10',
    },
    {
      name: 'Sunpetal Grove',
      oracle_id: '402ec768-76fb-474e-ae74-babc90d833c4',
      mainColorProduction: ['G', 'W'],
      id: '01889893-6c8a-40a1-a67b-f633ed42663c',
    },
    {
      name: 'Woodland Cemetery',
      oracle_id: 'c9fe1383-1331-4a58-a45a-3320250221a9',
      mainColorProduction: ['B', 'G'],
      id: '7d56e017-d2ad-4404-b912-88849b380577',
    },
  ],
};

const fastLands = {
  name: 'Fast Lands',
  numberOfColors: 2,
  tier: 1,
  lands: [
    {
      name: 'Blackcleave Cliffs',
      oracle_id: '5ad94412-6f79-4c5d-bbd4-4ef5779a7b6d',
      mainColorProduction: ['B', 'R'],
      id: '78a3c9e9-11c5-430c-ab5c-6b586022e113',
    },
    {
      name: 'Blooming Marsh',
      oracle_id: '66fa2326-1b5d-41fb-b919-83bf9f383577',
      mainColorProduction: ['B', 'G'],
      id: 'efb5f3a0-7f28-43d9-95a2-c174c3b6f2f2',
    },
    {
      name: 'Botanical Sanctum',
      oracle_id: '88f8f683-738e-48f3-afff-c8f73f1033a2',
      mainColorProduction: ['G', 'U'],
      id: 'f9d37535-c335-42df-a72e-dc737e6d08f7',
    },
    {
      name: 'Concealed Courtyard',
      oracle_id: '2d899466-b1eb-4901-b626-1f2fb09b786d',
      mainColorProduction: ['B', 'W'],
      id: 'd73507d4-099e-4e4f-b673-a64d1f2b45a8',
    },
    {
      name: 'Copperline Gorge',
      oracle_id: 'a05f641c-15c9-43dc-ae0d-1ea372fd33d5',
      mainColorProduction: ['G', 'R'],
      id: '26477cc1-b4f2-4913-b565-d37afd998492',
    },
    {
      name: 'Darkslick Shores',
      oracle_id: 'a2b48695-f7d7-42ce-a8a0-2a723428542a',
      mainColorProduction: ['B', 'U'],
      id: '819fc966-434e-470f-91e9-a38df974ad17',
    },
    {
      name: 'Inspiring Vantage',
      oracle_id: '3f17c60e-923a-4392-9da8-87d9ded009b7',
      mainColorProduction: ['R', 'W'],
      id: '027dd013-baa7-4111-b3c9-f4d1414e9c45',
    },
    {
      name: 'Razorverge Thicket',
      oracle_id: '94f6c407-e665-4032-be13-a01e40c1f306',
      mainColorProduction: ['G', 'W'],
      id: 'fb5a3403-7f0b-406c-8c4f-d693be010ca6',
    },
    {
      name: 'Seachrome Coast',
      oracle_id: '9e7a240d-dc33-47ac-9f17-77fab4c1c340',
      mainColorProduction: ['U', 'W'],
      id: '402ec768-76fb-474e-ae74-babc90d833c4',
    },
    {
      name: 'Spirebluff Canal',
      oracle_id: 'eb0d8093-5f93-4b25-9384-08f9731bfb28',
      mainColorProduction: ['R', 'U'],
      id: '9516c4c1-d72d-434f-97e1-6a862434a169',
    },
  ],
};

const revealLands = {
  name: 'Reveal Lands',
  numberOfColors: 2,
  tier: 1,
  lands: [
    {
      name: 'Choked Estuary',
      oracle_id: 'd473b507-8c33-4118-bc10-b0a268776074',
      mainColorProduction: ['B', 'U'],
      id: 'd473b507-8c33-4118-bc10-b0a268776074',
    },
    {
      name: 'Foreboding Ruins',
      oracle_id: '5c87e2fa-77f1-4978-b25f-f14d227301d1',
      mainColorProduction: ['B', 'R'],
      id: '5c87e2fa-77f1-4978-b25f-f14d227301d1',
    },
    {
      name: 'Fortified Village',
      oracle_id: '56f1a16a-9f41-41fb-b580-c200bca27cd6',
      mainColorProduction: ['G', 'W'],
      id: '56f1a16a-9f41-41fb-b580-c200bca27cd6',
    },
    {
      name: 'Frostboil Snarl',
      oracle_id: '7137aae6-260d-41de-8b4e-42a8cf752697',
      mainColorProduction: ['R', 'U'],
      id: '7137aae6-260d-41de-8b4e-42a8cf752697',
    },
    {
      name: 'Furycalm Snarl',
      oracle_id: '651dea9c-2375-4e44-8e65-ba8e40f0c0ef',
      mainColorProduction: ['R', 'W'],
      id: '651dea9c-2375-4e44-8e65-ba8e40f0c0ef',
    },
    {
      name: 'Game Trail',
      oracle_id: '00de57d2-7cb6-4337-9bc6-f6711e4dfabf',
      mainColorProduction: ['G', 'R'],
      id: '00de57d2-7cb6-4337-9bc6-f6711e4dfabf',
    },
    {
      name: 'Necroblossom Snarl',
      oracle_id: '761ee6f9-b0fa-43c9-8d1f-9591ea18e52d',
      mainColorProduction: ['B', 'G'],
      id: '761ee6f9-b0fa-43c9-8d1f-9591ea18e52d',
    },
    {
      name: 'Port Town',
      oracle_id: '458d2b12-f578-4392-98d3-c3bc83f316c4',
      mainColorProduction: ['U', 'W'],
      id: '458d2b12-f578-4392-98d3-c3bc83f316c4',
    },
    {
      name: 'Shineshadow Snarl',
      oracle_id: 'c9fc13d6-bd10-47bc-b2b6-7f67a1f3371e',
      mainColorProduction: ['B', 'W'],
      id: 'c9fc13d6-bd10-47bc-b2b6-7f67a1f3371e',
    },
    {
      name: 'Vineglimmer Snarl',
      oracle_id: '33f52df8-4b44-4422-8b0a-37fead9c894b',
      mainColorProduction: ['G', 'U'],
      id: '33f52df8-4b44-4422-8b0a-37fead9c894b',
    },
  ],
};

const bondLands = {
  name: 'Bond Lands',
  numberOfColors: 2,
  tier: 4,
  lands: [
    {
      name: 'Bountiful Promenade',
      oracle_id: '761cb262-f83b-4a99-9345-b773182a7671',
      mainColorProduction: ['G', 'W'],
      id: '761cb262-f83b-4a99-9345-b773182a7671',
    },
    {
      name: 'Luxury Suite',
      oracle_id: '819e1765-8325-4e6f-89c1-63ea86de369f',
      mainColorProduction: ['B', 'R'],
      id: '819e1765-8325-4e6f-89c1-63ea86de369f',
    },
    {
      name: 'Morphic Pool',
      oracle_id: 'bd004c9d-771e-4e63-a97d-a2259c096af8',
      mainColorProduction: ['B', 'U'],
      id: 'bd004c9d-771e-4e63-a97d-a2259c096af8',
    },
    {
      name: 'Rejuvenating Springs',
      oracle_id: 'd1620449-930a-4895-a143-fd2a0a3c8b17',
      mainColorProduction: ['G', 'U'],
      id: 'd1620449-930a-4895-a143-fd2a0a3c8b17',
    },
    {
      name: 'Sea of Clouds',
      oracle_id: '672e190d-8ea0-4a2e-b74f-5d35304631e4',
      mainColorProduction: ['U', 'W'],
      id: '672e190d-8ea0-4a2e-b74f-5d35304631e4',
    },
    {
      name: 'Spectator Seating',
      oracle_id: 'cf6d10ed-85c3-48f2-8ba0-2960e03b408b',
      mainColorProduction: ['R', 'W'],
      id: 'cf6d10ed-85c3-48f2-8ba0-2960e03b408b',
    },
    {
      name: 'Spire Garden',
      oracle_id: '45fe016e-1a09-410c-bbe3-4663ba06c5b7',
      mainColorProduction: ['G', 'R'],
      id: '45fe016e-1a09-410c-bbe3-4663ba06c5b7',
    },
    {
      name: 'Training Center',
      oracle_id: 'e3570ac7-c593-40e3-bbd6-ec3da6d8158d',
      mainColorProduction: ['R', 'U'],
      id: 'e3570ac7-c593-40e3-bbd6-ec3da6d8158d',
    },
    {
      name: 'Undergrowth Stadium',
      oracle_id: '7c69f718-acc8-4851-8e5d-0cbaaa86192c',
      mainColorProduction: ['B', 'G'],
      id: '7c69f718-acc8-4851-8e5d-0cbaaa86192c',
    },
    {
      name: 'Vault of Champions',
      oracle_id: 'ebc5ac83-08d4-4d6b-b840-0c4ba71a38ab',
      mainColorProduction: ['B', 'W'],
      id: 'ebc5ac83-08d4-4d6b-b840-0c4ba71a38ab',
    },
  ],
};

const pathwayLands = {
  name: 'Pathway Lands',
  numberOfColors: 2,
  tier: 3,
  lands: [
    {
      name: 'Barkchannel Pathway // Tidechannel Pathway',
      oracle_id: '59d22de5-e310-44d7-89cf-ef3529e40cef',
      mainColorProduction: ['G', 'U'],
      id: '59d22de5-e310-44d7-89cf-ef3529e40cef',
    },
    {
      name: 'Blightstep Pathway // Searstep Pathway',
      oracle_id: 'e580a229-e800-4746-9d37-c32fcef8de28',
      mainColorProduction: ['B', 'R'],
      id: 'e580a229-e800-4746-9d37-c32fcef8de28',
    },
    {
      name: 'Branchloft Pathway // Boulderloft Pathway',
      oracle_id: '7c304547-a4b1-46c9-baed-16d2bfbe16eb',
      mainColorProduction: ['G', 'W'],
      id: '7c304547-a4b1-46c9-baed-16d2bfbe16eb',
    },
    {
      name: 'Brightclimb Pathway // Grimclimb Pathway',
      oracle_id: '1c633e02-95ef-445e-b4e0-fbfbc5ed9cc9',
      mainColorProduction: ['B', 'W'],
      id: '1c633e02-95ef-445e-b4e0-fbfbc5ed9cc9',
    },
    {
      name: 'Clearwater Pathway // Murkwater Pathway',
      oracle_id: '144119bc-7fd1-45c5-9e29-f742e7c255ac',
      mainColorProduction: ['B', 'U'],
      id: '144119bc-7fd1-45c5-9e29-f742e7c255ac',
    },
    {
      name: 'Cragcrown Pathway // Timbercrown Pathway',
      oracle_id: '727ca426-f4cc-4218-8ae5-8c427af2e816',
      mainColorProduction: ['G', 'R'],
      id: '727ca426-f4cc-4218-8ae5-8c427af2e816',
    },
    {
      name: 'Darkbore Pathway // Slitherbore Pathway',
      oracle_id: '868e6e68-4367-4073-a864-235d5961ae56',
      mainColorProduction: ['B', 'G'],
      id: '868e6e68-4367-4073-a864-235d5961ae56',
    },
    {
      name: 'Hengegate Pathway // Mistgate Pathway',
      oracle_id: '461b3f2f-fcee-4160-abfa-061f8b6a784f',
      mainColorProduction: ['U', 'W'],
      id: '461b3f2f-fcee-4160-abfa-061f8b6a784f',
    },
    {
      name: 'Needleverge Pathway // Pillarverge Pathway',
      oracle_id: 'a9b8d020-4d72-4934-8942-df29ef19fc1d',
      mainColorProduction: ['R', 'W'],
      id: 'a9b8d020-4d72-4934-8942-df29ef19fc1d',
    },
    {
      name: 'Riverglide Pathway // Lavaglide Pathway',
      oracle_id: '4924b3a4-a218-4783-8a4d-82361fdecc78',
      mainColorProduction: ['R', 'U'],
      id: '4924b3a4-a218-4783-8a4d-82361fdecc78',
    },
  ],
};

const slowLands = {
  name: 'Slow Lands',
  numberOfColors: 2,
  tier: 3,
  lands: [
    {
      name: 'Deathcap Glade',
      oracle_id: 'f6d24565-5b32-4eff-b2e0-6e2c25516ff0',
      mainColorProduction: ['B', 'G'],
      id: 'f6d24565-5b32-4eff-b2e0-6e2c25516ff0',
    },
    {
      name: 'Deserted Beach',
      oracle_id: 'f0ec8681-da50-466b-8cdd-1dc710deccd9',
      mainColorProduction: ['U', 'W'],
      id: 'f0ec8681-da50-466b-8cdd-1dc710deccd9',
    },
    {
      name: 'Dreamroot Cascade',
      oracle_id: 'dd8538e6-cd5f-4a88-aff5-eb5e76ce8ddb',
      mainColorProduction: ['G', 'U'],
      id: 'dd8538e6-cd5f-4a88-aff5-eb5e76ce8ddb',
    },
    {
      name: 'Haunted Ridge',
      oracle_id: 'e2a37967-4212-4553-9f77-bcb613405807',
      mainColorProduction: ['B', 'R'],
      id: 'e2a37967-4212-4553-9f77-bcb613405807',
    },
    {
      name: 'Overgrown Farmland',
      oracle_id: '709d2f10-1585-48c3-9058-ddd5f62f0452',
      mainColorProduction: ['G', 'W'],
      id: '709d2f10-1585-48c3-9058-ddd5f62f0452',
    },
    {
      name: 'Rockfall Vale',
      oracle_id: '185c70c1-8403-4ae5-b45d-3679d4ee092a',
      mainColorProduction: ['G', 'R'],
      id: '185c70c1-8403-4ae5-b45d-3679d4ee092a',
    },
    {
      name: 'Shattered Sanctum',
      oracle_id: 'c854ecb0-cc60-4c48-a9aa-7f2348a7a8c6',
      mainColorProduction: ['B', 'W'],
      id: 'c854ecb0-cc60-4c48-a9aa-7f2348a7a8c6',
    },
    {
      name: 'Shipwreck Marsh',
      oracle_id: '5f42b67f-87fd-4f98-a0e8-0c8313f4bbc8',
      mainColorProduction: ['B', 'U'],
      id: '5f42b67f-87fd-4f98-a0e8-0c8313f4bbc8',
    },
    {
      name: 'Stormcarved Coast',
      oracle_id: '4722105b-0085-4bb8-bca1-9de0d3eb5600',
      mainColorProduction: ['R', 'U'],
      id: '4722105b-0085-4bb8-bca1-9de0d3eb5600',
    },
    {
      name: 'Sundown Pass',
      oracle_id: '5ad0b405-cca4-475e-985c-4d7e3599d87e',
      mainColorProduction: ['R', 'W'],
      id: '5ad0b405-cca4-475e-985c-4d7e3599d87e',
    },
  ],
};

const surveilDuals = {
  name: 'Surveil Duals',
  numberOfColors: 2,
  tier: 4,
  lands: [
    {
      name: 'Commercial District',
      oracle_id: 'b33656ae-3473-4223-845f-f9147f87678b',
      mainColorProduction: ['G', 'R'],
      id: 'b33656ae-3473-4223-845f-f9147f87678b',
    },
    {
      name: 'Elegant Parlor',
      oracle_id: '9ea747cf-5d04-4aa7-bdc3-8145860cd1ba',
      mainColorProduction: ['R', 'W'],
      id: '9ea747cf-5d04-4aa7-bdc3-8145860cd1ba',
    },
    {
      name: 'Hedge Maze',
      oracle_id: 'ca4b6689-04ee-4227-9bdc-cb5a9590c745',
      mainColorProduction: ['G', 'U'],
      id: 'ca4b6689-04ee-4227-9bdc-cb5a9590c745',
    },
    {
      name: 'Lush Portico',
      oracle_id: 'd51831b1-7394-456e-a1de-6787a59f5932',
      mainColorProduction: ['G', 'W'],
      id: 'd51831b1-7394-456e-a1de-6787a59f5932',
    },
    {
      name: 'Meticulous Archive',
      oracle_id: 'ccfb8b4d-651c-418a-aa19-cb23105b3f2f',
      mainColorProduction: ['U', 'W'],
      id: 'ccfb8b4d-651c-418a-aa19-cb23105b3f2f',
    },
    {
      name: 'Raucous Theater',
      oracle_id: '04e5e84f-8fd4-43ab-8f9d-5b24646f7ae5',
      mainColorProduction: ['B', 'R'],
      id: '04e5e84f-8fd4-43ab-8f9d-5b24646f7ae5',
    },
    {
      name: 'Shadowy Backstreet',
      oracle_id: '216a2a92-9ca3-4ca3-8af7-686c13b04290',
      mainColorProduction: ['B', 'W'],
      id: '216a2a92-9ca3-4ca3-8af7-686c13b04290',
    },
    {
      name: 'Thundering Falls',
      oracle_id: 'd2bcff58-7a8a-46ef-b6b3-39501d4c8e6e',
      mainColorProduction: ['R', 'U'],
      id: 'd2bcff58-7a8a-46ef-b6b3-39501d4c8e6e',
    },
    {
      name: 'Undercity Sewers',
      oracle_id: '08d80efc-9542-4ba2-824c-c8615d8d07f2',
      mainColorProduction: ['B', 'U'],
      id: '08d80efc-9542-4ba2-824c-c8615d8d07f2',
    },
    {
      name: 'Underground Mortuary',
      oracle_id: '840119bf-e60f-4ff7-9c9b-d420d09df545',
      mainColorProduction: ['B', 'G'],
      id: '840119bf-e60f-4ff7-9c9b-d420d09df545',
    },
  ],
};

const vergeLands = {
  name: 'Verge Lands',
  numberOfColors: 2,
  tier: 3,
  lands: [
    {
      name: 'Blazemire Verge',
      oracle_id: '977c2f33-b622-4172-9efb-7f523becd32b',
      mainColorProduction: ['B', 'R'],
      id: '977c2f33-b622-4172-9efb-7f523becd32b',
    },
    {
      name: 'Bleachbone Verge',
      oracle_id: '2b8144a0-08d2-4c28-9fd7-5d90f90105e4',
      mainColorProduction: ['B', 'W'],
      id: '2b8144a0-08d2-4c28-9fd7-5d90f90105e4',
    },
    {
      name: 'Floodfarm Verge',
      oracle_id: 'f1e9abfb-c3c8-483e-b446-5c2afc9f6394',
      mainColorProduction: ['U', 'W'],
      id: 'f1e9abfb-c3c8-483e-b446-5c2afc9f6394',
    },
    {
      name: 'Gloomlake Verge',
      oracle_id: 'd71bda4c-3dee-4398-8fd0-f77d8743b887',
      mainColorProduction: ['B', 'U'],
      id: 'd71bda4c-3dee-4398-8fd0-f77d8743b887',
    },
    {
      name: 'Hushwood Verge',
      oracle_id: 'cce328b9-6100-417e-9ddf-808bbe3e3bc5',
      mainColorProduction: ['G', 'W'],
      id: 'cce328b9-6100-417e-9ddf-808bbe3e3bc5',
    },
    {
      name: 'Riverpyre Verge',
      oracle_id: '510a6ac5-f098-4145-ac07-771b1b6f7cdf',
      mainColorProduction: ['R', 'U'],
      id: '510a6ac5-f098-4145-ac07-771b1b6f7cdf',
    },
    {
      name: 'Tainted Field',
      oracle_id: '439de49b-1091-4688-9ffb-80a025df31c2',
      mainColorProduction: ['B', 'W'],
      id: '439de49b-1091-4688-9ffb-80a025df31c2',
    },
    {
      name: 'Tainted Peak',
      oracle_id: 'b2bae7fc-0668-4b34-9cd6-0d80aea52275',
      mainColorProduction: ['B', 'R'],
      id: 'b2bae7fc-0668-4b34-9cd6-0d80aea52275',
    },
    {
      name: 'Tainted Wood',
      oracle_id: 'fa6d05a1-3df4-4751-b1a0-8d9693faec73',
      mainColorProduction: ['B', 'G'],
      id: 'fa6d05a1-3df4-4751-b1a0-8d9693faec73',
    },
    {
      name: 'Thornspire Verge',
      oracle_id: 'e861bc08-4f0b-4d22-9b85-9d20227fd5b4',
      mainColorProduction: ['G', 'R'],
      id: 'e861bc08-4f0b-4d22-9b85-9d20227fd5b4',
    },
    {
      name: 'Wastewood Verge',
      oracle_id: 'c6e0574c-3e2b-4c40-b17a-05bce3d49309',
      mainColorProduction: ['B', 'G'],
      id: 'c6e0574c-3e2b-4c40-b17a-05bce3d49309',
    },
    {
      name: 'Willowrush Verge',
      oracle_id: 'c52eaa87-9251-4a47-83fd-04e582ade612',
      mainColorProduction: ['G', 'U'],
      id: 'c52eaa87-9251-4a47-83fd-04e582ade612',
    },
  ],
};

const tricycleLands = {
  name: 'Tricycle Lands',
  numberOfColors: 3,
  tier: 4,
  lands: [
    {
      name: 'Indatha Triome',
      oracle_id: 'ec2b3779-55f7-4169-aa66-6312fb52721f',
      mainColorProduction: ['B', 'G', 'W'],
      id: 'ec2b3779-55f7-4169-aa66-6312fb52721f',
    },
    {
      name: "Jetmir's Garden",
      oracle_id: 'f5896356-5744-4f7e-a4e5-1cc36dde5958',
      mainColorProduction: ['G', 'R', 'W'],
      id: 'f5896356-5744-4f7e-a4e5-1cc36dde5958',
    },
    {
      name: 'Ketria Triome',
      oracle_id: '6bae00e8-06cf-4ac4-a1cc-757e454109fe',
      mainColorProduction: ['G', 'R', 'U'],
      id: '6bae00e8-06cf-4ac4-a1cc-757e454109fe',
    },
    {
      name: "Raffine's Tower",
      oracle_id: '6e9ef5ef-6aed-4d3e-a59b-9e3dc8740b1b',
      mainColorProduction: ['B', 'U', 'W'],
      id: '6e9ef5ef-6aed-4d3e-a59b-9e3dc8740b1b',
    },
    {
      name: 'Raugrin Triome',
      oracle_id: 'c7fa1dda-9312-4ec8-82cd-a1ba7bc33497',
      mainColorProduction: ['R', 'U', 'W'],
      id: 'c7fa1dda-9312-4ec8-82cd-a1ba7bc33497',
    },
    {
      name: 'Savai Triome',
      oracle_id: '00625242-9348-4ef4-b975-f2ac82fee21d',
      mainColorProduction: ['B', 'R', 'W'],
      id: '00625242-9348-4ef4-b975-f2ac82fee21d',
    },
    {
      name: "Spara's Headquarters",
      oracle_id: '3123ec89-8e95-4761-ba17-747ec667509f',
      mainColorProduction: ['G', 'U', 'W'],
      id: '3123ec89-8e95-4761-ba17-747ec667509f',
    },
    {
      name: "Xander's Lounge",
      oracle_id: '8291543f-d086-48aa-b2b7-5481ca8c9198',
      mainColorProduction: ['B', 'R', 'U'],
      id: '8291543f-d086-48aa-b2b7-5481ca8c9198',
    },
    {
      name: 'Zagoth Triome',
      oracle_id: 'fdd46004-eaba-4024-8687-39b23dc6a58c',
      mainColorProduction: ['B', 'G', 'U'],
      id: 'fdd46004-eaba-4024-8687-39b23dc6a58c',
    },
    {
      name: "Ziatora's Proving Ground",
      oracle_id: 'f7e7b78c-c769-4720-8585-1874773eb342',
      mainColorProduction: ['B', 'G', 'R'],
      id: 'f7e7b78c-c769-4720-8585-1874773eb342',
    },
  ],
};

const originalDuals = {
  name: 'Original Duals',
  numberOfColors: 2,
  tier: 5,
  lands: [
    {
      name: 'Tundra',
      oracle_id: '02418479-9455-417f-a6a1-004356faff37',
      mainColorProduction: ['U', 'W'],
      id: '02418479-9455-417f-a6a1-004356faff37',
    },
    {
      name: 'Underground Sea',
      oracle_id: '4b22be3a-8ce1-47d1-b82e-6c3ccfb0548b',
      mainColorProduction: ['B', 'U'],
      id: '4b22be3a-8ce1-47d1-b82e-6c3ccfb0548b',
    },
    {
      name: 'Badlands',
      oracle_id: '13ff3222-91cb-4796-a34e-899ed817694c',
      mainColorProduction: ['B', 'R'],
      id: '13ff3222-91cb-4796-a34e-899ed817694c',
    },
    {
      name: 'Taiga',
      oracle_id: '22e3cf1d-3559-4ce1-954c-8dc815342979',
      mainColorProduction: ['G', 'R'],
      id: '22e3cf1d-3559-4ce1-954c-8dc815342979',
    },
    {
      name: 'Savannah',
      oracle_id: '703243f0-8cb3-420f-958f-5fd4bde30293',
      mainColorProduction: ['G', 'W'],
      id: '703243f0-8cb3-420f-958f-5fd4bde30293',
    },
    {
      name: 'Scrubland',
      oracle_id: 'c8d95ca8-7d12-4072-aeaf-e20f248c7e39',
      mainColorProduction: ['B', 'W'],
      id: 'c8d95ca8-7d12-4072-aeaf-e20f248c7e39',
    },
    {
      name: 'Volcanic Island',
      oracle_id: 'c718911c-c955-4eb9-9e16-be4bd49a4e4e',
      mainColorProduction: ['R', 'U'],
      id: 'c718911c-c955-4eb9-9e16-be4bd49a4e4e',
    },
    {
      name: 'Bayou',
      oracle_id: 'b76d1ae6-ad1d-4bac-b4c3-2e03e0e84d9b',
      mainColorProduction: ['B', 'G'],
      id: 'b76d1ae6-ad1d-4bac-b4c3-2e03e0e84d9b',
    },
    {
      name: 'Plateau',
      oracle_id: 'c7a15ca4-085f-4d92-8387-c3711c04c8fa',
      mainColorProduction: ['R', 'W'],
      id: 'c7a15ca4-085f-4d92-8387-c3711c04c8fa',
    },
    {
      name: 'Tropical Island',
      oracle_id: '74b7fe23-5d3a-4092-8d78-7c0eba8f6f73',
      mainColorProduction: ['G', 'U'],
      id: '74b7fe23-5d3a-4092-8d78-7c0eba8f6f73',
    },
  ],
};

const utilityLands = {
  name: 'Utility Lands',
  tier: 2,
  lands: [
    {
      name: 'Reliquary Tower',
      oracle_id: 'c23e5b80-08d2-4e24-9908-fe2aa4f30f6f',
      mainColorProduction: [],
      id: 'c23e5b80-08d2-4e24-9908-fe2aa4f30f6f',
    },
    {
      name: 'Bojuka Bog',
      oracle_id: '04b7362d-0490-4cb0-b5d7-2a7732f659ce',
      mainColorProduction: ['B'],
      id: '04b7362d-0490-4cb0-b5d7-2a7732f659ce',
    },
    {
      name: "Rogue's Passage",
      oracle_id: 'f29dc596-2121-4421-8463-15f6c2e8b9b3',
      mainColorProduction: [],
      id: 'f29dc596-2121-4421-8463-15f6c2e8b9b3',
    },
    {
      name: "Urza's Saga",
      oracle_id: '4c6a0c30-b547-4eff-8ff4-0ca25803c076',
      mainColorProduction: [],
      id: '4c6a0c30-b547-4eff-8ff4-0ca25803c076',
    },
    {
      name: 'War Room',
      oracle_id: '71c52bf5-2a5d-488e-8b15-7ef290e4b77d',
      mainColorProduction: [],
      id: '71c52bf5-2a5d-488e-8b15-7ef290e4b77d',
    },
    {
      name: 'Mystic Sanctuary',
      oracle_id: '17b60106-a4c7-410a-8ac3-ec8e74e29a7c',
      mainColorProduction: ['U'],
      id: '17b60106-a4c7-410a-8ac3-ec8e74e29a7c',
    },
  ],
};

const channelLands = {
  name: 'Channel Lands',
  numberOfColors: 1,
  tier: 4,
  lands: [
    {
      name: 'Boseiju, Who Endures',
      oracle_id: 'bf1341dd-41a3-49f6-87ec-63170dde4324',
      mainColorProduction: ['G'],
      id: 'bf1341dd-41a3-49f6-87ec-63170dde4324',
    },
    {
      name: 'Eiganjo, Seat of the Empire',
      oracle_id: '7edb3d15-4f70-4ebe-8c5e-caf6a225076d',
      mainColorProduction: ['W'],
      id: '7edb3d15-4f70-4ebe-8c5e-caf6a225076d',
    },
    {
      name: 'Otawara, Soaring City',
      oracle_id: 'e9b6a394-691c-425a-9307-76d8edc7375e',
      mainColorProduction: ['U'],
      id: 'e9b6a394-691c-425a-9307-76d8edc7375e',
    },
    {
      name: 'Sokenzan, Crucible of Defiance',
      oracle_id: 'c5ee72d5-3a9e-4fe5-8802-3286ee612055',
      mainColorProduction: ['R'],
      id: 'c5ee72d5-3a9e-4fe5-8802-3286ee612055',
    },
    {
      name: 'Takenuma, Abandoned Mire',
      oracle_id: 'ac2dd694-d2f1-4025-8400-12332bdc882a',
      mainColorProduction: ['B'],
      id: 'ac2dd694-d2f1-4025-8400-12332bdc882a',
    },
  ],
};

const otherLands = {
  name: 'Other Notable Lands',
  tier: 4,
  lands: [
    {
      name: 'Ancient Tomb',
      oracle_id: '23467047-6dba-4498-b783-1ebc4f74b8c2',
      mainColorProduction: [],
      id: '23467047-6dba-4498-b783-1ebc4f74b8c2',
    },
    {
      name: 'Urborg, Tomb of Yawgmoth',
      oracle_id: 'db6174d7-211d-4817-b8e4-8384594c83f9',
      mainColorProduction: ['B'],
      id: 'db6174d7-211d-4817-b8e4-8384594c83f9',
    },
    {
      name: 'Cabal Coffers',
      oracle_id: '7358e164-5704-4e78-9b21-6a9bf2a968ce',
      mainColorProduction: ['B'],
      id: '7358e164-5704-4e78-9b21-6a9bf2a968ce',
    },
    {
      name: 'Yavimaya, Cradle of Growth',
      oracle_id: '8dd5f5af-d2d8-4356-8617-8381081b930c',
      mainColorProduction: ['G'],
      id: '8dd5f5af-d2d8-4356-8617-8381081b930c',
    },
    {
      name: 'Nykthos, Shrine to Nyx',
      oracle_id: '84dc18f0-8225-4b40-a165-b10321e41769',
      mainColorProduction: ['B', 'G', 'R', 'U', 'W'],
      id: '84dc18f0-8225-4b40-a165-b10321e41769',
    },
  ],
};

const fiveColorLands = {
  name: 'Five Color Lands',
  numberOfColors: 5,
  tier: 3,
  lands: [
    {
      name: 'Command Tower',
      oracle_id: '0895c9b7-ae7d-4bb3-af17-3b75deb50a25',
      mainColorProduction: ['B', 'G', 'R', 'U', 'W'],
      id: '0895c9b7-ae7d-4bb3-af17-3b75deb50a25',
    },
    {
      name: 'Exotic Orchard',
      oracle_id: '27b047e3-0d41-45e2-98e9-9391d7923a1e',
      mainColorProduction: ['B', 'G', 'R', 'U', 'W'],
      id: '27b047e3-0d41-45e2-98e9-9391d7923a1e',
    },
    {
      name: 'Path of Ancestry',
      oracle_id: 'b473e293-59e3-4e04-acf2-622604aeb25f',
      mainColorProduction: ['B', 'G', 'R', 'U', 'W'],
      id: 'b473e293-59e3-4e04-acf2-622604aeb25f',
    },
    {
      name: 'Reflecting Pool',
      oracle_id: '67f43ac6-2a58-4b53-b5d7-0330e2a252e2',
      mainColorProduction: ['B', 'G', 'R', 'U', 'W'],
      id: '67f43ac6-2a58-4b53-b5d7-0330e2a252e2',
    },
    {
      name: 'Fabled Passage',
      oracle_id: '0c85b8f7-0bd0-4680-9ec5-d4b110460a54',
      mainColorProduction: ['B', 'G', 'R', 'U', 'W'],
      id: '0c85b8f7-0bd0-4680-9ec5-d4b110460a54',
    },
    {
      name: 'Prismatic Vista',
      oracle_id: '032b8a0d-491a-4a12-ab9f-689010054d5b',
      mainColorProduction: ['B', 'G', 'R', 'U', 'W'],
      id: '032b8a0d-491a-4a12-ab9f-689010054d5b',
    },
    {
      name: 'City of Brass',
      oracle_id: 'f25351e3-539b-4bbc-b92d-6480acf4d722',
      mainColorProduction: ['B', 'G', 'R', 'U', 'W'],
      id: 'f25351e3-539b-4bbc-b92d-6480acf4d722',
    },
    {
      name: 'Mana Confluence',
      oracle_id: 'd0ee5bdc-2b69-4b73-9a20-ffcc18783b29',
      mainColorProduction: ['B', 'G', 'R', 'U', 'W'],
      id: 'd0ee5bdc-2b69-4b73-9a20-ffcc18783b29',
    },
  ],
};

const tribalLands = {
  name: 'Tribal Lands',
  numberOfColors: 5,
  condition: 'Tribal',
  tier: 3,
  lands: [
    {
      name: 'Cavern of Souls',
      oracle_id: '89ca686a-7c72-4d8f-9290-e89635624a83',
      mainColorProduction: ['B', 'G', 'R', 'U', 'W'],
      id: '89ca686a-7c72-4d8f-9290-e89635624a83',
    },
    {
      name: 'Unclaimed Territory',
      oracle_id: '584b15f2-6ae9-413a-8b8d-9244dbea4878',
      mainColorProduction: ['B', 'G', 'R', 'U', 'W'],
      id: '584b15f2-6ae9-413a-8b8d-9244dbea4878',
    },
    {
      name: 'Secluded Courtyard',
      oracle_id: '79ba18fd-f184-43c1-86df-56ee18ce806c',
      mainColorProduction: ['B', 'G', 'R', 'U', 'W'],
      id: '79ba18fd-f184-43c1-86df-56ee18ce806c',
    },
  ],
};

const basicLands = {
  name: 'Basic Lands',
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
    },
  ],
};

export const LAND_CYCLES = [
  originalDuals,

  fetchLands,
  shockLands,
  bondLands,
  surveilDuals,
  tricycleLands,
  channelLands,
  otherLands,

  horizonLands,
  checkLands,
  pathwayLands,
  slowLands,
  vergeLands,
  fiveColorLands,
  tribalLands,

  painLands,
  filterLands,
  bounceLands,
  scryLands,
  utilityLands,

  battleLands,
  fastLands,
  revealLands,

  basicLands,
];
