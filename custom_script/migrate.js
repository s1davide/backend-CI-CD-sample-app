const { spawn } = require("child_process");
const { CredentialsAWS } =require("./script_functions");

 
class MigratePrisma extends CredentialsAWS{
  constructor(){
    super();
  }
  async migrate(){
    const process = spawn(`npx`, ["prisma", "migrate", "deploy"])
    // wait for the process to spawn
    await new Promise(resolve => process.once(`spawn`, resolve))  
    // log any output (expected to be the current node version)
    process.stdout.on(`data`, data => console.log(data.toString()))    
    // log any stderr
    process.stderr.on(`data`, data => console.log(data.toString()))
  }
}

const migratePrisma=new MigratePrisma();
migratePrisma.getDatabaseSecrets().then(async()=>{
  await migratePrisma.migrate()
});
