import { prisma } from "../../app.js";

export const getAll = async (req, res) => {
	try {
		const woods = await prisma.wood.findMany();
		res.json(woods);
	} catch (error) {
		res.status(error.status || 500).json(error.message || "Error on getting all woods");
	}
};

export const readByHardness = async (req, res) => {
	try {
		const woods = await prisma.wood.findMany({
			where: { hardness: req.params.hardness },
		});
		res.json(woods);
	} catch (error) {
		res.status(error.status || 500).json(error.message || "Error on getting woods by hardness");
	}
};
