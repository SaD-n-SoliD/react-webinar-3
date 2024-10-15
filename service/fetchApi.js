
export { mockFetchApi } from "./mock/fetchApi"

const defaultFetchConfig = {
	method: "POST",
	mode: "cors",
	cache: "no-cache",
	credentials: "same-origin",
	headers: {
		"Content-Type": "application/json",
	},
	redirect: "follow",
	referrerPolicy: "no-referrer",
	body: ""
}

export async function fetchApi(url, req) {

	try {
		const response = await fetch(url, { ...defaultFetchConfig, ...req })

		const data = await response.json()
		return data
	}
	catch (e) {
		return e
	}

}