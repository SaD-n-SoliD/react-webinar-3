import { users } from '@/api/users.js'
import { data } from '@/api/data.js'

const endpoint = '/api/data'

export function mockFetchApi(url, req) {

	return new Promise((resolve, reject) => {

		if (url !== endpoint) reject({ name: '404', message: '404 Not Found' })

		// FormData
		const reqData = {}, formData = req?.body
		for (const [key, value] of formData?.entries() || []) {
			reqData[key] = value
		}

		const { login, password } = reqData
		const user = users
			.find(user =>
				user.login === login &&
				user.password === password
			)

		if (!user?.id) reject({ name: 'noSuchUser', message: 'Неверный логин или пароль' })

		const userData = data.find(({ uid }) => uid === user.id)

		resolve({ user, data: userData })
	})
}