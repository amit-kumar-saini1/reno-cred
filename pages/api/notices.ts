import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

type NoticeResponse =
    | {
          success: true;
          notices: Array<{
              id: number;
              title: string;
              body: string;
              category: string;
              priority: string;
              publishDate: string;
          }>;
      }
    | {
          success: false;
          error: string;
      };

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<NoticeResponse>,
) {
    if (req.method !== "GET") {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).json({ success: false, error: "Method not allowed" });
    }

    try {
        const notices = await prisma.notice.findMany({
            orderBy: { createdAt: "desc" },
        });

        return res.status(200).json({
            success: true,
            notices: notices.map((notice) => ({
                id: notice.id,
                title: notice.title,
                body: notice.body,
                category: notice.category,
                priority: notice.priority,
                publishDate: notice.publishDate.toISOString(),
            })),
        });
    } catch {
        return res.status(500).json({ success: false, error: "Notices load nahi ho paye." });
    }
}