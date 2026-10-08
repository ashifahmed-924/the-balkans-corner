import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { deflateSync } from "zlib";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "images", "balkans-corner");
mkdirSync(outDir, { recursive: true });

const names = [
  "hero-burger",
  "burger-americana",
  "chicken-classic",
  "cheese-burger",
  "burger-og",
  "burger-miki",
  "burger-special",
  "chevapi-plate",
  "cevapi-roll",
  "lamb-shish",
  "chicken-shish",
  "lovacke",
  "pljeskavica",
  "ushtipsi",
  "chips",
  "potato-cake",
  "chicken-tender",
  "dim-sim",
  "juice",
  "iced-mocha",
  "water",
  "glass-bottle",
  "coffee",
  "iced-coffee",
  "hot-chocolate",
  "intro-spread",
  "cta-food",
  "gallery-01",
  "gallery-02",
  "gallery-03",
  "gallery-04",
  "gallery-05",
  "gallery-06",
  "gallery-07",
  "gallery-08",
  "storefront",
  "interior",
];

const palettes = [
  [11, 11, 11, 168, 18, 24, 255, 201, 40],
  [20, 20, 20, 221, 32, 40, 244, 237, 223],
  [14, 14, 14, 111, 9, 13, 232, 173, 23],
  [30, 30, 30, 241, 59, 52, 140, 137, 131],
];

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = c & 1 ? (c >>> 1) ^ 0xedb88320 : c >>> 1;
  }
  return ~c >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typeBuf = Buffer.from(type);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function makePng(w, h, paletteIndex) {
  const p = palettes[paletteIndex % palettes.length];
  const raw = Buffer.alloc((w * 3 + 1) * h);
  for (let y = 0; y < h; y++) {
    const row = y * (w * 3 + 1);
    raw[row] = 0;
    for (let x = 0; x < w; x++) {
      const t = (x / w + y / h) / 2;
      const radial = Math.hypot(x / w - 0.55, y / h - 0.45);
      let r, g, b;
      if (radial < 0.35) {
        r = p[3] + (p[6] - p[3]) * (1 - radial / 0.35) * 0.4;
        g = p[4] + (p[7] - p[4]) * (1 - radial / 0.35) * 0.4;
        b = p[5] + (p[8] - p[5]) * (1 - radial / 0.35) * 0.4;
      } else if (t < 0.5) {
        const u = t * 2;
        r = p[0] * (1 - u) + p[3] * u;
        g = p[1] * (1 - u) + p[4] * u;
        b = p[2] * (1 - u) + p[5] * u;
      } else {
        const u = (t - 0.5) * 2;
        r = p[3] * (1 - u) + p[0] * u;
        g = p[4] * (1 - u) + p[1] * u;
        b = p[5] * (1 - u) + p[2] * u;
      }
      // grill lines
      if (x % 18 < 2) {
        r *= 0.7;
        g *= 0.7;
        b *= 0.7;
      }
      const i = row + 1 + x * 3;
      raw[i] = Math.max(0, Math.min(255, r | 0));
      raw[i + 1] = Math.max(0, Math.min(255, g | 0));
      raw[i + 2] = Math.max(0, Math.min(255, b | 0));
    }
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    signature,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// Prefer remote Unsplash downloads; fall back to generated PNGs saved as .jpg names
// (Next/Image accepts the bytes if content is valid — we'll write real PNG with .jpg
// extension only as last resort; better write .jpg via sharp if available.)

const unsplash = {
  "hero-burger": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600&q=80",
  "burger-americana": "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&q=80",
  "chicken-classic": "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=1200&q=80",
  "cheese-burger": "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=1200&q=80",
  "burger-og": "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=1200&q=80",
  "burger-miki": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=1200&q=80",
  "burger-special": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=1200&q=80",
  "chevapi-plate": "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=1200&q=80",
  "cevapi-roll": "https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?w=1200&q=80",
  "lamb-shish": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80",
  "chicken-shish": "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=1200&q=80",
  lovacke: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80",
  pljeskavica: "https://images.unsplash.com/photo-1432139509613-5c4255815697?w=1200&q=80",
  ushtipsi: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80",
  chips: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=1200&q=80",
  "potato-cake": "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=1200&q=80",
  "chicken-tender": "https://images.unsplash.com/photo-1562967914-608f82629710?w=1200&q=80",
  "dim-sim": "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=1200&q=80",
  juice: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=1200&q=80",
  "iced-mocha": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=1200&q=80",
  water: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80",
  "glass-bottle": "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=800&q=80",
  coffee: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
  "iced-coffee": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=1200&q=80",
  "hot-chocolate": "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=1200&q=80",
  "intro-spread": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80",
  "cta-food": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80",
  "gallery-01": "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=1200&q=80",
  "gallery-02": "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=1200&q=80",
  "gallery-03": "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=1200&q=80",
  "gallery-04": "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80",
  "gallery-05": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
  "gallery-06": "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=1200&q=80",
  "gallery-07": "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=1200&q=80",
  "gallery-08": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80",
  storefront: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1200&q=80",
  interior: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80",
};

async function download(url, dest) {
  const res = await fetch(url, {
    headers: { "User-Agent": "TheBalkansCornerSite/1.0" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(dest, buf);
}

let ok = 0;
let fallback = 0;

for (let i = 0; i < names.length; i++) {
  const name = names[i];
  const dest = join(outDir, `${name}.jpg`);
  const url = unsplash[name];
  try {
    if (!url) throw new Error("no url");
    await download(url, dest);
    ok++;
    console.log("ok", name);
  } catch (e) {
    // write PNG bytes with .png then also copy conceptually — Next needs valid image
    const pngDest = join(outDir, `${name}.jpg`);
    writeFileSync(pngDest, makePng(800, 800, i));
    fallback++;
    console.log("fallback", name, e.message);
  }
}

console.log(`Done. downloaded=${ok} fallback=${fallback}`);
