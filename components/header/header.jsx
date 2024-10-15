export function Header({ children, className }) {



	return (
		<header className={"header " + className}>
			{children}
		</header>
	)
}