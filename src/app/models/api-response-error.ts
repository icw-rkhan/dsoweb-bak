export const ERRORS: any = {
  common: {
    1007: 'Client id is null'
  },
  login: {
    1001: `<strong>Incorrect Password</strong>
          <br>Sorry, that password is incorrect for the account with the email address: {username}`,
    1003: `<strong>Incorrect Email</strong>
          <br>Sorry, we can\'\'t find an account with the email address: {username}`,
    1004: 'Incorrect format username'
  },
  register: {
    1002: 'Username is already exist',
    1005: 'Fullname is null',
    1015: 'Fullname is too long',
    1029: 'Is student is null',
    1030: 'Is student is too long',
    1031: 'Is linkedin is null',
    1032: 'Is linkedin is too long',
    1066: 'Username format error',
    1067: 'Password format error',
  },
  reset_password: {

  }
};
