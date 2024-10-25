const {
createUser
} = require("./db")

const prisma = require("../prisma");
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const devId = uuidv4()
const MY_PASSWORD = process.env.MY_PASSWORD

const seed = async () => {

    async function seedUsers() {
        const users = [
          { username: "Lincoln", password: "password1" },
          { username: "Logan", password: "password2" },
          { username: "Chase", password: "password3" },
          { username: "GPG04", password: MY_PASSWORD, isAdmin: true }
        ]

        users.forEach(async (user) => {
          let hash = await bcrypt.hash( user.password, 5 )

          await prisma.user.create({
            data: {
              username: user.username,
              password: hash,
              isAdmin: user.isAdmin
            }
          })
        })
    }

  await seedUsers()
}
    
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

    
