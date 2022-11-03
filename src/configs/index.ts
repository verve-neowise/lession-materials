import dotenv from 'dotenv'

dotenv.config()

export { default as serverConfig } from "./server.config";
export { default as jwtConfig } from './jwt.config'