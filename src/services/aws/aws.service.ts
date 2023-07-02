import { Injectable } from '@nestjs/common';
import  { SecretsManager } from "@aws-sdk/client-secrets-manager"
import  { execSync } from "child_process"

@Injectable()
export class AwsService {
    private secretsManager:SecretsManager;
    constructor(){
        this.secretsManager= new SecretsManager({region:"us-east-1"})
    }
    getDatabaseSecrets(){
        return new Promise((resolve,reject)=>this.secretsManager.getSecretValue({SecretId:process.env.DATABASE_SECRETID},
            async(err,data)=>{
            if(err) {reject(err); return;}
            const rdsCredentials:RDSCredentials=JSON.parse(data.SecretString);         
            const env=process.env;
            const DATABASE_ENDPOINT=rdsCredentials.host;
            const DATABASE_NAME=rdsCredentials.dbInstanceIdentifier;
            const PORT=rdsCredentials.port.toString();
            const POSTGRES_USER=rdsCredentials.username;
            const POSTGRES_PASSWORD=rdsCredentials.password;
           
            // wait for the process to spawn            
            env.DATABASE_URL=`postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DATABASE_ENDPOINT}:${PORT}/${DATABASE_NAME}?schema=public`
            resolve(true)
        }))
    }
}
