import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const adminDb = getAdminDb();
    const token = req.cookies.get("cupidon_token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Token manquant. Rechargez la page." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { profilId } = body;

    if (!profilId) {
      return NextResponse.json(
        { error: "Profil manquant." },
        { status: 400 }
      );
    }

    const result = await adminDb.runTransaction(async (transaction) => {
      const tokenRef = adminDb.collection("tokens").doc(token);
      const profilRef = adminDb.collection("profiles").doc(profilId);

      const tokenDoc = await transaction.get(tokenRef);
      const profilDoc = await transaction.get(profilRef);

      if (!tokenDoc.exists) {
        throw new Error("Token invalide.");
      }

      if (!profilDoc.exists) {
        throw new Error("Profil introuvable.");
      }

      const fleches = tokenDoc.data()!.fleches_restantes;
      const demandes = profilDoc.data()!.demandes_recues;
      const limite = profilDoc.data()!.limite;

      if (fleches <= 0) {
        throw new Error("Tu n'as plus de flèches !");
      }

      if (demandes >= limite) {
        throw new Error("Ce profil a atteint sa limite de demandes.");
      }

      transaction.update(tokenRef, {
        fleches_restantes: FieldValue.increment(-1),
      });

      transaction.update(profilRef, {
        demandes_recues: FieldValue.increment(1),
      });

      const numero = profilDoc.data()!.numero;
      const message = encodeURIComponent(
        "Quelqu'un t'a envoyé une flèche de Cupidon ! 💘"
      );
      const whatsappUrl = `https://wa.me/${numero}?text=${message}`;

      return { whatsappUrl, fleches_restantes: fleches - 1 };
    });

    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur serveur.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
