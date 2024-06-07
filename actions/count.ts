import fs from "fs";

export function getCount() {
	"use server";
	const count = parseInt(
		fs
			.readFileSync(
				"/Users/daniel/Downloads/vinxi-vue-start/actions/count.txt"
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
				"/Users/daniel/Downloads/vinxi-vue-start/actions/count.txt"
			)
			.toString()
	);
	fs.writeFileSync(
		"/Users/daniel/Downloads/vinxi-vue-start/actions/count.txt",
		(count + 1).toString()
	);
	return count + 1;
}
