import { cleanEnv} from 'envalid';
import 'dotenv/config'
import {str,port} from 'envalid/dist/validators'
export default cleanEnv(process.env,{
    PORT:port(),
    MONGO_DB_STRING:str(),
    SECRET_KEY:str()
})