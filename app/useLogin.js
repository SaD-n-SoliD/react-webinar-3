import { fetchApi, mockFetchApi } from '@/service/fetchApi'
import { logger } from '@/utils/logger'

import { useState } from "react";


export function useLogin() {
	const [error, setError] = useState()
	const [isLoading, setIsLoading] = useState(false)
	const [fetchedUserData, setFetchedUserData] = useState(null)

	// Обычно аутентификация происходит отдельным запросом от запроса на получения данных. При этом используется хук useEffect. Но в нашем примере нет сервера. JWT токенов и куки тоже нет.
	async function onLoginAttempt(e) {
		e.preventDefault()
		setIsLoading(true)

		const formData = new FormData(e.currentTarget)

		mockFetchApi('/api/data', { body: formData })
			.then(data => (setFetchedUserData(data), setError(null), data))
			.then(logger())
			.catch(e => (setError(e), logger('error')(e)))
			.finally(_ => setIsLoading(false))
	}

	function logout() {
		setFetchedUserData(null)
	}

	return ({
		onLoginAttempt, logout,
		error, setError,
		isLoading, setIsLoading,
		fetchedUserData, setFetchedUserData
	})
}


