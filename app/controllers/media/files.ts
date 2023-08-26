import type { Request, Response } from "express";
import type { Dirent } from "node:fs";
import { StatusCodes } from "http-status-codes";
import { join } from "node:path";
import { existsSync, readdirSync } from "node:fs";

export const fileHandler = (req: Request, res: Response): Response<void> | void => {
    try {

        const basePath: string = join(__dirname, "../../../data/media")
        // Get a list of directories in the media folder
        const validDirs: string[] = readdirSync(basePath, { withFileTypes: true })
            .filter((dirent: Dirent) => dirent.isDirectory())
            .map((dirent: Dirent) => dirent.name);

        const dir: string = req.params.dir.toLowerCase();

        if (!validDirs.includes(dir)) {
            return res.status(StatusCodes.NOT_FOUND).end();
        }

        const path: string = join(basePath, dir, req.params.fileName.toLowerCase());

        if (!existsSync(path)) {
            return res.status(StatusCodes.NOT_FOUND).end();
        }

        // Set headers
        res.setHeader('Content-Disposition', `attachment; filename=${req.params.fileName.toLowerCase()}`);
        res.setHeader('Cache-Control', 'public, max-age=259200');

        return res.sendFile(path);

    } catch (e) {
        throw e;
    }
}