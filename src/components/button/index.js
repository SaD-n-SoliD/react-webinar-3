import React from "react"
import { PropTypes } from 'prop-types'
import './style.css'
import { withNaming } from "@bem-react/classname";

const bem = withNaming({ n: '', e: '__', m: '_', v: '_' })
const cn = bem('button')

/**
 * @param {{
 * 	size: 'sm' | 'md',
 * }} props
 */
export default function Button({
	className = '',
	style = {},
	size = 'sm',
	children,
	stopPropagation,
	onClick = () => { }
}) {
	const buttonStyle = {
		sm: style,
		md: { paddingLeft: '12px', paddingRight: '12px', ...style },
	}[size]

	return (
		<button
			className={cn('', className)}
			style={buttonStyle}
			onClick={(e) => {
				if (stopPropagation) e.stopPropagation()
				onClick()
			}}
		>
			{children}
		</button>
	)
}

Button.propTypes = {
	// Для типизации css свойств нужно подключать другую либу, а лучше сразу ts
	style: PropTypes.object,
	className: PropTypes.string,
	size: PropTypes.string,
	children: PropTypes.node,
	onClick: PropTypes.func,
	stopPropagation: PropTypes.bool,
}
