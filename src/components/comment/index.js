import './style.css'
import { cn as bem } from "@bem-react/classname"
import { memo } from 'react';

function Comment({ style, author, dateTime, text, t, locale, onReply }) {
  const cn = bem('Comment')
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
  return (
    <div style={style} className={cn()}>
      <div className={cn('head')}>
        <span className={cn('author')}>{author}</span>
        <span className={cn('dateTime')}>{t_dateTime}</span>
      </div>
      <div className={cn('content')}>
        {text}
      </div>
      <div className={cn('actions')}>
        <button onClick={onReply}>{t('comment.reply')}</button>
      </div>
    </div>
  )
}

export default memo(Comment)