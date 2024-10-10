import Comment from "../../components/comment"
import useTranslate from "../../hooks/use-translate"
import React, { memo, useEffect, useCallback, useState } from 'react';
import commentActions from '../../store-redux/comments/actions';
import { useParams } from "react-router-dom";
import shallowequal from "shallowequal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import ProtectedCommentForm from "../protected-comment-form";
import { COMMENT_MARGIN_BOTTOM, COMMENT_MARGIN_LEFT } from "./constants";
import useSession from "../../hooks/use-session";

function Comments({ title }) {
  const { t, lang } = useTranslate();
  const dispatch = useDispatch();
  // Url параметры (:id)
  const params = useParams();
  const session = useSession();

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

  const DEFAULT_REPLY_PARENT = { _id: params.id, _type: 'article' }

  const [replyParent, setReplyParent] = useState(DEFAULT_REPLY_PARENT);

  const callbacks = {
    onAdd: useCallback(
      (text) => {
        dispatch(commentActions.add({ text, parent: replyParent }));
      },
      [replyParent]
    ),
    onShowReplyForm: useCallback(
      (parent) => {
        setReplyParent(parent)
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
          session={session}
          waiting={select.addWaiting}
          error={select.addError}
          onSubmit={callbacks.onAdd}
          onClose={onClose}
          style={{ marginLeft, marginBottom }}
        />
      )
    },

    recursiveComments: (tree, level = 1) => {
      const comment = <Comment t={t} locale={lang}
        key={tree._id}
        onReply={() => callbacks.onShowReplyForm(tree.parent)}
        // Взаимное расположение комментариев
        style={{
          marginLeft: COMMENT_MARGIN_LEFT * (level > 2),
          marginBottom: COMMENT_MARGIN_BOTTOM
        }}
        author={tree.author?.profile?.name}
        dateTime={tree.dateCreate}
        text={tree.text}
      />

      return (
        <>
          {tree.author && comment}

          {!!tree.children?.length &&
            // Вложенные комментарии
            tree.children.map((node) => (
              <div
                key={'$' + node._id}
                style={{ marginLeft: COMMENT_MARGIN_LEFT * (level > 2) }}
              >
                {renders.recursiveComments(node, level + 1)}

                {(node.parent === replyParent) &&
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
      {(DEFAULT_REPLY_PARENT === replyParent) &&
        renders.replyForm(false)
      }
    </div>
  )
}

export default memo(Comments)
