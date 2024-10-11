import Comment from "../../components/comment"
import useTranslate from "../../hooks/use-translate"
import React, { memo, useEffect, useCallback, useState, useMemo } from 'react';
import commentActions from '../../store-redux/comments/actions';
import { useParams } from "react-router-dom";
import shallowequal from "shallowequal";
import { useSelector } from "react-redux";
import useSelectorOld from "../../hooks/use-selector";
import { useDispatch } from "react-redux";
import listToTree from "../../utils/list-to-tree";
import ProtectedCommentForm from "../protected-comment-form";
import { COMMENT_MARGIN_BOTTOM, COMMENT_MARGIN_LEFT } from "./constants";

function Comments({ title }) {
  const { t, lang } = useTranslate();
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
    }),
    shallowequal,
  );

  const user = useSelectorOld(state => state.session.user)

  const DEFAULT_REPLY_PARENT = useMemo(() => ({ _id: params.id, _type: 'article' }), [params.id])

  const [replyParent, setReplyParent] = useState(DEFAULT_REPLY_PARENT);

  const callbacks = {
    onAdd: useCallback(
      (text) => {
        dispatch(commentActions.add({ text, parent: replyParent, author: user }));
      },
      [replyParent, user]
    ),
    onShowReplyForm: useCallback(
      (_id) => {
        setReplyParent({ _id, _type: 'comment' })
      },
      []
    ),
    onCloseReplyForm: useCallback(
      () => {
        setReplyParent(DEFAULT_REPLY_PARENT)
      },
      [DEFAULT_REPLY_PARENT._id]
    ),
  }

  const renders = {
    replyForm: (isReply) => {
      const onClose = isReply ? callbacks.onCloseReplyForm : null
      const marginLeft = isReply ? COMMENT_MARGIN_LEFT : 0
      const marginBottom = COMMENT_MARGIN_BOTTOM

      return (
        <ProtectedCommentForm
          isReply={isReply}
          onSubmit={callbacks.onAdd}
          onClose={onClose}
          style={{ marginLeft, marginBottom }}
        />
      )
    },

    recursiveComments: (tree, level = 1) => {
      const comment = <Comment t={t} locale={lang}
        key={tree._id}
        onReply={() => callbacks.onShowReplyForm(tree._id)}
        // Взаимное расположение комментариев
        style={{
          marginBottom: COMMENT_MARGIN_BOTTOM
        }}
        author={tree.author?.profile?.name}
        dateTime={tree.dateCreate}
        text={tree.text}
      />

      return (
        <>
          {/* Текущий комментарий */}
          {tree.author && comment}

          {!!tree.children?.length &&
            // Вложенные комментарии
            tree.children.map((node) => (
              <div
                key={'$' + node._id}
                // Взаимное расположение комментариев
                style={{ marginLeft: COMMENT_MARGIN_LEFT * (level > 1) }}
              >
                {renders.recursiveComments(node, level + 1)}

                {(node._id === replyParent._id) &&
                  // Форма ответа на комментарий
                  renders.replyForm(true)
                }
              </div>
            ))
          }
        </>
      )
    }

  }

  const { items, count } = select.comments
  const modItems = items && [{ _id: params.id }, ...items]

  return (
    <div>
      <h2 style={{ fontWeight: 'normal' }}>
        {title || t('article.comments')} <span>{count && `(${count})`}</span>
      </h2>
      {modItems && renders.recursiveComments(listToTree(modItems)[0])}
      {(DEFAULT_REPLY_PARENT._id === replyParent._id) &&
        renders.replyForm(false)
      }
    </div>
  )
}

export default memo(Comments)
