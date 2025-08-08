import bcrypt, { hash } from 'bcrypt'
import User from '../models/userModel.js'

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
    const user = await User.findOne({ email })

    if (!email) {
      return res.status(404).send("Email incorreto")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(404).send("Senha incorreta")
    }

    res.status(200).json({ message: "Login realizado com sucesso!" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Falha ao tentar entrar na conta" })
  }
}