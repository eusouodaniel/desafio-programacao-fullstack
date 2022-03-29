import { v4 as uuidV4 } from "uuid";
import * as bcrypt from "bcryptjs";

import { AppDataSource } from "../index";

async function createTransactionType() {
	const connection = await AppDataSource.initialize();
	await connection.query(
	  `DELETE FROM transaction_types;`
	);

	await connection.query(
		`
			INSERT INTO transaction_types (id, type, description, kind, operation) values
			('${uuidV4()}', 1, 'Venda produtor', 'Entrada', '+'),
			('${uuidV4()}', 2, 'Venda afiliado', 'Entrada', '+'),
			('${uuidV4()}', 3, 'Comissão paga', 'Saída', '-'),
			('${uuidV4()}', 4, 'Comissão recebida', 'Entrada', '+')
		`
	);
  	connection.destroy;
}

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
