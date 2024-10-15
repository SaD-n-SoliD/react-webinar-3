
import './loginForm.css'
import { LoginError } from './loginError'

export function LoginForm({ onSubmit, error }) {

	return (
		<div className="login-form">
			<form className="login-form__form border_violet text_fields"
				action="#" method="POST" onSubmit={onSubmit}
			>
				<div className="login-form__title text_lil-title">Вход в аккаунт</div>

				<div className="login-form__label"><label htmlFor="login">Почта</label></div>
				<input className="login-form__field" id="login" name="login" type="email" required />

				<div className='login-form__label'><label htmlFor="password">Пароль</label></div>
				<input className="login-form__field" id="password" name="password" type="password" required />

				{error?.name === 'noSuchUser' &&
					<LoginError error={error} className='blink_red' />
				}
				<button className="login-form__btn btn" type="submit" >Войти</button>
			</form>
		</div>
	)
}

