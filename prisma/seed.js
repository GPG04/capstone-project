const {
createUser
} = require("./db")

const prisma = require("../prisma");

const seed = async () => {

    async function seedUsers() {
        await Promise.all([
        createUser( "Logan", "password1" ),
        createUser( "chase", "password2" ),
        createUser(  "lincoln",  "password3" ),
        createUser( "boots",  "password4" )
        ])
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

    
