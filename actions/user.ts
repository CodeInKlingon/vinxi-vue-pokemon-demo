export function getUser(id: string) {
	"use server";
	const user = {
		firstName: "Daniel",
		lastName: "Stokes",
		age: 29,
		id: id,
	};

	return user;
}
