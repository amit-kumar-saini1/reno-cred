import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

type NoticePayload = {
    id: number;
    title: string;
    body: string;
    category: string;
    priority: string;
    publishDate: string;
};

type NoticeByIdResponse =
    | {
          success: true;
          notice: NoticePayload;
      }
    | {
          success: true;
          message: string;
      }
    | {
          success: false;
          error: string;
      };

function parseId(id: string | string[] | undefined) {
    const value = Array.isArray(id) ? id[0] : id;
    const parsed = Number(value);
    return Number.isInteger(parsed) ? parsed : null;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<NoticeByIdResponse>,
) {
    const id = parseId(req.query.id);

    if (!id) {
        return res.status(400).json({ success: false, error: "Invalid notice id." });
    }

    if (req.method === "GET") {
        const notice = await prisma.notice.findUnique({ where: { id } });

        if (!notice) {
            return res.status(404).json({ success: false, error: "Notice not found." });
        }

        return res.status(200).json({
            success: true,
            notice: {
                id: notice.id,
                title: notice.title,
                body: notice.body,
                category: notice.category,
                priority: notice.priority,
                publishDate: notice.publishDate.toISOString(),
            },
        });
    }

    if (req.method === "PUT") {
        const { title, body, category, priority } = req.body as {
            title?: string;
            body?: string;
            category?: string;
            priority?: string;
        };

        if (!title?.trim() || !body?.trim() || !category?.trim() || !priority?.trim()) {
            return res.status(400).json({ success: false, error: "All fields are required." });
        }

        const notice = await prisma.notice.update({
            where: { id },
            data: {
                title: title.trim(),
                body: body.trim(),
                category: category.trim(),
                priority: priority.trim(),
            },
        });

        return res.status(200).json({
            success: true,
            notice: {
                id: notice.id,
                title: notice.title,
                body: notice.body,
                category: notice.category,
                priority: notice.priority,
                publishDate: notice.publishDate.toISOString(),
            },
        });
    }

    if (req.method === "DELETE") {
        await prisma.notice.delete({
            where: { id },
        });

        return res.status(200).json({
            success: true,
            message: "Notice deleted successfully.",
        });
    }

    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res.status(405).json({ success: false, error: "Method not allowed" });
}