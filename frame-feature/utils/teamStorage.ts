import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  where,
  limit,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { teamMembers as fallbackTeamMembers, TeamMember } from "@/data/team";
import { ContentStatus } from "./blogStorage";

export interface StoredTeamMember extends TeamMember {
  status?: ContentStatus;
}

export async function getAllTeamMembers(includeAll: boolean = false): Promise<StoredTeamMember[]> {
  try {
    const teamRef = collection(db, "team");
    const q = query(teamRef, orderBy("createdAt", "asc"));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // Return default team members if database is empty
      return fallbackTeamMembers.map((m) => ({ ...m, status: "published" }));
    }

    const members: StoredTeamMember[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const status: ContentStatus = data.status === "draft" ? "draft" : "published";

      if (!includeAll && status === "draft") {
        return;
      }

      members.push({
        id: docSnap.id,
        name: data.name || "",
        role: data.role || "",
        department: data.department || "Leadership",
        avatar: data.avatar || "/gallery/1786386563351-Founder.JPG",
        bio: data.bio || "",
        skills: data.skills || [],
        socials: data.socials || {},
        featuredProjects: data.featuredProjects || [],
        status,
      });
    });

    return members.length > 0 ? members : fallbackTeamMembers.map((m) => ({ ...m, status: "published" }));
  } catch (error) {
    console.error("Error reading team members from Firestore:", error);
    return fallbackTeamMembers.map((m) => ({ ...m, status: "published" }));
  }
}

export async function saveTeamMember(
  member: Omit<StoredTeamMember, "id"> & { id?: string }
): Promise<StoredTeamMember> {
  const teamRef = collection(db, "team");
  const status: ContentStatus = member.status || "published";

  const payload = {
    name: member.name,
    role: member.role,
    department: member.department,
    avatar: member.avatar,
    bio: member.bio,
    skills: member.skills,
    socials: member.socials,
    featuredProjects: member.featuredProjects,
    status,
    updatedAt: serverTimestamp(),
  };

  let id = member.id || "";
  if (id) {
    await updateDoc(doc(db, "team", id), payload);
  } else {
    const docRef = await addDoc(teamRef, {
      ...payload,
      createdAt: serverTimestamp(),
    });
    id = docRef.id;
  }

  return {
    ...member,
    id,
    status,
  };
}

export async function deleteTeamMember(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, "team", id));
    return true;
  } catch (error) {
    console.error("Error deleting team member:", error);
    return false;
  }
}
