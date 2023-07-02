const { CredentialsAWS } = require('./script_functions');

class GetCredential extends CredentialsAWS {
  _databaseUrl=""
  constructor() {
    super();
  }
  printDatabaseCredential() {
    console.log(process.env.DATABASE_URL );
  }
}
const getCredentialForEnvironment = new GetCredential();
getCredentialForEnvironment.getDatabaseSecrets().then(()=>{
  getCredentialForEnvironment.printDatabaseCredential()
})

