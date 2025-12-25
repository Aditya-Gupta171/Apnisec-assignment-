import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { AuthError } from "./ApiError";

export interface JwtPayload {
  userId: string;
  email: string;
}

export class JwtService {
  private readonly secret: Secret;
  private readonly signOptions: SignOptions;

  constructor(secret: string, expiresInSeconds: number = 900) {
    this.secret = secret;
    this.signOptions = { expiresIn: expiresInSeconds };
  }

  sign(payload: JwtPayload): string {
    return jwt.sign({ ...payload }, this.secret, this.signOptions);
  }

  verify(token: string): JwtPayload {
    try {
      const decoded = jwt.verify(token, this.secret) as JwtPayload;
      return { userId: decoded.userId, email: decoded.email };
    } catch {
      throw new AuthError("Invalid or expired token");
    }
  }
}
