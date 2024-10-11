import { memo } from 'react';
import LoginRequireLabel from '../../components/login-require-label';
import useTranslate from '../../hooks/use-translate';
import CommentForm from '../../components/comment-form';
import LoginLink from '../login-link';
import Spinner from '../../components/spinner';
import useSession from '../../hooks/use-session';
import shallowequal from 'shallowequal';
import { useSelector } from 'react-redux';

function ProtectedCommentForm({ isReply, onSubmit, onClose, style }) {
  const select = useSelector(
    state => ({
      waiting: state.comments.addWaiting,
      error: state.comments.addError,
    }),
    shallowequal,
  );

  const { t } = useTranslate()
  const session = useSession();
  let res = null

  const label = isReply ? t('comment.newReply') : t('comment.newComment')

  if (session.waiting) res = <div>Ждём...</div>
  else if (!session.exists) res = (
    <LoginRequireLabel closeLabel={t('comment.cancel')} onClose={onClose}>
      <LoginLink>{t('comment.signIn')}</LoginLink>{t('comment.toReply')}
    </LoginRequireLabel>
  )
  else res = (
    <CommentForm label={label} t={t} onSubmit={onSubmit} onReset={onClose} error={select.error} />
  )

  return (
    <div style={style}>
      <Spinner active={select.waiting}>
        {res}
      </Spinner>
    </div>
  )
}

export default memo(ProtectedCommentForm) 