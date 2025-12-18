"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlSanitizer = void 0;
const sanitize_html_1 = require("sanitize-html");
const HtmlSanitizer = (params) => !!params.value
    ? (0, sanitize_html_1.default)(params.value, {
        allowedTags: [],
        allowedSchemes: [],
        disallowedTagsMode: 'discard',
        allowProtocolRelative: false
    })
    : null;
exports.HtmlSanitizer = HtmlSanitizer;
//# sourceMappingURL=html-sanitizer.validator.js.map