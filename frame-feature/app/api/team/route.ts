import { NextRequest, NextResponse } from "next/server";
import { getAllTeamMembers, saveTeamMember, deleteTeamMember } from "@/utils/teamStorage";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeAll = searchParams.get("all") === "true";
    const members = await getAllTeamMembers(includeAll);
    return NextResponse.json({ members });
  } catch (error) {
    console.error("Error in GET /api/team:", error);
    return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, role, department, avatar, bio, skills, socials, featuredProjects, status } = body;

    if (!name || !role) {
      return NextResponse.json({ error: "Name and Role are required." }, { status: 400 });
    }

    const saved = await saveTeamMember({
      id,
      name: name.trim(),
      role: role.trim(),
      department: department || "Leadership",
      avatar: avatar?.trim() || "/gallery/1786386563351-Founder.JPG",
      bio: bio?.trim() || "",
      skills: Array.isArray(skills) ? skills : typeof skills === "string" ? skills.split(",").map((s: string) => s.trim()).filter(Boolean) : [],
      socials: socials || {},
      featuredProjects: Array.isArray(featuredProjects) ? featuredProjects : [],
      status: status || "published",
    });

    return NextResponse.json({ success: true, member: saved }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/team:", error);
    return NextResponse.json({ error: "Failed to save team member" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Member ID is required" }, { status: 400 });
    }

    const deleted = await deleteTeamMember(id);
    if (!deleted) {
      return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 });
    }

    return NextResponse.json({ success: true, deleted: id });
  } catch (error) {
    console.error("Error in DELETE /api/team:", error);
    return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 });
  }
}
