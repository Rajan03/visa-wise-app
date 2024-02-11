import { Client, Account, Databases, Storage } from "appwrite";
import type {
  Client as IClient,
  Account as IAccount,
  Databases as IDatabases,
  Storage as IStorage,
} from "appwrite";

class AppWrite {
  private dbClient: IClient | undefined;
  private account: IAccount | undefined;
  private database: IDatabases | undefined;
  private storage: IStorage | undefined;

  constructor(apiUrl: string, apiKey: string) {
    if (!apiUrl || !apiKey) {
      throw new Error("API URL and API Key is required");
    }

    this.dbClient = new Client().setEndpoint(apiUrl).setProject(apiKey);
  }

  public initalizeAccount() {
    if (!this.dbClient) {
      throw new Error("Client is not initialized");
    }
    this.account = new Account(this.dbClient);
  }

  public initalizeDatabase() {
    if (!this.dbClient) {
      throw new Error("Client is not initialized");
    }
    this.database = new Databases(this.dbClient);
  }

  public initalizeStorage() {
    if (!this.dbClient) {
      throw new Error("Client is not initialized");
    }
    this.storage = new Storage(this.dbClient);
  }

  public getClient() {
    return this.dbClient;
  }

  public getAccount() {
    return this.account;
  }

  public getDatabase() {
    return this.database;
  }

  public getStorage() {
    return this.storage;
  }
}

export default AppWrite;
