import { Users } from "../models/UserModel.js";
import argon2, { hash } from 'argon2';

export const getUsers = async (req, res) => {
    try {
        const response = await Users.findAll({
            attributes: [
                'uuid', 'name', 'email', 'role'
            ],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const response = await Users.findOne({
            attributes: [
                'uuid', 'name', 'email', 'role'
            ],
            where: {
                uuid: req.params.id,
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createUser = async (req, res) => {
    const { name, email, password, confPassword, role } = req.body;
    if (password !== confPassword) return res.status(400).json({ msg: "Password tidak cocok.." });
    const hashPassword = await argon2.hash(password);

    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        })

        res.status(201).json({ msg: "Users created successfully.." });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const updateUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id,
        }
    });

    if (!user) return res.status(404).json({ msg: 'user tidak ditemukan...' });

    const { name, email, password, confPassword, role } = req.body;

    let hashPassword;
    if (password === '' || password === null) {
        hashPassword = user.password
    } else {
        hashPassword = await argon2.hash(password);
    }

    if (password !== confPassword) return res.status(400).json({ msg: "Password tidak cocok.." });

    try {
        await Users.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        }, {
            where: {
                id: user.id,
            }
        })

        res.status(200).json({ msg: "Users updated successfully.." });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const deleteUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id,
        }
    });

    if (!user) return res.status(404).json({ msg: 'user tidak ditemukan...' });

    try {
        await Users.destroy({
            where: {
                id: user.id,
            }
        })

        res.status(200).json({ msg: "Users deleted successfully.." });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}