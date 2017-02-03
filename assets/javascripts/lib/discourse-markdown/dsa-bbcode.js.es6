import { registerOption } from 'pretty-text/pretty-text';
import { builders } from 'pretty-text/engines/discourse-markdown/bbcode';

registerOption((siteSettings, opts) => opts.features["dsa-bbcode"] = true);

function generateCssClass(ugly) {
    var step1 = ugly.replace(/^[^-_a-zA-Z]+/, '').replace(/^-(?:[-0-9]+)/, '-');
    var step2 = step1 && step1.replace(/[^-_a-zA-Z0-9]+/g, '-');
    return step2.toLowerCase();
}

export function setup(helper) {

  helper.whiteList({
    custom(tag, name, value) {
      if (tag === 'div' && name === 'class') {
        return value === 'bbcode-dsa-regel' || value === 'bbcode-dsa-regelwert' ||
               value.startsWith('bbcode-dsa-regel ') || value.startsWith('bbcode-dsa-regelwert ');
      }
    }
  });

  const { register } = builders(helper);

  /*
   * <dl class="bbcode-dsa-regel">
   *   <dt class="bbcode-dsa-regelwert wert">Wert:</dt>
   *   <dd class="bbcode-dsa-regelwert wert">Zugehöriger Text</dd>
   *   ...
   * </dl>
   */
  register("regel", (contents, param) => ['dl', {'class': 'bbcode-dsa-regel' + (param ? ' ' + generateCssClass(param) : ''), 'data-bbcode': true}].concat(contents));
  register("wert", (contents, param) => {
    let className = 'bbcode-dsa-regelwert';
    if (param) {
      className += ' ';
      className += generateCssClass(param);
    }
    return [
             ['dt', {'class': className, 'data-bbcode': true}, param],
             ['dd', {'class': className, 'data-bbcode': true}].concat(contents)
           ];
    });


}
