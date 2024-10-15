export function logger(method = 'log') {
	// Можно проверять, действительно ли передали имя метода, но не вижу смысла
	if (!console[method]) throw new Error(`Объект console не имее метода <${method}>`)

	return (data) => {
		console[method](data)
		return data
	}
}

