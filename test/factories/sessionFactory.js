const Buffer = require('safe-buffer').Buffer;
const keygrip = require('keygrip');
const keys = require('../../config/keys');
const keyGrip = new keygrip([keys.cookieKey]);
module.exports = user => {
  const sessionObject = {
    passport: {
      user: user._id.toString()
    }
  };

  const sessionString = Buffer.from(JSON.stringify(sessionObject)).toString(
    'base64'
  );
  const sig = keyGrip.sign('session=' + sessionString);
  return {session: sessionString, sig };
};