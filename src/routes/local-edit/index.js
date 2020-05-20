import Editor from '../../components/editor'
import style from './style'

const LocalEdit = () => (
	<div class={style.edit}>
		<Editor value={''} />
	</div>
);

export default LocalEdit;