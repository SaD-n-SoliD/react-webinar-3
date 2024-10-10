import './style.css'
import { cn as bem } from "@bem-react/classname"
import { memo } from 'react';
import Field from '../field';

function CommentForm({ t, onSubmit, onReset, error }) {
  const cn = bem('CommentForm')
  const submit = (e) => { e.preventDefault(); onSubmit(new FormData(e).get('comment')) }
  return (
    <form className={cn()} onSubmit={submit} onReset={onReset}>
      <Field
        label={t('comment.newComment')}
        error={error?.toString()}
        spacing="small"
      >
        <textarea
          className={cn('textarea')}
          name="comment"
        />
      </Field>
      {/* <Field error={error} /> */}
      <div className={cn('actions')}>
        <Field>
          <button type="submit">{t('comment.send')}</button>
        </Field>
        {onReset &&
          <Field>
            <button type="reset">{t('comment.cancel')}</button>
          </Field>
        }
      </div>
    </form>
  )
}

export default memo(CommentForm)