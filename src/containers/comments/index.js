import Comment from "../../components/comment"
import useTranslate from "../../hooks/use-translate"
import { memo, useEffect, useCallback, useState } from 'react';
import commentActions from '../../store-redux/comments/actions';
import { useParams } from "react-router-dom";
import shallowequal from "shallowequal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import ProtectedCommentForm from "../protected-comment-form";

function Comments({ title }) {
  const dispatch = useDispatch();
  // Url параметры (:id)
  const params = useParams();

  useEffect(() => {
    dispatch(commentActions.load(params.id));
    return () => {
      dispatch(commentActions.reset());
    }
  }, [params.id])

  const select = useSelector(
    state => ({
      comments: state.comments.data,
      waiting: state.comments.waiting,
      addWaiting: state.comments.addWaiting,
      addError: state.comments.addError,
    }),
    shallowequal,
  );

  const [replyParent, setReplyParent] = useState({ _id: params.id, _type: 'article' });

  const callbacks = {
    onAdd: useCallback(
      (text) => {
        dispatch(commentActions.add({ text, parent: replyParent }));
      },
      []
    ),
    onShowReplyForm: useCallback(
      (parent) => {
        setReplyParent(parent)
      },
      []
    ),
    onCloseReplyForm: useCallback(
      () => {
        setReplyParent({ _id: params.id, _type: 'article' })
      },
      []
    ),
  }

  let parentReplyLevel = 0
  let replyFormIsPlaced = false

  const { t, lang } = useTranslate()

  const { items, count } = select.comments
  const modItems = items && [{ _id: params.id }, ...items]

  const prepare = (item, level) => ({ ...item, level })

  return (
    <div>
      <h2 style={{ fontWeight: 'normal' }}>
        {title || t('article.comments')} <span>{count && `(${count})`}</span>
      </h2>
      <div>
        {modItems && treeToList(listToTree(modItems), prepare).slice(1)
          .map(({ _id, parent, author, dateCreate, text, level }, i, arr) => (
            <>
              {
                // Ищем родительский коммент для ответа
                (replyParent === parent ? parentReplyLevel = level : true) &&
                // Если форма ещё не размещена
                !replyFormIsPlaced &&
                // Если нашли коммент для ответа 
                parentReplyLevel &&
                // Если текущий коммент на том же уровне или комментов на том же уровне больше нет
                (parentReplyLevel === level || !arr[i + 1]) &&
                // Размещаем форму (флаг)
                (replyFormIsPlaced = true) &&
                // Размещаем форму
                <ProtectedCommentForm
                  key={JSON.stringify(replyParent)}
                  waiting={select.addWaiting}
                  error={select.addError}
                  onSubmit={callbacks.onAdd}
                  onClose={callbacks.onCloseReplyForm}
                  style={{ marginLeft: 30 * (parentReplyLevel + 1), marginBottom: 30 }}
                />
              }
              <Comment t={t} locale={lang}
                key={_id}
                onReply={() => callbacks.onShowReplyForm(parent)}
                // Взаимное расположение комментариев
                style={{ marginLeft: 30 * (level - 1), marginBottom: 30 }}
                author={author?.profile?.name}
                dateTime={dateCreate}
                text={text}
              />
            </>
          ))}
        {
          // Если форма ещё не размещена
          !replyFormIsPlaced &&
          // Размещаем форму
          <ProtectedCommentForm
            waiting={select.addWaiting}
            error={select.addError}
            onSubmit={callbacks.onAdd}
            style={{ marginBottom: 30 }}
          />
        }
      </div>
    </div>
  )
}

export default memo(Comments)
