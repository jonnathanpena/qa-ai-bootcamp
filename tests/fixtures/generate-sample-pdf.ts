import { writeFileSync } from 'node:fs';
import path from 'node:path';

// Generates a minimal, valid, single-page PDF without any external dependency (pdf-lib, etc.)
// so `npm install` stays dependency-light. Hand-rolled PDF syntax is unusual outside this kind
// of fixture-generation script, hence this is isolated here rather than used anywhere else.
const PDF_CONTENT = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 200 200] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 73 >>
stream
BT /F1 18 Tf 20 100 Td (Sample claim document) Tj ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
0
%%EOF`;

const outPath = path.join(__dirname, 'sample-claim.pdf');
writeFileSync(outPath, PDF_CONTENT, 'utf-8');
console.log(`Generated ${outPath}`);
