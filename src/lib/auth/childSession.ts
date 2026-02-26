import { SignJWT, jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(
  process.env.CHILD_SESSION_SECRET ?? "fallback-dev-secret-32-chars-long!!"
);

export interface ChildSessionPayload {
  childId: string;
  name: string;
  grade: number;
  avatarEmoji: string;
  parentId: string;
  mascotAnimal: string;
  mascotName: string;
  bundesland: string;
}

export async function signChildSession(payload: ChildSessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(SECRET_KEY);
}

export async function verifyChildSession(token: string): Promise<ChildSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as unknown as ChildSessionPayload;
  } catch {
    return null;
  }
}
