import * as fs from "fs-extra";
import * as path from "path";
import { TEM_PATH } from "./constants";

interface RESPONSE {
  code: number;
  message: string;
  data?: any;
}

// 获取模板选项
export const fetchTemplateOptions = (): string[] => {
  const l = fs
    .readdirSync(TEM_PATH, { withFileTypes: true })
    .filter((fd) => fd.isDirectory());
  return l.map((fb) => fb.name);
};

/**
 *
 * @param temp 模板
 * @param destPath 目标文件夹路径
 */
export const cpTemplates = (temp: string, destPath: string): RESPONSE => {
  const src = path.join(TEM_PATH, temp);
  if (!fs.existsSync(src)) {
    return {
      code: 500,
      message: `No templates ${temp} found!`,
    };
  }
  if (fs.existsSync(destPath)) {
    return {
      code: 400,
      message: `directory ${destPath} exists!`,
    };
  }
  try {
    fs.copySync(src, destPath);
    return {
      code: 200,
      message: `success to create folder ${destPath}`,
    };
  } catch (e: any) {
    return {
      code: 500,
      message: e.toString(),
    };
  }
};
