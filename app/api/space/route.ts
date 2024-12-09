import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const tempId = "20560e4a-0325-4c87-9638-515d194f56f0";

export async function POST(req: NextRequest) {
  try {
    const sessions = await getServerSession(authOptions);

    // if (!sessions?.user?.name) {
    //   return NextResponse.json(
    //     {
    //       status: 401,
    //       success: false,
    //       message: "You must be signed in to create a space",
    //     },
    //     { status: 401 }
    //   );
    // }

    const data = await req.json();

    if (!data?.spaceName) {
      return NextResponse.json(
        {
          status: 429,
          success: false,
          message: "Space Name required",
        },
        { status: 429 }
      );
    }

    const space = await prisma.space.create({
      data: {
        name: data.spaceName,
        hostId: sessions?.user?.id || tempId,
      },
    });

    return NextResponse.json({
      message: "Space created successfully",
      space,
      status: 200,
      success: true,
    });
  } catch (error: any) {
    console.log(error);

    if (error.message === "Unauthenticated Request") {
      return NextResponse.json(
        {
          status: 401,
          success: false,
          message: "You must be signed in to create a space",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        status: 500,
        success: false,
        message: `An unexpected error occurred: ${error?.message}`,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const sessions = await getServerSession(authOptions);

    // if (!sessions?.user?.name) {
    //   return NextResponse.json(
    //     {
    //       status: 401,
    //       success: false,
    //       message: "You must be signed in to delete a space",
    //     },
    //     { status: 401 }
    //   );
    // }

    const spaceId = req.nextUrl.searchParams.get("spaceId");

    if (!spaceId) {
      return NextResponse.json(
        {
          message: "Space Id required",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    const space = await prisma.space.findUnique({
      where: {
        id: spaceId,
      },
      select: { hostId: true },
    });

    if (!space) {
      return NextResponse.json(
        {
          message: "Space not found",
          success: false,
        },
        {
          status: 404,
        }
      );
    }

    if (space.hostId !== (sessions?.user.id || tempId)) {
      return NextResponse.json(
        {
          message: "You are not authorized to deleted this space",
          success: false,
        },
        {
          status: 403,
        }
      );
    }

    await prisma.space.delete({
      where: { id: spaceId },
    });

    return NextResponse.json(
      {
        message: "Space deleted successfully",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log(error);

    if (error.message === "Unauthenticated Request") {
      return NextResponse.json(
        {
          status: 401,
          success: false,
          message: "You must be signed in to delete the space",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        status: 500,
        success: false,
        message: `An unexpected error occurred: ${error?.message}`,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const sessions = await getServerSession(authOptions);

    // if (!sessions?.user?.name) {
    //   return NextResponse.json(
    //     {
    //       status: 401,
    //       success: false,
    //       message: "You must be signed in to retrieve the  a space",
    //     },
    //     { status: 401 }
    //   );
    // }

    const spaceId = req.nextUrl.searchParams.get("spaceId");

    if (spaceId) {
      const space = await prisma.space.findUnique({
        where: {
          id: spaceId,
        },
        select: { hostId: true },
      });

      if (!space) {
        return NextResponse.json(
          {
            status: 404,
            success: false,
            message: "Space not found",
          },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "Space retrieved Successfully",
          hostId: space.hostId,
        },
        { status: 200 }
      );
    }

    const spaces = await prisma.space.findMany({
      where: {
        hostId: sessions?.user.id || tempId,
      },
    });

    console.log(spaces);

    return NextResponse.json(
      {
        success: true,
        message: "Space retrieved Successfully",
        spaces,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error retrieving space " + error);

    return NextResponse.json(
      {
        status: 500,
        success: false,
        message: `An unexpected error occurred: ${error?.message}`,
      },
      { status: 500 }
    );
  }
}
