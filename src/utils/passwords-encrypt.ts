import bcrypt from "bcrypt"

export async function hashPassword(password) {
  const saltRounds = 10
  try {
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
  } catch (error) {
    // Handle error
    console.error("Error hashing password:", error)
    throw new Error("Error hashing password")
  }
}

export async function comparePasswords(providedPassword, hashedPassword) {
  try {
    const match = await bcrypt.compare(providedPassword, hashedPassword)
    return match
  } catch (error) {
    // Handle error
    console.error("Error comparing passwords:", error)
    throw new Error("Error comparing passwords")
  }
}
