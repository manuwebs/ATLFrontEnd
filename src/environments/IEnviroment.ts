/**
 * Implement this interface in all environment files.
 * This will ensure that when a property is created/updated
 * all the environment files will need to add these properties
 * avoiding errors
 */
export interface IEnvironment {
  production: boolean;
  apiUrl: string;
}
