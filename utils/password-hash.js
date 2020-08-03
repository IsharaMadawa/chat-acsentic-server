'use strict';
const bcrypt = require('bcrypt');

class PasswordHash{

	createHash(password) {
        const salt = bcrypt.genSaltSync(10);
		return bcrypt.hashSync(password, salt);
	}

	compareHash(password, hash) {
		return bcrypt.compareSync(password, hash)
	}
}

module.exports = new PasswordHash();