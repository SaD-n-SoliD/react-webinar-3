import './style.css'
import { cn as bem } from "@bem-react/classname"
import { memo } from 'react';
import Field from '../field';

function CommentForm({ t, label, defaultValue, onSubmit, onReset, error }) {
  const cn = bem('CommentForm')
  const submit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target).get('comment')
    // Если комментарий пуст, не отправляем форму. Хотя у textarea и так есть required
    if (!data) return
    onSubmit(data)
  }
  return (
    <form className={cn()} onSubmit={submit} onReset={onReset}>
      <Field
        label={label || t('comment.newComment')}
        error={error?.message || error}
        spacing="small"
      >
        <textarea
          defaultValue={defaultValue}
          required
          className={cn('textarea')}
          name="comment"
        />
      </Field>
      {/* <Field error={error} /> */}
      <div className={cn('actions')}>
        <button type="submit">{t('comment.send')}</button>
        {onReset && <button type="reset">{t('comment.cancel')}</button>}
      </div>
    </form>
  )
}

export default memo(CommentForm)