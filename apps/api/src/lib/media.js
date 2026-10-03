import sanitizeHtml from 'sanitize-html';

/* An uploaded SVG is a document that could carry script. Keep only drawing
   elements and presentation attributes; anything that can run code or load
   something (script, foreignObject, on* handlers, external hrefs) goes. */
const TAGS = ['svg', 'g', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'ellipse', 'text', 'tspan', 'defs',
  'linearGradient', 'radialGradient', 'stop', 'clipPath', 'mask', 'pattern', 'title', 'desc', 'use', 'symbol', 'filter',
  'feGaussianBlur', 'feOffset', 'feBlend', 'feColorMatrix', 'feMerge', 'feMergeNode', 'feFlood', 'feComposite'];
const ATTRS = ['xmlns', 'viewBox', 'width', 'height', 'x', 'y', 'x1', 'y1', 'x2', 'y2', 'cx', 'cy', 'r', 'rx', 'ry', 'd', 'points',
  'fill', 'fill-opacity', 'fill-rule', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'stroke-dasharray',
  'stroke-opacity', 'opacity', 'transform', 'id', 'class', 'offset', 'stop-color', 'stop-opacity', 'gradientUnits',
  'gradientTransform', 'clip-path', 'mask', 'font-family', 'font-size', 'font-weight', 'text-anchor', 'dominant-baseline',
  'preserveAspectRatio', 'stdDeviation', 'dx', 'dy', 'in', 'in2', 'mode', 'result', 'values', 'type', 'href', 'clip-rule',
  'letter-spacing', 'style', 'filter', 'patternUnits', 'flood-color', 'flood-opacity', 'operator'];

export function cleanSvgFile(bytes) {
  const text = bytes.toString('utf8');
  if (!/<svg[\s>]/i.test(text)) return null;
  const clean = sanitizeHtml(text, {
    allowedTags: TAGS,
    allowedAttributes: { '*': ATTRS },
    // only in-document references (#id) survive on href; no event handlers
    transformTags: { '*': (tag, attribs) => ({ tagName: tag, attribs: Object.fromEntries(Object.entries(attribs).filter(([k, v]) => !(k === 'href' && !String(v).startsWith('#')) && !/^on/i.test(k))) }) },
    parser: { lowerCaseAttributeNames: false, lowerCaseTags: false, xmlMode: true },
  });
  return Buffer.from(clean, 'utf8');
}

export const mediaUrl = (m) => `/api/media/${m.id}/${encodeURIComponent(m.fileName)}`;
