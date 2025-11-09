export function highlight(code: string): string {
  let result = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const tokens: Array<{ index: number; length: number; replacement: string }> =
    [];

  const addToken = (match: RegExpMatchArray, className: string, group = 0) => {
    const start = match.index!;
    const text = match[group];
    const end = start + text.length;

    const hasOverlap = tokens.some((t) => {
      const tEnd = t.index + t.length;
      return (
        (start >= t.index && start < tEnd) || (end > t.index && end <= tEnd)
      );
    });

    if (!hasOverlap) {
      tokens.push({
        index: start,
        length: text.length,
        replacement: `<span class="${className}">${text}</span>`,
      });
    }
  };

  Array.from(result.matchAll(/(\/\/[^\n]*)/g)).forEach((m) =>
    addToken(m, "text-gray-500", 1),
  );

  Array.from(result.matchAll(/('[^']*')/g)).forEach((m) =>
    addToken(m, "text-green-400", 1),
  );
  Array.from(result.matchAll(/("[^"]*")/g)).forEach((m) =>
    addToken(m, "text-green-400", 1),
  );
  Array.from(result.matchAll(/(`[^`]*`)/g)).forEach((m) =>
    addToken(m, "text-green-400", 1),
  );

  Array.from(result.matchAll(/\b(\d+)\b/g)).forEach((m) =>
    addToken(m, "text-orange-400", 1),
  );

  Array.from(
    result.matchAll(
      /\b(import|from|const|let|var|function|async|await|return|if|else|for|while|type|interface|enum|export|default|class|new|typeof)\b/g,
    ),
  ).forEach((m) => addToken(m, "text-purple-400", 1));

  Array.from(result.matchAll(/\b([A-Z][a-zA-Z0-9_]*)\b/g)).forEach((m) =>
    addToken(m, "text-blue-300", 1),
  );

  Array.from(result.matchAll(/\b([a-z_][a-zA-Z0-9_]*)\s*\(/g)).forEach((m) => {
    if (m.index !== undefined) {
      const funcName = m[1];
      const end = m.index + funcName.length;
      const hasOverlap = tokens.some((t) => {
        const tEnd = t.index + t.length;
        return (
          (m.index! >= t.index && m.index! < tEnd) ||
          (end > t.index && end <= tEnd)
        );
      });
      if (!hasOverlap) {
        tokens.push({
          index: m.index,
          length: funcName.length,
          replacement: `<span class="text-yellow-300">${funcName}</span>`,
        });
      }
    }
  });

  Array.from(result.matchAll(/\.([a-zA-Z_][a-zA-Z0-9_]*)/g)).forEach((m) => {
    if (m.index !== undefined) {
      const propName = m[1];
      const start = m.index + 1;
      const end = start + propName.length;
      const hasOverlap = tokens.some((t) => {
        const tEnd = t.index + t.length;
        return (
          (start >= t.index && start < tEnd) || (end > t.index && end <= tEnd)
        );
      });
      if (!hasOverlap) {
        tokens.push({
          index: start,
          length: propName.length,
          replacement: `<span class="text-yellow-300">${propName}</span>`,
        });
      }
    }
  });

  tokens.sort((a, b) => b.index - a.index);

  tokens.forEach((token) => {
    result =
      result.slice(0, token.index) +
      token.replacement +
      result.slice(token.index + token.length);
  });

  return result;
}
