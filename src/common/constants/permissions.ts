const update = [
  'LARA_APP::LARA_ADMIN',
  'LARA_APP::SMS_EDIT',
  'LARA_APP::EMAIL_EDIT',
  'HELP_APP::HELP_ADMIN',
];

const read = [
  'LARA_APP::LARA_ADMIN',
  'LARA_APP::LARA_USER',
  'HELP_APP::HELP_ADMIN',
  'HELP_USER::HELP_USER',
];

const create = ['HELP_APP::HELP_ADMIN'];

export default { update, read, create };
