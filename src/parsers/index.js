import {
  parseSchema as s2f,
} from './schema/to_form';
import {
  parseSchema as s2d,
} from './schema/to_dotnotation';
import {
  parseSchema as f2x,
} from './form/to_xml';

export const schema2form = s2f;
export const schema2dotnotation = s2d;
export const form2xml = f2x;

export default {
  schema2form,
  schema2dotnotation,
  form2xml,
};
