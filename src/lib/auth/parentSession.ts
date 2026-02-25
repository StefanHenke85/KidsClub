import { SignJWT, jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(
  process.env.PARENT_SESSION_SECRET ?? "parent-dev-secret-32-chars-long!!!"
);

export interface ParentSessionPayload {
  parentId: string;
  email: string;
}

export async function signParentSession(payload: ParentSessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET_KEY);
}

export async function verifyParentSession(token: string): Promise<ParentSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as unknown as ParentSessionPayload;
  } catch {
    return null;
  }
}
