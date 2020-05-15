import Editor from '../../components/editor'
import style from './style'

const code = 
`def main(args):
  return args`

const Edit = () => (
	<div class={style.edit}>
		<Editor value={code} />
	</div>
);

export default Edit;