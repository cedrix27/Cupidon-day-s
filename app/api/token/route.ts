import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const adminDb = getAdminDb();
    const existingToken = req.cookies.get("cupidon_token")?.value;

    if (existingToken) {
      const doc = await adminDb.collection("tokens").doc(existingToken).get();
      if (doc.exists) {
        return NextResponse.json({
          fleches_restantes: doc.data()!.fleches_restantes,
        });
      }
    }

    const token = crypto.randomUUID();

    await adminDb.collection("tokens").doc(token).set({
      fleches_restantes: 2,
      created_at: new Date(),
    });

    const response = NextResponse.json({ fleches_restantes: 2 });
    response.cookies.set("cupidon_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
