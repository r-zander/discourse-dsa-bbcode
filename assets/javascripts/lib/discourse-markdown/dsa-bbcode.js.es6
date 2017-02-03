import { registerOption } from 'pretty-text/pretty-text';
import { builders } from 'pretty-text/engines/discourse-markdown/bbcode';

registerOption((siteSettings, opts) => opts.features["dsa-bbcode"] = true);

export function setup(helper) {

  helper.whiteList({
    custom(tag, name, value) {
      if (tag === 'div' && name === 'class') {
        return value.startsWith('bbcode-dsa-regel, ');
      }
    }
  });

  const { register } = builders(helper);

  register("regel", (contents, param) => ['div', {'class': 'bbcode-dsa-regel, ' + param.toLowerCase(), 'data-bbcode': true}].concat(contents));
}
