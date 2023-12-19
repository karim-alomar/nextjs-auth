import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
export const POST = async (req: NextRequest) => {
  try {
    await connectMongoDB();
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("_id");
    return NextResponse.json({ user, message: "Your email already exists" });
  } catch (error) {
    return NextResponse.json(
      { message: "There is error in exists API" },
      { status: 500 }
    );
  }
};
