export function UIAccount({ logout, data }) {
	return (
		<>
			<div className="text_lil-title mb-20">
				Вы вошли! Смотрите данные в консоли
			</div>
			<button className="btn" onClick={logout}>
				Выйти
			</button>
		</>
	)
}