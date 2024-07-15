import fs from "fs";

export function getCount() {
	"use server";
	const count = parseInt(
		fs
			.readFileSync(
				"./actions/count.txt"
			)
			.toString()
	);
	return count;
}

export function incrementCount() {
	"use server";
	let count = parseInt(
		fs
			.readFileSync(
				"./actions/count.txt"
			)
			.toString()
	);
	fs.writeFileSync(
		"./actions/count.txt",
		(count + 1).toString()
	);
	return count + 1;
}
