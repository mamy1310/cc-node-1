import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../app.js";

export const signup = async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const user = await prisma.user.create({
			data: {
				...req.body,
				password: hashedPassword,
			},
		});
		res.status(201).json(user);
	} catch (error) {
		res.status(error.status || 500).json(error.message || "Error on signup");
	}
};

export const login = async (req, res) => {
	try {
		const user = await prisma.user.findUnique({
			where: { email: req.body.email },
		});

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

		if (!isPasswordValid) {
			return res.status(401).json({ message: "Invalid password" });
		}

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

		res.json({ user, token });
	} catch (error) {
		res.status(error.status || 500).json(error.message || "Error on login");
	}
};
