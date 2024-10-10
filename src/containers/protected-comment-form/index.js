import { memo } from 'react';
import useSession from "../../hooks/use-session";
import LoginRequireLabel from '../../components/login-require-label';
import useTranslate from '../../hooks/use-translate';
import CommentForm from '../../components/comment-form';
import LoginLink from '../login-link';
import Spinner from '../../components/spinner';

function ProtectedCommentForm({ onSubmit, onClose, waiting, error, style }) {
  const { exists, waiting: sWaiting } = useSession()
  const { t } = useTranslate()
  let res = null

  if (sWaiting) res = <div>Ждём...</div>
  else if (!exists) res = (
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