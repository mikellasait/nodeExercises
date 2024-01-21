import fs from "fs";
import { yarg } from "./config/plugins/args.plugin";

const { b: base, l: limit, s: show } = yarg;

let bodyMessage = "";
const header = `
==============================
        Tabla de ${base}
==============================\n
`;

for (let i = 1; i < limit; i++) {
  bodyMessage += `${base} x ${i} = ${base * i}\n`;
}

bodyMessage = header + bodyMessage;

const outputPath = "outputs";

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath);
}

fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, bodyMessage);

if (show) {
  console.log(bodyMessage);
}
