import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

type ApiResponse =
    | {
          success: true;
          topic: {
              id: number;
              title: string;
              topicName: string;
              category: string;
              priority: string;
              createdAt: Date;
          };
      }
    | {
          success: false;
          error: string;
      };

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>,
) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({ success: false, error: "Method not allowed" });
    }

    const { title, topicName, category, priority } = req.body as {
        title?: string;
        topicName?: string;
        category?: string;
        priority?: string;
    };

    if (!title?.trim() || !topicName?.trim() || !category?.trim() || !priority?.trim()) {
        return res.status(400).json({
            success: false,
            error: "All fields are required.",
        });
    }

    const notice = await prisma.notice.create({
  data: {
    title: title.trim(),
    body: topicName.trim(),
    category: category.trim(),
    priority: priority.trim(),
    publishDate: new Date(),
  },
 });

    return res.status(201).json({
        success: true,
        notice,
    });
}