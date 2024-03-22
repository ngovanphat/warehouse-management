import { User } from '../entities'; // Import the User entity or the appropriate type

declare global {
  namespace Express {
    interface Request {
      user?: User; // Define the user property with the appropriate type
    }
  }
}
