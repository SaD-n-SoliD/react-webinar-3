import './style.css'
import { cn as bem } from "@bem-react/classname"
import { memo, useRef } from 'react';

function Comment({ style, modifiers, author, dateTime, text, t, locale, onReply }) {
  const cn = bem('Comment')
  const ref = useRef()

  const mod = modifiers || {
    head: {},
    author: {},
    dateTime: {},
    content: {},
    actions: {},
  }
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit"
  }

  const d = new Date(dateTime)

  const date = new Intl.DateTimeFormat(locale, dateOptions).format(d).replace(/\s*г\./, "")
  const time = new Intl.DateTimeFormat(locale, timeOptions).format(d)

  const t_dateTime = `${date} ${t('dateTime.at')} ${time}`
  const reply = () => onReply(ref.current)

  return (
    <div ref={ref} style={style} className={cn()}>
      <div className={cn('head', mod.head)}>
        <span className={cn('author', mod.author)}>{author}</span>
        <span className={cn('dateTime', mod.dateTime)}>{t_dateTime}</span>
      </div>
      <div className={cn('content', mod.content)}>
        {text}
      </div>
      <div className={cn('actions', mod.actions)}>
        <button onClick={reply}>{t('comment.reply')}</button>
      </div>
    </div>
  )
}

export default memo(Comment)