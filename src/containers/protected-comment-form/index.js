import { memo } from 'react';
import LoginRequireLabel from '../../components/login-require-label';
import useTranslate from '../../hooks/use-translate';
import CommentForm from '../../components/comment-form';
import LoginLink from '../login-link';
import Spinner from '../../components/spinner';

function ProtectedCommentForm({ session, onSubmit, onClose, waiting, error, style }) {
  const { t } = useTranslate()
  let res = null
  console.log(session);
  if (session.waiting) res = <div>Ждём...</div>
  else if (!session.exists) res = (
    <LoginRequireLabel closeLabel={t('comment.cancel')} onClose={onClose}>
      <LoginLink>{t('comment.signIn')}</LoginLink>{t('comment.toReply')}
    </LoginRequireLabel>
  )
  else res = (
    <CommentForm t={t} onSubmit={onSubmit} onReset={onClose} error={error} />
  )

  return (
    <div style={style}>
      <Spinner active={waiting}>
        {res}
      </Spinner>
    </div>
  )
}

export default memo(ProtectedCommentForm) 