import { v4 as uuidV4 } from "uuid";
import * as bcrypt from "bcryptjs";

import { AppDataSource } from "../index";

async function createUser() {
	const connection = await AppDataSource.initialize();
	await connection.query(
		`DELETE FROM users;`
	);

	await connection.query(
		`
			INSERT INTO users (id, email, password, role) values
			('${uuidV4()}', 'producer@hub.la', '${bcrypt.hashSync("producer", 8)}', 'PRODUCER')
		`
	);
  	connection.destroy;
}

createUser().then(() => console.log("Seed user created!"));
