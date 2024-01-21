import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions {
  base: number;
  limit: number;
  showTable: boolean;
  fileDestination: string;
  fileName: string;
}

export class ServerApp {
  static run({ base, limit, showTable, fileName, fileDestination }: RunOptions) {
    const table = new CreateTable().execute({ base, limit });

    const wasSaved = new SaveFile().execute({ fileContent: table, fileDestination, fileName });

    wasSaved ? console.log("FILE CREATED") : console.log("FILE NOT CREATED");
  }
}
