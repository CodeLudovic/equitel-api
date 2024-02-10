const { User } = require("../db");

const getUserExist = async (id, email = null) => {
	if (email) {
		let user = await User.findOne({ where: { email: email } });
		return user;
	}

	let user = await User.findOne({ where: { id: id } });
	return user;
};

module.exports = { getUserExist };
