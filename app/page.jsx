"use client"

import { Header } from "@/components/header";
import { LoginForm } from "@/components/loginForm";

import { UIError } from "./UIkit/UIError";
import { UIAccount } from "./UIkit/UIAccount";

import { useLogin } from "./useLogin";

export default function Home() {

	const {
		onLoginAttempt,
		logout,
		error,
		isLoading,
		fetchedUserData
	} = useLogin()

	return (
		<>
			<Header className="p-20">
				{/* Если ошибка, но не 'noSuchUser', то вероятнее всего это HTTP ошибка. Не тема этого дз, поэтому тут затычка с простеньким UI компонентом */}
				{error && (error?.name !== 'noSuchUser') && <UIError error={error} />}
				{isLoading && <div>Loading...</div>}
				{fetchedUserData && <UIAccount data={fetchedUserData} logout={logout} />}
			</Header>
			<main className="main">
				{!fetchedUserData &&
					<LoginForm
						onSubmit={onLoginAttempt}
						error={error}
					/>
				}
			</main>
		</>
	);
}
