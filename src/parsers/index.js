import {
  parseSchema as s2f,
} from './schema/to_form';
import {
  parseSchema as s2d,
} from './schema/to_dotnotation';
import {
  parseSchema as f2x,
} from './form/to_xml';
import {
  convert,
} from './schema/createDom';

export const schema2form = x => s2f(convert(x));
export const schema2dotnotation = s2d;
export const form2xml = f2x;

export default {
  schema2form,
  schema2dotnotation,
  form2xml,
};
