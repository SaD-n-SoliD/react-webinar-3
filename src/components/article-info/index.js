import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';

const cn = bem('ArticleInfo');

export default function ArticleInfo({ data, actions, labels }) {
  return (
    <div className={cn()}>
      <div className={cn('description')}>{data.description}</div>
      <div className={cn('madeIn')}>
        {labels.madeIn}: <b>{data.madeIn.title} ({data.madeIn.code})</b>
      </div>
      <div className={cn('category')}>
        {labels.category}: <b>{data.category.title}</b>
      </div>
      <div className={cn('released')}>
        {labels.releasedInYear}: <b>{new Date(data.dateCreate).getFullYear()}</b>
      </div>
      <div className={cn('price')}>
        {labels.price}: <b>{data.price} ₽</b>
      </div>
      {actions}
    </div>
  )
}

ArticleInfo.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.string,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
    }),
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
    dateCreate: PropTypes.string,
    price: PropTypes.number,
  }),
  actions: PropTypes.node,
  labels: PropTypes.shape({
    madeIn: PropTypes.string,
    category: PropTypes.string,
    releasedInYear: PropTypes.string,
    price: PropTypes.string,
  })
}