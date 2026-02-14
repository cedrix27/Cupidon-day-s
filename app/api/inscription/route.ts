import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const adminDb = getAdminDb();
    const body = await req.json();
    const { prenom, numero, consentement_affichage, consentement_contact } = body;

    if (!prenom || !numero || !consentement_affichage || !consentement_contact) {
      return NextResponse.json(
        { error: "Tous les champs sont requis et les consentements doivent être acceptés." },
        { status: 400 }
      );
    }

    const prenomClean = prenom.trim().slice(0, 30);
    const numeroClean = numero.trim().replace(/\s/g, "");

    if (!/^\+?\d{8,15}$/.test(numeroClean)) {
      return NextResponse.json(
        { error: "Numéro WhatsApp invalide." },
        { status: 400 }
      );
    }

    const existing = await adminDb
      .collection("profiles")
      .where("numero", "==", numeroClean)
      .limit(1)
      .get();

    if (!existing.empty) {
      return NextResponse.json(
        { error: "Ce numéro est déjà inscrit." },
        { status: 409 }
      );
    }

    const docRef = await adminDb.collection("profiles").add({
      prenom: prenomClean,
      numero: numeroClean,
      demandes_recues: 0,
      limite: 5,
      consentement_affichage,
      consentement_contact,
      created_at: new Date(),
    });

    return NextResponse.json({ id: docRef.id, prenom: prenomClean }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
