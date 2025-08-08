import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import dotenv from 'dotenv'
dotenv.config();

export const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const existingUsername = await User.findOne({ username })
    const existingEmail = await User.findOne({ email })

    if (existingUsername) {
      return res.status(400).json({ error: "Já há alguem usando esse nome" })
    }
    if (existingEmail) {
      return res.status(400).json({ error: "Já há alguem usando esse email" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ username, email, password: hashedPassword })
    await newUser.save()
    res.status(201).send("Usuário criado com sucesso!")

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Falha ao tentar criar usuário" })
  }
}

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    const existingEmail = await User.findOne({ email })
    const user = await User.findOne({ email })

    if (!existingEmail) {
      return res.status(404).send("Não há contas com esse email")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(404).send("Senha incorreta")
    }

    const token = jwt.sign(
      {
        sub: user._id,
        name: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
    )

    //Embaixo deve enviar o token
    res.status(200).json({ message: "Login realizado com sucesso!", token });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Falha ao tentar entrar na conta" })
  }
}