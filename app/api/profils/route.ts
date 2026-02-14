import { NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const adminDb = getAdminDb();
    const snapshot = await adminDb
      .collection("profiles")
      .where("consentement_affichage", "==", true)
      .orderBy("created_at", "desc")
      .get();

    const profils = snapshot.docs.map((doc) => ({
      id: doc.id,
      prenom: doc.data().prenom,
      genre: doc.data().genre || null,
      photo: doc.data().photo || null,
      demandes_recues: doc.data().demandes_recues,
      limite: doc.data().limite,
    }));

    return NextResponse.json({ profils });
  } catch (err) {
    console.error("API /api/profils error:", err);
    return NextResponse.json({ error: "Erreur serveur.", details: String(err) }, { status: 500 });
  }
}
