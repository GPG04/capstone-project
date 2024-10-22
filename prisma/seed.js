const {
createUser
} = require("./db")

const prisma = require("../prisma");
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const devId = uuidv4()

const seed = async () => {

    async function seedUsers() {
        await Promise.all([
        createUser( "Logan", "password1" ),
        createUser( "chase", "password2" ),
        createUser(  "lincoln",  "password3" ),
        createUser( "boots",  "password4" )
        ])
    }

    async function devAccount() {
      
      const user = {
        id: devId,
        username: "GPG04",
        password: await bcrypt.hash("spaghetti", 5)
      }

      await prisma.user.create({ data: user })
    }

    async function seedItem() {

      const item = {
        name: "test",
        image: "test",
        description: "test",
        textContent: "test",
        userId: devId
      }
      await prisma.item.create({ data: item })
    }

  await seedUsers()
  await devAccount()
  await seedItem()
}
    
seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

    
