import { env } from "@/env";
import { Client, Account, Databases, Storage, ID } from "appwrite";
import type {
  Client as IClient,
  Account as IAccount,
  Databases as IDatabases,
  Storage as IStorage,
  Models,
} from "appwrite";

class AppWrite {
  private dbClient: IClient;
  private account: IAccount;
  private database: IDatabases;
  private storage: IStorage;

  constructor(apiUrl: string, apiKey: string) {
    if (!apiUrl || !apiKey) {
      throw new Error("API URL and API Key is required");
    }

    this.dbClient = new Client().setEndpoint(apiUrl).setProject(apiKey);
    this.account = new Account(this.dbClient);
    this.database = new Databases(this.dbClient);
    this.storage = new Storage(this.dbClient);
  }

  private getClient() {
    return this.dbClient;
  }

  private getAccount() {
    return this.account;
  }

  private getDatabase() {
    return this.database;
  }

  private getStorage() {
    return this.storage;
  }

  private getUniqueId() {
    return ID.unique();
  }

  public async getSignedInSession(id?: string) {
    return (await this.getAccount().getSession(id ? id : "current"));
  }

  public async getSignedInUser() {
    try {
      const user = await this.getAccount().get();

      return user ? user : null;
    } catch (error) {
      return null;
    }
  }

  public async verifyUser(userId: string, secret: string) {
    const token = await this.getAccount().updateVerification(userId, secret);
    return !!token.$id;
  }

  public async SignInUser(
    email: string,
    password: string,
    onError: (message: string) => void
  ) {
    try {
      const session = await this.getAccount().createEmailSession(
        email as string,
        password as string
      );

      return session;
    } catch (error: any) {
      onError(error.message);
      return null;
    }
  }

  public async SignUpUser(
    email: string,
    password: string,
    onError: (message: string) => void
  ) {
    try {
      const user = await this.getAccount().create(
        this.getUniqueId(),
        email as string,
        password as string
      );

      return user;
    } catch (error: any) {
      onError(error.message);
      return null;
    }
  }
}

const AppWriteService = new AppWrite(env.API_URL, env.API_KEY);
export default Object.freeze(AppWriteService) as AppWrite;

// Types
export type AuthUser = Models.User<Models.Preferences> | null;
export type Session = Models.Session;